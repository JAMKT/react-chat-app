//Require mongoose package
var mongoose = require('mongoose');
//Require passport-local-mongoose package
var passportLocalMongoose = require('passport-local-mongoose');

var userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    //Automatically gets the date of creation of the user
    created: {
        type: Date,
        default: Date.now()
    }
});

//Calling the package passport-local-mongoose
//It will add a username, hash and salt field to store the username, the hashed password and the salt value.
userSchema.plugin(passportLocalMongoose);

//Exports our userSchema with User as a reference, this reference will be used in other models
module.exports = mongoose.model("User", userSchema); 