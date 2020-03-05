//Require mongoose package
var mongoose = require('mongoose');

//Define schema of chats
var chatSchema = new mongoose.Schema({
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    members: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
            username: String
        }
    ],
    //The messages parameter is linked with the message collection, getting the message id
    messages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message"
        }
    ],
    lastUpdate: Date,
    //Automatically gets the date of creation of the user
    created: {
        type: Date,
        default: Date.now()
    }
});

//Export our schema, this reference will be used in other models
module.exports = mongoose.model('Chat', chatSchema);