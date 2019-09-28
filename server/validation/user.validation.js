const Joi = require('@hapi/joi');

//Register Validation
//Validate new user data, return error message if invalid
const registerValidation = (data) => {
    const schema = Joi.object({
        firstName: Joi.string().required().min(1).max(255),
        lastName: Joi.string().required().min(4).max(255),
        email: Joi.string().required().min(6).max(255).email(),
        password: Joi.string().required().min(6).max(1024)
    })
    return schema.validate(data);
}

//Login Validation
//Validate user login data, return error message if invalid
const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().required().min(6).max(255).email(),
        password: Joi.string().required().min(6).max(1024)
    })
    return schema.validate(data);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;