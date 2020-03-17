const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");

//User Model
const User = require('../../models/User');
const Chat = require('../../models/Chat');

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
        if(err){
            res.send('User not found.');
        } else {
            res.send(user);
        }
        
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
            address: req.body.address,
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
                        return;
                    }
                    // // check if the requested user is already in follower list of other user then 
                    if (user.contacts.filter(contacts =>
                        contacts.user.toString() === contact.id).length > 0) {
                        return;
                    }
                    user.contacts.unshift({ user: contact.id, username: contact.username, nickname: '' });
                    user.save();
                    contact.contacts.unshift({ user: req.user.id, username: req.user.username, nickname: '' });
                    //Save user to the following user
                    contact.save().then(user => {
                        res.send(user);
                    });
                })
                .catch(err => res.send(err))
        })
        .then((data) => { return data })
        .catch(err => res.send(err));
});

// Update user's contact
router.post('/update-contact/:username', isLoggedIn, (req, res) => {
    const nickname = req.body.nickname;

    User.updateOne({ "_id": req.user._id, "contacts": { $elemMatch: { username: req.params.username }} }, {
        $set: {
            "contacts.$.nickname": nickname
        }
    }, 
    { new: true }, // Return the newly updated version of the document
    (err, user) => {
        if (err) { res.send('Could not update this contact.'); };
    })
    .then((response) => {
        res.send(response);
    });
});

// GET
// Get the users that fit the search with regex
router.get('/searching/:username', isLoggedIn, (req, res) => {
    if (req.params.username) {
        //Declaring the regular expression of the search
        
        const regex = new RegExp(escapeRegex(req.params.username), 'gi');
        //Looking for users where the username matches with the regular expression
        User.find({ $or: [{ username: regex }] }, function (err, response) {
            if (err) {
                console.log(err);
            } else {
                //Rendering the index template with the found users
                res.send(response);
            }
        });
    }
});

// POST
// Update user's settings
router.post('/update-user', isLoggedIn, async (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id }, {
        $set: {
            name: req.body.name,
            email: req.body.email,
            address: req.body.address,
            avatarColor: req.body.avatarColor
        }
    },
    { new: true }, // Return the newly updated version of the document
    (err, user) => {
        if (err) { res.send('Could not update this user.'); }
    })
    .then((response) => {
        res.send(response);
    });
});

// DELETE
// Remove user from contact list
router.get('/remove-contact/:username', isLoggedIn, (req, res) => {
    // Find chat with contact and delete it
    Chat.findOneAndRemove({ members: { 
        $elemMatch: { username: req.user.username },
        $elemMatch: { username: req.params.username }
    }}, (err, chat) => {
        if (err) { res.send('Could not remove this chat.'); };
    }) 
    .then(() => {
        // Find contact in current user's contacts and remove them
        User.updateOne({ "_id": req.user._id }, {
            $pull: {
                "contacts": {
                    "username": req.params.username
                }
            }
        }, 
        { multi: true },
        (err, user) => {
            if (err) { res.send('Could not remove this contact.'); };
        })
        .then(() => {
            // Find old contact and remove the current user from their contacts
            User.updateOne({ "username": req.params.username }, {
                $pull: {
                    "contacts": {
                        "user": req.user._id
                    }
                }
            }, 
            { multi: true },
            (err, user) => {
                if (err) { res.send("Could not remove user from this user's contacts."); };
            })
            .then((response) => {
                res.send(response);
            });
        });
    });
});


function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

// GET
// Delete User Account
router.get("/:id/delete", isLoggedIn, (req, res) => {
    if(req.user.contacts !== null && req.user.contacts !== undefined && req.user.contacts.length !== 0){
        req.user.contacts.forEach(contact => {
            User.findOne({ username: contact.username }, (err, foundContact) => {
                if (err) {
                    res.send(err);
                }
                else {
                    foundContact.contacts.forEach(contactToDelete => {
                        if (contactToDelete.username === req.user.username) {
                            const index = foundContact.contacts.indexOf(contactToDelete);
                            if (index > -1) {
                                foundContact.contacts.splice(index, 1);
                                foundContact.save();
                            }
                        }
    
                    });
                    Chat.deleteMany({ members: { $elemMatch: { user: req.user._id } } }, (err) => {
                        if (err) {
                            res.send(err);
                        } else {
                            //Finding user to delete by id
                            User.findByIdAndRemove({ _id: req.user._id }, (err) => {
                                if (err) {
                                    res.send(err);
    
                                } else {
                                    res.send("User deleted succesfully!")
                                }
                            });
                        }
                    });
                }
            })
        });
    }else{
         User.findByIdAndRemove({ _id: req.user._id }, (err) => {
            if (err) {
                res.send(err);

            } else {
                res.send("User deleted succesfully!");
            }
        });
    }
    
});


module.exports = router;