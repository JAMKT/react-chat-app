const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");

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
router.post('/register', async (req, res) => {
    // Encrypt the password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);
    // Create a new user
    try {
        const newUser = new User({
            username: req.body.username,
            name: req.body.name,
            email: req.body.email,
            password: hash
        });

        newUser.save();
        res.status(200).send("Welcome to the club!");

    } catch (err) {
        // If there are errors: send an error
        res.status(500)
            .send("Error registering new user please try again.");
    }
});

// POST
// Login with user credentials
router.post('/login', (req, res, next) => {
    let password = req.body.password;
    let email = req.body.email;

    if (password && email) {
        User.findOne({ "email": email }, function (err, foundUser) {
            if (!foundUser) {
                res.json({
                    success: false,
                    message: 'Incorrect credentials 1'
                });
            } else {
                bcrypt.compare(password, foundUser.password, (err, password) => {
                    if (password) {
                        passport.authenticate('local', {
                            successRedirect: '/all',
                            failureRedirect: '/login'
                        })(req, res, next);

                        res.json({
                            success: true,
                            message: 'Authentication successful!'
                        });

                    } else {
                        res.json({
                            success: false,
                            message: 'Incorrect credentials 2'
                        });
                    }
                })
            }
        })
    } else {
        res.json({
            success: false,
            message: 'Authentication failed! Please check the request'
        });
    }
});

// GET
// Logout
router.get('/logout', (req, res) => {
    req.logout();
});

// GET
// Get single user by username
router.get('/new-contact/:username', (req, res) => {
    User.find({ "username": req.params.username }, (err, newContact) => {
        if (err) {
            console.log(err);
        } else {
            User.findById(req.user.id, (err, foundUser) => {
                if (err) {
                    console.log(err);
                } else {
                    foundUser.contacts.push(newContact);
                }
            });
        }
    });
});

module.exports = router;