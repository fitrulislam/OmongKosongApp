const crypto = require('crypto'),
   algorithm = 'aes-256-ctr',
    password = 'FitrulWika';

function deleteValidationInfo(text) {
  let indexcoma = text.indexOf(':')

  return text.split(': ').splice(1).join('')
}

function decryptPassword(value){
  var decipher = crypto.createDecipher(algorithm,password)
  var dec = decipher.update(value,'hex','utf8')
  dec += decipher.final('utf8');

  return dec
}

module.exports = {
  deleteValidationInfo: deleteValidationInfo,
  decryptPassword: decryptPassword
}