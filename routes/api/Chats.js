const express = require('express');
const router = express.Router();

//Chat Model
const Chat = require('../../models/Chat');

// GET
// Get all chats
router.get('/', (req, res) => {
    Chat.find({}, (err, chats) => {
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
router.post('/', (req, res) => {
    // TODO: Handle validation

    const newChat = new Chat({
        // TODO: Define how to differentiate between default chats and group chats before creating this feature
    });

    newChat.save();
});

// DELETE
// Delete group chat
router.post('/:id', (req, res) => {
    try {
        Chat.findByIdAndRemove({ _id: req.params.id }, (err) => {
            if (err) console.log(err);
            res.send('success', 'Your chat has been deleted!');
        });
    } catch(err) {
        res.send('error', 'Your chat could not be deleted. Try again.');
    }
});


module.exports = router;