const express = require('express');
const router = express.Router();

//User Model
const User = require('../../models/User');

// GET
// Get users
router.get('/', (req, res) => {
    User.find({}, (err, users) => {
        res.send(users);
    });
});

// GET
// Get single user by its id
router.get('/:id', (req, res) => {
    User.findById(req.params.id, (err, user) => {
        if (err) res.send('User not found.');
        res.send(user);
    });
});

// POST
// Register new user
router.post('/register', (req, res) => {
    // TODO: Work with auth
});

// POST
// Login with user credentials
router.post('/login', (req, res) => {
    // TODO: Work with auth
});

// TODO: Decide on how to handle the "logout" functionality

module.exports = router;