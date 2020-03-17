const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require("passport");
const session = require("express-session");
const sessionSecret = require('./config/sessionConfig').secret;
const path = require('path');

const users = require('./routes/api/Users');
const chats = require('./routes/api/Chats');
const messages = require('./routes/api/Messages');

const app = express();
const http = require('http');
const server = http.createServer(app);
const socketio = require('socket.io');
const io = socketio(server);

//BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Config
require('./config/passport')(passport);

//DB Congig
const db = require('./config/dbKeys').mongoURI;

mongoose.set('useFindAndModify', false);

//Connect to MongoDB
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

// // Initialize sessions
app.use(session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: false },
    expires: new Date(Date.now() + 3600000)
}));

// Initialize passport
app.use(passport.initialize());
// Initialize passport session
app.use(passport.session());


//User Routes
app.use('/api/users', users);
app.use('/api/chats', chats);
app.use('/api/chats', messages);

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
});

// Models used for socket.io feature
const Chat = require('./models/Chat');
const Message = require('./models/Message');
// Socket.io connection

io.on('connection', socket => {
    socket.on('send-message', packet => {
        try {
            console.log(packet);
            const newMessage = new Message({
                content: packet.packet.data.content,
                author: {
                    id: packet.packet.data.author.id,
                    username: packet.packet.data.author.username
                }
            });
            
            Chat.findById(packet.packet.chatId, (err, chat) => {
                if (err) console.log('Message not found.');

                Message.create(newMessage, (err, message) => {
                    if (err) {
                        console.log(err);
                        console.log("Message was not created...");
                    } else {
                        message.save();
                        chat.messages.push(message);
                        chat.lastUpdate = message.created;
                        chat.save();
                    }
                });
            }).then(chat => {
                socket.emit('get-messages', "Message");
            }).catch(err => console.log(err));
        } catch (err) {
            console.log('Could not create this message.');
        }
    });
});


io.on('disconnect', () => {
    console.log('Disconnected.');
});

if (process.env.NODE_ENV === 'production') {
    //Set static folder
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const port = require('./config/env').serverPORT;
server.listen(port, () => console.log(`Server started on port ${port}`));
