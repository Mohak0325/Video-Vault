const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();


const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, 'First name is required'],
        trim: true,
        minLength: 3
    },
    lastname: {
        type: String,
        trim: true,
        minLength: 3,        
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim : true,
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    }, { timestamps: true });

userSchema.methods.getJWT = function() {
    const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    return token;
};

module.exports = mongoose.model('User', userSchema);    