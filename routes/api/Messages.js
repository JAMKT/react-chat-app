const express = require('express');
const router = express.Router();

// Models
const Chat = require('../../models/Chat');
const Message = require('../../models/Message');

// GET
// Get all messages related to a specific chat
router.get('/:id/messages', (req, res) => {
    Chat.findById(req.params.id, (err, chat) => {
        if (err) res.send('No chat found.');
        res.send(chat.messages);
    });
});

// GET
// Get single message by its id
router.get('/:id/messages/:messageId', async (req, res) => {
    // Message.findById(req.params.id, (err, message) => {
    //     if (err) res.send('Message not found.');
    //     res.send(message);
    // });
    const message = await Message.findById(req.params.messageId, (err, message) => {
        if (err) res.send('Message not found.');
        return message;
    })

    Chat.find({ 
        '_id': req.params.id, 
        messages: { '$elemMatch': { _id: req.params.messageId } } 
    }, (err, chat) => {
        if (err) res.send('No chat found.');
        console.log(chat);

        // chat.messages.forEach(msg => {
        //     if (msg._id == message._id) {
        //         return message;
        //     }
        // });
    });
});

// POST
// Create new message
router.post('/:id/messages/', (req, res) => {
    // TODO: Handle validation

    const newMessage = new Message({
        content: req.body.content,
        author: {
            id: req.user._id,
            username: req.user.username
        }
    });

    newMessage.save();
});

// DELETE
// Delete message
router.post('/:id/messages/:id', (req, res) => {
    try {
        Message.findByIdAndRemove({ _id: req.params.id }, (err) => {
            if (err) console.log(err);
            res.send('success', 'Your message has been deleted!');
        });
    } catch(err) {
        res.send('error', 'Your message could not be deleted. Try again.');
    }
});

module.exports = router;