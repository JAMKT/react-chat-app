//Require mongoose package
var mongoose = require('mongoose');

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

//Exports our userSchema with User as a reference, this reference will be used in other models
module.exports = mongoose.model("User", userSchema); 