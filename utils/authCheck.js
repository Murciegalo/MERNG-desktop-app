const { AuthenticationError } = require('apollo-server');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../confg');

const authCheck = context => {
  const authHeader = context.req.headers.authorization;
  if(authHeader){
    const token = authHeader.split('Bearer ')[1];
    if(token){
      try {
        const user = jwt.verify(token , SECRET_KEY)
        return user;  
      } 
      catch (err) {
        throw new AuthenticationError('Invalied/Expired token')
      }
    }
    throw new AuthenticationError('wrong token set')
  }
  throw new AuthenticationError('No header')
}

module.exports = authCheck; 