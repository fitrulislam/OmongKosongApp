function deleteValidationInfo(text) {
  let indexcoma = text.indexOf(':')

  return text.split(': ').splice(1).join('')
}

module.exports = {
  deleteValidationInfo: deleteValidationInfo
}