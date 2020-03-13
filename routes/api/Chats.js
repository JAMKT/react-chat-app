const express = require('express');
const router = express.Router();

// Models
const Chat = require('../../models/Chat');
const User = require('../../models/User');

const middleware = require('../../middleware/isLoggedIn');

// GET
// Get all chats
router.get('/', (req, res) => {
    Chat.find({ members: { $elemMatch: { user: req.user._id } } }, (err, chats) => {
        res.send(chats);
    });
});

// GET
// Get normal/default chats
router.get('/default', (req, res) => {
    Chat.find({ $where: "this.members.length === 2" }, (err, chats) => {
        res.send(chats);
    });
});

// GET
// Get group chats
router.get('/group', (req, res) => {
    Chat.find({ $where: "this.members.length > 2" }, (err, chats) => {
        res.send(chats);
    });
});

// GET
// Get single chat by its id
router.get('/:id', (req, res) => {
    Chat.findById(req.params.id, (err, chat) => {
        if (err) res.send('Chat not found.');
        res.send(chat);
    });
});

// POST
// Create chat
router.post('/', async (req, res) => {
    let chatMembers = [];
    let membersList = req.body.members;

    try {
        // Loop through the array of users taken from the client side
        // Push the users to the chatMembers array
        for (const member of membersList) {
            await User.findOne({ "username": member })
                .then(member => { 
                    chatMembers.push({
                        username: member.username,
                        user: member
                    }); })
                .catch(err => console.log(err));
        }

        // Create new chat
        const newChat = new Chat({
            author: {
                id: req.user._id,
                username: req.user.username
            }, 
            members: chatMembers,
            messages: []
        });

        newChat.save();
        res.status(200).send(newChat);
    } catch (err) {
        // If there are errors: send an error
        res.status(500)
            .send("Chat could not be created.");
    }
});

// DELETE
// Delete group chat
router.post('/:id', (req, res) => {
    try {
        Chat.findByIdAndRemove({ _id: req.params.id }, (err) => {
            if (err) console.log(err);
            res.send('Chat has been deleted!');
        });
    } catch (err) {
        res.send('Chat could not be deleted. Try again.');
    }
});

//GET
//Get last 10 chats
router.get('/last-ten', middleware, (req, res) => {
    Chat.find({ "members": { $elemMatch: { "user": req.user.id } } }).sort({ "lastUpdate": -1 }).limit(10).exec((err, lastChats) => {
        if (err) {
            console.log(err);
        } else {
            res.send(lastChats);
        }
    });
});

// GET
// Get the chats that fit the search with regex
router.get('/searching/:username', (req, res) => {
    if (req.params.username) {
        // Declaring the regular expression of the search
        const regex = new RegExp(escapeRegex(req.params.username), 'gi');
        // Looking for chat where the member's username matches with the regular expression
        Chat.find({ "author._id": req.user._id, $or: [{ members: { $elemMatch: { username: regex } } }] }, function (err, chats) {
            if (err) {
                console.log(err);
            } else {
                // Rendering the index template with the found chat
                chats.forEach((chat) => {
                    chat.members.forEach((member) => {
                        if (member.user.id !== req.user.id) {
                            chat.title = member.user.username;
                        }
                    });
                });
                res.send(chats);
            }
        });
    } else {
        chats.forEach((chat) => {
            chat.members.forEach((member) => {
                if (member.username !== req.user.username) {
                    chat.title = member.username;
                }
            });
        });
        res.send(chats);
    }
});

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};


module.exports = router;