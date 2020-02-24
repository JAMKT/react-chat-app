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
    // TODO: Define how to differentiate between default chats and group chats
    Chat.find({}, (err, chats) => {
        res.send(chats);
    });
});

// GET
// Get group chats
router.get('/group', (req, res) => {
    // TODO: Define how to differentiate between default chats and group chats
    Chat.find({}, (err, chats) => {
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

// GET
// Get single normal/default chat by its id
router.get('/default/:id', (req, res) => {
    // TODO: Define how to differentiate between default chats and group chats
    Chat.findById(req.params.id, (err, chat) => {
        if (err) res.send('Chat not found.');
        res.send(chat);
    });
});

// GET
// Get single group chat by its id
router.get('/group/:id', (req, res) => {
    // TODO: Define how to differentiate between default chats and group chats
    Chat.findById(req.params.id, (err, chat) => {
        if (err) res.send('Chat not found.');
        res.send(chat);
    });
});

// POST
// Create normal/default chat
router.post('/default', (req, res) => {
    // TODO: Handle validation

    const newChat = new Chat({
        // TODO: Define how to differentiate between default chats and group chats before creating this feature
    });

    newChat.save();
});

// POST
// Create group chat
router.post('/group', (req, res) => {
    // TODO: Handle validation

    const newChat = new Chat({
        // TODO: Define how to differentiate between default chats and group chats before creating this feature
    });

    newChat.save();
});

// DELETE
// Delete normal/default chat
router.post('/default/:id', (req, res) => {
    try {
        Chat.findByIdAndRemove({ _id: req.params.id }, (err) => {
            if (err) console.log(err);
            res.send('success', 'Your chat has been deleted!');
        });
    } catch(err) {
        res.send('error', 'Your chat could not be deleted. Try again.');
    }
});

// DELETE
// Delete group chat
router.post('/group/:id', (req, res) => {
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