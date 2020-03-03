const express = require('express');
const router = express.Router();

//Message Model
const Message = require('../../models/Message');
const Chat = require('../../models/Chat');

// GET
// Get messages
router.get('/', (req, res) => {
    Message.find({}, (err, messages) => {
        res.send(messages);
    });
});

// GET
// Get single message by its id
router.get('/:id', (req, res) => {
    Message.findById(req.params.id, (err, message) => {
        if (err) res.send('Message not found.');
        res.send(message);
    });
});

// POST
// Create new message
router.post('/', (req, res) => {
    // TODO: Handle validation
    const newMessage = new Message({
        content: req.body.content,
        // TODO: Handle authentication to make this work as it should!
        author: {
            id: req.user._id,
            username: req.user.username
        }
    });
    
    Chat.find(req.params.id, (err, foundChat) => {
        Message.create(newMessage, (err, newMessage) => {
            if (err){
                console.log(err);
            }else {
                newMessage.save();
                foundChat.messages.push(newMessage);
                foundChat.save();
            }
        });
    });
});

// DELETE
// Delete message
router.post('/:id', (req, res) => {
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