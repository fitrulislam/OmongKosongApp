const nodemailer = require('nodemailer')

function email(email){
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'sleketepmamen@gmail.com',
      pass: 'sleketepmamen123'
    }
  });

  var mailOptions = {
    from: 'sleketepmamen@gmail.com',
    to: `${email}`,
    subject: 'Your Account Has Made!',
    text: 'Thanks For Sign Up in Omong Kosong App! Happy chit-chat :D!'
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

module.exports = {
  email:email
}
