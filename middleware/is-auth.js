module.exports=(req,res,next)=>{    
  //route protection
  if(!req.session.isLoggedIn){
    return res.redirect('/login');
  }
  next();
}