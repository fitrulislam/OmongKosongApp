function isLogin(req,res,next){
  if (req.session.user == null || req.session.user == undefined) {
    res.redirect('/user/login');
  } else {
    next();
  }
}

module.exports = {
isLogin: isLogin
};
