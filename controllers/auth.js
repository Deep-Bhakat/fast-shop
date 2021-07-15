const User = require('../models/user');
//for validating
const { validationResult }=require('express-validator/check');
//for email
const nodemailer=require('nodemailer');
//for sendgrid email
const sendgridTransport=require('nodemailer-sendgrid-transport');
//how mails will be delievered
const transporter=nodemailer.createTransport(sendgridTransport({
  auth:{
    api_key:'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'
  }
}));
//inbuild crypto library - creating unique random values
const crypto=require('crypto');
//encryption
const bcrypt = require('bcryptjs');
exports.getLogin = (req, res, next) => {
  //cookies  
  // const isLoggedIn=req.get('Cookie').split('=')[1] === 'true';

  //session
  //console.log(req.session.isLoggedIn);
  let errorMsg=req.flash('error');
  if(errorMsg.errorMsg>0){
    errorMsg=errorMsg[0];
  }else{
    errorMsg=null;
  }
  //success Msg
  // let successMsg=req.flash('success');
  // if(successMsg.successMsg>0){
  //   successMsg=successMsg[0];
  // }else{
  //   successMsg=null;
  // }
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    errorMessage:errorMsg,
    oldData:{email:'',password:''},
    validationErrors:[]
   // successMessage:successMsg
  });

};

exports.postLogin = (req, res, next) => {
  //Cookies
  // res.setHeader('Set-Cookie','loggedIn=true;HttpOnly');
  //session
  const email=req.body.email;
  const password=req.body.password;
//validate
const errors =validationResult(req);


  User.findOne({email:email})
    .then(user => {
      if(!user){
          return res.status(422).render('auth/login', {
            path: '/login',
            pageTitle: 'Login',
            errorMessage:'Invalid Email/Password',
            oldData:{email:email,password:password},
            validationErrors:[]
          });
        
      }
      return bcrypt.compare(password,user.password)
      .then(doMatch =>{
        if(doMatch){
          req.session.isLoggedIn = true;
      req.session.user = user;
      //session take time to entry in database
    return req.session.save((err) => {
        console.log(err);
        res.redirect('/');
      });
        }
        return res.status(422).render('auth/login', {
          path: '/login',
          pageTitle: 'Login',
          errorMessage:'Invalid Email/Password',
          oldData:{email:email,password:password},
          validationErrors:[]
        });
        
      })
      .catch(err => {
        console.log(err);
        res.redirect('/login');
      });
     })

     .catch(err => {
      console.log(err);
      const error = new Error(err);
      error.httpStatusCode=500;
      return next(error);
    });
};
//for managing session
//npm install --save express-session
//for storing sessions
//npm install --save connect-mongodb-session

exports.postLogout = (req, res, next) => {

  req.session.destroy((err) => {
    console.log(err);
    res.redirect('/');
  });
};

exports.getSignup = (req, res, next) => {
  let errorMsg=req.flash('error');
  if(errorMsg.length>0){
    errorMsg=errorMsg[0];
  }else{
    errorMsg=null;
  }
  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'SignUp',
    errorMessage:errorMsg,
    oldData:{
      email: '',
      name:'',
      password:'',
      confirmpassword:''
    },
    validationErrors:[]
  });

};
exports.postSignup = (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const confirmpassword = req.body.confirmpassword;
  //validate
  const errors =validationResult(req);
  if(!errors.isEmpty()){
    return res.status(422).render('auth/signup', {
      path: '/signup',
      pageTitle: 'SignUp',
      errorMessage:errors.array()[0].msg,
      oldData:{name:name,email:email,password:password,confirmpassword:confirmpassword},
      validationErrors:errors.array()
    });
  }
  //check if exits
  // User.findOne({ email: email })
  //   .then(userDoc => {
  //     if (userDoc) {
  //       //showing error msgs
  //       req.flash('error','Email Exists Already');

  //       return res.redirect('/signup');
  //     }
      //return 
      bcrypt.hash(password, 12)
        .then(hashedPassword => {
          const user = new User({
            name: name,
            email: email,
            password: hashedPassword,
            cart: { items: [] }
          });
          return user.save();
        })
        .then(result => {
          res.redirect('/login');

          return transporter.sendMail({
            to:email,
            from: 'deepbhakat234@gmail.com',
            subject: 'Signup successed!',
            html:'<h1>You successfully signed up!</h1>'
          });
        })        
    .catch(err => {
      console.log(err);
      const error = new Error(err);
      error.httpStatusCode=500;
      return next(error);
    });
   // })
 //   .catch(err => console.log(err));

};

exports.getReset= (req,res,next)=>{
  let errorMsg=req.flash('error');
  if(errorMsg.length>0){
    errorMsg=errorMsg[0];
  }else{
    errorMsg=null;
  }
  res.render('auth/reset', {
    path: '/reset',
    pageTitle: 'Reset Password',
    errorMessage:errorMsg
  });
};
exports.postReset= (req,res,next)=>{
  const email=req.body.email;
  crypto.randomBytes(32,(err,buffer)=>{
    if(err){
      console.log(err);
      return res.redirect('/reset');
    }
    const token=buffer.toString('hex');
    User.findOne({email : email})
    .then(user =>{
      if(!user){
        req.flash('error','No Account With that email found');
        return res.redirect('/reset');
      }
      user.resetToken=token;
      user.resetTokenExpiration=Date.now() + 3600000;
      return user.save();
    })
    .then(result =>{
     // req.flash('success','Reset Link Has Been Sent To Your Mail!');
      res.redirect('/login');
      transporter.sendMail({
        to:email,
        from:'deepbhakat234@gmail.com',
        subject: 'Reset Password',
        html:`
        <p> You requested a password reset</p>
        <p> Click this <a href="http://localhost:3000/reset/${token}">link</a> to set a new password.</p>
        <p>This link is only valid for 1 hr!</p>
        `
      });
    })
    .catch(err => {
      console.log(err);
      const error = new Error(err);
      error.httpStatusCode=500;
      return next(error);
    });  
  })
};

exports.getNewPassword=(req,res,next)=>{
  
  const token=req.params.token;
  console.log(token);
  User.findOne({resetToken:token, resetTokenExpiration: {$gt : Date.now()}})
  .then(user =>{

    let errorMsg=req.flash('error');
    if(errorMsg.length>0){
      errorMsg=errorMsg[0];
    }else{
      errorMsg=null;
    }
    res.render('auth/newPassword', {
      path: '/new-passowrd',
      pageTitle: 'New Password',
      errorMessage:errorMsg,
      userId:user._id.toString(),
      resetToken:token
    });
  })
  .catch(err => {
    console.log(err);
    const error = new Error(err);
    error.httpStatusCode=500;
    return next(error);
  });
};

exports.postNewPassword=(req,res,next)=>{

  const newPassword=req.body.password;  
  const userId=req.body.userId;
  const resetToken=req.body.resetToken;
  let resetUser;
  User.findOne({resetToken:resetToken, 
    resetTokenExpiration: {$gt : Date.now()},
    _id:userId
  })
  .then(user =>{
    resetUser=user;
    return bcrypt.hash(newPassword,12);
  })
  .then(hashedPassword =>{
    resetUser.password=hashedPassword;
    resetUser.resetToken=null;
    resetUser.resetTokenExpiration=undefined;
    return resetUser.save();
  })
  .then(result =>{
    res.redirect('/login');
  })
  .catch(err => {
    console.log(err);
    const error = new Error(err);
    error.httpStatusCode=500;
    return next(error);
  });
};