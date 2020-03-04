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

// POST
// Create new message
router.post('/:id/messages/', (req, res) => {
    let messagesArray = [];

    const newMessage = new Message({
        content: req.body.content,
        author: {
            id: req.user._id,
            username: req.user.username
        }
    });

    newMessage.save();

    Chat.findById(req.params.id, (err, chat) => {
        if (err) res.send('Message not found.');

        // Push new message to array
        messagesArray.push(newMessage);
        console.log(messagesArray);
    });

    // Update chat with new messages
    Chat.findOneAndUpdate({ _id: req.params.id }, {
        $addToSet: {
            messages: messagesArray
        }
    }, 
    { new: true }, // Return the newly updated version of the document
    (err, chat) => {
        if (err) { res.send('Could not update this chat.'); }
    });
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