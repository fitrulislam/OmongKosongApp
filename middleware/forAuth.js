const crypto = require('crypto'),
   algorithm = 'aes-256-ctr',
    password = 'FitrulWika';

function isLogin(req,res,next){
  if (req.session.user == null || req.session.user == undefined) {
    res.redirect('/user/login');
  } else {
    next();
  }
}

function encrypt(req,res,next){
  var cipher = crypto.createCipher(algorithm,password)
  var crypted = cipher.update(req.body.password,'utf8','hex')
  crypted += cipher.final('hex');

  req.body.password = crypted
  next()
}

module.exports = {
  isLogin: isLogin,
  encrypt: encrypt
};
