const validateRegisterInput = (
  username,
  email,
  password,
  confirmPassword
) => {
  const errors = {};
  const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
  if(username.trim() === ''){
    errors.un = 'Please fill in your name'
  }
  if(email.trim() === '' || !email.match(regEx)){
    errors.em = 'Please fill in a valid email address'
  }
  if(password === ''){
    errors.password = 'Please fill in your password'
  }
  else if(password !== confirmPassword){
    errors.confirmPassword = `Passwords don't match`
  }
  return {
    errors,
    valid: Object.keys(errors).length < 1
  }
}

const validateLoginInput = ( email, password) => {
  const errors = {};
  const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
  if(email.trim() === '' || !email.match(regEx)){
    errors.em = 'Please make sure your email is allright'
  }
  if(password === ''){
    errors.password = 'Please check your password'
  }
  return {
    errors,
    valid: Object.keys(errors).length < 1
  }
}

module.exports = {validateRegisterInput ,validateLoginInput}