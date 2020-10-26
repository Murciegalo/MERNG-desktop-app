const jwt = require('jsonwebtoken')
const {SECRET_KEY} = require('../confg')

const createJwt = data => {
  return jwt.sign({
    id: data.id,
    email: data.email,
    username: data.username
  }, 
    SECRET_KEY , 
    {expiresIn: '1h'}
  );
}



module.exports = createJwt; 