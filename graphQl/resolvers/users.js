const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {UserInputError} = require('apollo-server');

const User = require('../../Models/User');
const {SECRET_KEY} = require('../../confg');

module.exports = {
  Mutation: {
    async register(
      _, 
      {registerInput: {username, email, password, confirmPassword}}, 
    ){
      // Validation
      
      // User exists?
      const user = await User.findOne({email})
      if(user){
        throw new UserInputError(
          'Invalid email', 
          { err: { msg: 'Invalid email, sorry'}}
        )
      }
      // hash password & create auth token
      password: await bcrypt.hash(password, 12);
      const newUser = new User({
        email, 
        username, 
        password, 
        createdAt: new Date().toISOString()
      });
      const res = await newUser.save()
      const token = jwt.sign({
        id: res.id,
        email: res.email,
        username: res.username
      }, 
        SECRET_KEY , 
        {expiresIn: '1h'}
      );
      return {
        ...res._doc,
        id: res._id,
        token
      }
    } 
  }
}