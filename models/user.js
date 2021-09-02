const mongoose = require('mongoose');

// Schema
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    username: String,
    email: String,
    password: String
}, { timestamp: true });

// Model
const User = mongoose.model('User', UserSchema);

module.exports =  User;