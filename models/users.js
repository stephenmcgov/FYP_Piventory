require('./util');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var validator = require('validator');
var Schema = mongoose.Schema;

var usersSchema = new Schema({
    user_name:{
        type: String,
        required: true,
        trim: true
    },
    password:{
        type:String,
        required:true,
        trim:true,
		
        validate(value){
            if(validator.isEmpty(value)){
                throw new Error('Please enter your password!')
            }else if(validator.equals(value.toLowerCase(),"password")){
                throw new Error('Password is invalid!')
            }else if(validator.contains(value.toLowerCase(), "password")){
                throw new Error('Password should not contain password!')
            }
        }
    },
	role: String,
    access_token: String
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
