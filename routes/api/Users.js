const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");

//User Model
const User = require('../../models/User');

const isLoggedIn = require('../../middleware/isLoggedIn');

// GET
// Get users
router.get('/', isLoggedIn, (req, res) => {
    User.find({}, (err, users) => {
        res.send(users);
    });
});

// GET
// Get current user 
router.get('/current-user', isLoggedIn, (req, res) => {
    res.send(req.user);
});

// GET
// Get single user by its id
router.get('/:id', isLoggedIn, (req, res) => {
    User.findById(req.params.id, (err, user) => {
        if (err) res.send('User not found.');
        console.log(user);
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
//Handling login logic
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
                        passport.authenticate('local')(req, res, function () {
                            //TODO
                            if (err) {
                                console.log(err);
                            } else {
                                res.json({
                                    foundUser: req.user
                                });
                            }
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
router.get('/new-contact/:username', isLoggedIn, (req, res) => {
    //Geting the logged user
    User.findById(req.user._id)
        .then(user => {
            //Looking the user to follow by id
            User.findOne({ "username": req.params.username })
                .then(contact => {
                    if (req.user.id == contact.id) {
                        console.log("You cannot follow yourself");
                        return;
                    }
                    // // check if the requested user is already in follower list of other user then 
                    if (user.contacts.filter(contacts =>
                        contacts.user.toString() === contact.id).length > 0) {
                        return;
                    }
                    user.contacts.unshift({ user: contact.id, username: contact.username });
                    user.save()
                    contact.contacts.unshift({ user: req.user.id, username: req.user.username });
                    //Save user to the following user
                    contact.save().then(user => {
                        return;
                    }
                    )
                })
                .catch(err => res.send(err))
        })
});

//Get the users that fit the search with regex
router.get('/searching/:username', isLoggedIn, (req, res) => {
    if (req.params.username) {
        //Declaring the regular expression of the search
        const regex = new RegExp(escapeRegex(req.params.username), 'gi');
        //Looking for users where the username match with the regular expression
        User.find({ $or: [{ username: regex }] }, function (err, response) {
            if (err) {
                console.log(err);
            } else {
                res.send(response);
            }
        }
        )
    }
});

// POST
// Update user's settings
router.post('/update-user', isLoggedIn, async (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id }, {
        $set: {
            name: req.body.name,
            email: req.body.email
        }
    },
        { new: true }, // Return the newly updated version of the document
        (err, user) => {
            if (err) { res.send('Could not update this user.'); }
        });
});


function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};




module.exports = router;