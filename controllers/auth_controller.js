const User = require('../models/user_model');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = {email: '', password: ''};
    // check for incorrect email
    if(err.message === 'incorrect email'){
        errors.email = 'that email is not registed';

    }
    if(err.message === 'incorrect password'){
        errors.password = 'that password is incorrect';

    }
    // duplicate email error
    if(err.code === 11000){
        errors.email = 'Email already exist';
    }
    // validation errors
    if(err.message.includes('user validation failed')){
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message;
        })
    }
    return errors;
}
// create token
const maxAge = 30 * 24 * 60 * 60;

const createtoken =  (id) =>{
    return jwt.sign({ id }, 'almustaphatukurukar1410204031', {
        expiresIn: maxAge
    });
}


module.exports.signup_get = (req, res) => {
    res.render('create', {title: 'user login'});
}


module.exports.signup_post = async (req, res) => {
    const {email, password} = req.body;
    try{
        const user = await User.create({email, password});
        const token = createtoken(user._id);
        res.cookie('userID', token, {httpOnly: true, maxAge: maxAge * 1000, });
        res.status(201).json({user: user._id});
   }catch(err){
    const errors = handleErrors(err);
      res.status(400).json({errors});
   }

}
module.exports.signin_get = (req, res) => {
    res.render('login', {title: 'user login'});
}


module.exports.signin_post = async (req, res) => {
    const {email, password} = req.body;
    // console.log(email, password);
   try{
    const user = await User.login(email, password);
    const token = createtoken(user._id);
    res.cookie('userID', token, {httpOnly: true, maxAge: maxAge * 1000, });
    res.status(200).json({user: user._id});
   }catch(err){
    const errors = handleErrors(err);
    res.status(400).json({errors});
   }
}
module.exports.logout_get = (req, res) =>{
    res.cookie('userID', '',{maxAge: 1});
    res.redirect('/');
}