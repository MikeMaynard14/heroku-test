const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const addUser = mongoose.Schema({
    first: { type: String,required: true},
    last: { type: String,required: true},
    email: { type: String ,required: true},
    username: { type: String,required: true}, 
    password: {type:String, require: true}, 
    accountStatus: {type: Boolean, default: false},
    token: {type: String}
});

addUser.pre('save', async function(next){
    try {
        const salt = await bcrypt.genSalt(12);
        const hashPass = await bcrypt.hash(this.password, salt);
        this.password = hashPass;

        let tokePayload = {username: this.username, email:this.email}
        const token  = await jwt.sign(tokePayload, process.env.ACCESS_TOKEN_SECRET);
        this.token = token;

        next();
    } catch (error) {
        next(error);
    }
});


module.exports = mongoose.model('users', addUser);