const express = require('express');
const router = express.Router();

// Models
const Chat = require('../../models/Chat');
const Message = require('../../models/Message');

const isLoggedIn = require('../../middleware/isLoggedIn');

// GET
// Get all messages related to a specific chat
router.get('/:id/messages', isLoggedIn, (req, res) => {
    Chat.findById(req.params.id).populate("messages").sort({ "created": -1 }).exec((err, chat) => {
        if (err) res.send('Chat not found.');
        res.send(chat);
    });
});

// GET
// Get single message by its id
router.get('/:id/messages/:messageId', isLoggedIn, async (req, res) => {
    const message = await Message.findById(req.params.messageId, (err, message) => {
        if (err) res.send('Message not found.');
        return message;
    })

    Chat.findById(req.params.id, (err, chat) => {
        if (err) res.send('No chat found.');

        const messagesArray = chat.messages;

        if (messagesArray.length > 0) {
            chat.messages.forEach(msg => {
                if (msg._id == message._id) {
                    res.send(message);
                }
            });
        } else {
            res.send('No message found in this chat');
        }
    });
});

// DELETE
// Delete message
router.post('/:id/messages/:id', isLoggedIn, (req, res) => {
    try {
        Message.findByIdAndRemove({ _id: req.params.id }, (err) => {
            if (err) console.log(err);
            res.send('Message has been deleted!');
        });
    } catch (err) {
        res.send('Message could not be deleted. Try again.');
    }
});

module.exports = router;