const LocalStrategy = require('passport-local');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

module.exports = function(passport) {
    passport.use(
        new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
            User.findOne({ email })
                .then(user => {
                    if (!user) {
                        return done(null, false, { error: 'Invalid credentials' });
                    }

                    bcrypt.compare(password, user.password, (err, passwordsMatch) => {
                        if (err) throw err;
                        if (passwordsMatch) {
                            return done(null, user);
                        } else {
                            return done(null, false, { error: 'Invalid credentials' });
                        }
                    });
                });
        })
    );
    
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
}