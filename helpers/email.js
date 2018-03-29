const nodemailer = require('nodemailer')

function email(email){
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'OmongKosongApp@gmail.com',
      pass: 'fitrulwika'
    }
  });

  var mailOptions = {
    from: 'OmongKosongApp@gmail.com',
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

function comment(email,user,forum){
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'OmongKosongApp@gmail.com',
      pass: 'fitrulwika'
    }
  });

  var mailOptions = {
    from: 'OmongKosongApp@gmail.com',
    to: `${email}`,
    subject: 'Re: Comment',
    text: `User ${user} has comment on your forum (${forum})`
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

function respond(email,user,forum){
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'OmongKosongApp@gmail.com',
      pass: 'fitrulwika'
    }
  });

  var mailOptions = {
    from: 'OmongKosongApp@gmail.com',
    to: `${email}`,
    subject: 'Re: Respond',
    text: `User ${user} has reply your comment on forum ${forum}!`
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
  email:email,
  comment:comment,
  respond:respond
}
