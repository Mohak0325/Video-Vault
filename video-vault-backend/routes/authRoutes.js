const express = require('express');
const bcrypt = require('bcryptjs');
const { validateSignup } = require('../utils/validateData');
const User = require('../models/User');
const validator = require('validator');
const userAuth = require('../middlewares/authMiddleware');

const authRouter = express.Router();

authRouter.post('/register' , async (req , res) => {
    // Handle user registration logic here
    try{
        validateSignup(req.body);

        const {firstname, lastname, email, password} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const userExists = await User.findOne({ email });
        if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
        }

        const newUser = new User({
            firstname,
            lastname,
            email,
            password: hashedPassword
        });
        const savedUser = await newUser.save();
        if (!savedUser) {
            return res.status(500).json({ message: 'User registration failed' });
        }
        const token = await newUser.getJWT();
        res.cookie('token' , token , {httpOnly: true  , secure: true, sameSite: 'None' , expires : new Date(Date.now() + 8 * 3600000)});

        res.status(201).json({ message: 'User registered successfully' , success:true , token: token , user: savedUser});  
    }
    catch(error) {
        return res.status(400).json({ message: error.message });
    }
});

authRouter.post('/login' , async(req , res) => {
    // Handle user login logic here
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        if(!validator.isEmail(email)) {
            throw new Error('Invalid email format');
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = await user.getJWT();
        if (!token) {
            return res.status(500).json({ message: 'Login failed, please try again' });
        }
        res.cookie('token', token, {httpOnly: true  , secure: true, sameSite: 'None' , expires: new Date(Date.now() + 8 * 3600000)});

        res.status(200).json({
            message: 'Login successful',
            success: true,
            token: token,
            user: user
        });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
    
})

authRouter.post('/logout', async (req, res) => {
    // Handle user logout logic here
    try {
        res.clearCookie('token', { secure: true });
        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        return res.status(500).json({ message: 'Logout failed' });
    }
});

authRouter.get('/me', userAuth, async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ user });
  } catch (err) {
    res.status(401).json({ message: 'Unauthorized' });
  }
});


module.exports = authRouter;