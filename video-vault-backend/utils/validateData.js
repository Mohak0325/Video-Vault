const validator = require('validator');

const validateSignup = (data) => {
    const { firstname, lastname, email, password } = data;

    if(!firstname || !lastname || !email || !password) {
        throw new Error('All fields are required');
    }
    if(!validator.isAlpha(firstname , 'en-US') || !validator.isAlpha(lastname , 'en-US')) {
        throw new Error('First and last names must contain only letters');
    }
    if(firstname.trim().length < 2 || lastname.trim().length < 2) {
        throw new Error('First and last names must be at least 2 characters long');
    }
    if(!validator.isEmail(email)) {
        throw new Error('Invalid email format');
    }
    if(!validator.isStrongPassword(password, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    })) {
        throw new Error('Password must be at least 8 characters long and include uppercase, lowercase, number, and symbol');
    }
}


const validateVideoDetails = (data) => {
    const { title, description } = data;

    if (!title || !description) {
        throw new Error('Title and description are required');
    }
    if (title.length > 30) {
        throw new Error('Title should not be 30 characters long');
    }
    if (description.length > 60) {
        throw new Error('Description should not be 60 characters long');
    }
}

module.exports = {validateSignup , validateVideoDetails};