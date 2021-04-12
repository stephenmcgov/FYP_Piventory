require('./util');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

var usersSchema = new Schema({
    user_name:{
        type: String,
        required: true
    },
    password:{
        type:String,
        required:true
    },
	role:{
        type: String,
        required: true
    },
    access_token:{
        type: String,
        required:true
    }
});

/*
 * Hashes the password for storage in the DB
 */
usersSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

// Compares passwords to determine if the user is who they say they are
usersSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', usersSchema);
