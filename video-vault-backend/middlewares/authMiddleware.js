const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const dotenv = require('dotenv');
dotenv.config();

const userAuth = async (req, res, next) => {
    try{
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized access: Token not found' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { id } = decoded;
        const user = await User.findById(id);

        if (!user) {
            return res.status(401).json({ message: 'Unauthorized access: User not found' });
        } 

        req.user = user; 
        next(); 
    }
    catch(error) {
        return res.status(401).json({ message: 'Unauthorized access: Invalid or expired token' });
    }
}

module.exports = userAuth;
