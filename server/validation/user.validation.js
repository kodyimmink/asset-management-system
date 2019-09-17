const Joi = require('@hapi/joi');

//Register Validation
//Validate new user data, return error message if invalid
const registerValidation = (data) => {
    const schema = {
        firstName: Joi.string().required().min(6).max(255),
        lastName: Joi.string().required().min(6).max(255),
        email: Joi.string().required().min(6).max(255).email(),
        password: Joi.string().required().min(6).max(1024)
    }
    return Joi.validate(data, schema);
}

//Login Validation
//Validate user login data, return error message if invalid
const loginValidation = (data) => {
    const schema = {
        email: Joi.string().required().min(6).max(255).email(),
        password: Joi.string().required().min(6).max(1024)
    }
    return Joi.validate(data, schema);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;