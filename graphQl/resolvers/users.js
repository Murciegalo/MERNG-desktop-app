const bcrypt = require('bcryptjs')
const {UserInputError} = require('apollo-server')

const User = require('../../Models/User')
const {validateRegisterInput,validateLoginInput} = require('../../utils/validators.js')
const createJwt = require('../../utils/token')

module.exports = {
  Mutation: {
    async register(
      _, 
      {registerInput: {username, email, password, confirmPassword}}, 
    ){
      // Validation
      const {valid , errors } = validateRegisterInput(username,email,password,confirmPassword)
      if(!valid){
        throw new UserInputError('Errors' , {errors})
      }      
      // User exists?
      const user = await User.findOne({email})
      if(user){
        throw new UserInputError(
          'Invalid credentials', 
          { err: { msg: 'Invalid credentials, sorry'}}
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
      const token = createJwt(res)
      return {
        ...res._doc,
        id: res._id,
        token
      }
    },
    async login(_,{email, password}){
      const{ errors , valid } = validateLoginInput(email, password);
      if(!valid){
        throw new UserInputError('Errors' , {errors})
      }
      const user = await User.findOne({email})
      if(!user){
        errors.general = 'User not found'
        throw new UserInputError('User not found', {errors})  
      }
      // const match = await bcrypt.compare(password , user.password)
      const match = password = user.password
      if(!match){
        errors.general = 'Wrong Credentials'
        throw new UserInputError('Wrong Credentials', {errors})
      }
      const token = createJwt(user)
      return {
        ...user._doc,
        id: user._id,
        token
      }    
    } 
  }
}