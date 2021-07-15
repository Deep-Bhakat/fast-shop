const express=require('express');
const router=express.Router();
const User=require('../models/user');
//for validating
const { check }=require('express-validator/check');
const authController=require('../controllers/auth');
router.get('/login',authController.getLogin);
router.post('/login',[
  check('email').isEmail()   
  .withMessage('Please Enter a Valid Email!')
  .normalizeEmail(),
  check('password')
  .isLength({min:6})
  .withMessage('Please Enter a valid Password')
  .trim()
],authController.postLogin);
router.get('/signup',authController.getSignup);
router.post('/signup',[
    check('email')
    .isEmail()
    .withMessage('Please Enter a Valid Email!')
    //express-validator expects a throw error or true or false or promise
    .custom((value,{req})=>{
      return  User.findOne({ email: value })
    .then(userDoc => {
      if (userDoc) {
        return Promise.reject('Email Already Exists!');
      }
    });
    }).normalizeEmail(),
    check('password')
    .isLength({min:6})
    .withMessage('Password should be atleast 6 characters long!')
      .trim(),check('confirmpassword').trim().custom((value,{req})=>{
        if(value !==req.body.password){
            throw new Error('Passwords do not match!');
        }
        return true;
    })
],authController.postSignup);
router.post('/logout',authController.postLogout);
router.get('/reset',authController.getReset);
router.post('/reset',authController.postReset);
router.get('/reset/:token',authController.getNewPassword);
router.post('/new-password',authController.postNewPassword);

module.exports=router;  