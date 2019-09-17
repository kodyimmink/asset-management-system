const router = require('express').Router();
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { registerValidation, loginValidation } = require('../validation/user.validation')

//Register
router.post('/register', async (res, req) => {

    //Validate new user data, return error message if invalid
    const { error } = registerValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message);

    //Check if user already exists
    const emailExists = await User.findOne({ email:req.body.email })
    if (emailExists) return res.status(400).send('Email already exists');

    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    //Create new user
    const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashPassword
    });
    try{
        const savedUser = await newUser.save();
        res.send(savedUser);
    }catch(err){
        res.status(400).send(err);
    }
})

//Login
router.post('/login', async (res, req) => {

    //Validate user login data, return error message if invalid
    const { error } = loginValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message);

    //Check if user exists
    const user = await User.findOne({ email:req.body.email })
    if (!user) return res.status(400).send('Email or Password is incorrect');

    //Check if password is correct
    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword) return res.status(400).send('Email or Password is incorrect');

    //Create, Assign and send JWT
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET)
    res.header('auth-token', token);
})

module.exports = router;