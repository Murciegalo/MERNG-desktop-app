const users = require('../../Models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
  Mutation: {
    async register(
      _, 
      {registerInput: {username, email, password, confirmPassword}}, 
      context, 
      info
    ){
      // Validation
      // User exists?
      // hash password & create auth token
      
    } 
  }
}