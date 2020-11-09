import React, {useState,useContext} from 'react'
import gql from 'graphql-tag';
import {Button, Form} from 'semantic-ui-react'
import {useMutation} from '@apollo/react-hooks'
import {AuthContext} from '../context/auth'

const Register = (props) => {
  // const [errors, setErrors] = useState({})
  const authContext = useContext(AuthContext)
  const [user, setUser] = useState({
    username: '',
    email:'',
    password:'',
    confirmPassword:''
  })
  const {username, email, password, confirmPassword} = user;
  const [ addUser, {loading} ] = useMutation(REGISTER_USER, {
    update(_, {data: { register: userData }}){
      authContext.login(userData)
      props.history.push('/')
    },
    variables: user
  })
  const handleSubmit = e => {
    e.preventDefault()
    addUser()
    setUser({
      username: '',
      email:'',
      password:'',
      confirmPassword:''
    })
  }
  const handleChange = e => {
    setUser({
      ...user,
      [e.target.name] : e.target.value
    })
  }
  return (
    <div className="form-container">
      <Form onSubmit={handleSubmit} className={!loading ? "": "loading"}>
        <h1 className="page-title">Register</h1>
        <Form.Input
          label="Username"
          placeholder="Username.."
          name="username"
          type="text"
          value={username}
          onChange={handleChange}
          required
        />
        <Form.Input
          label="Email"
          placeholder="Email.."
          name="email"
          type="email"
          value={email}
          onChange={handleChange}
          required
        />
        <Form.Input
          label="Password"
          placeholder="Password.."
          name="password"
          type="password"
          value={password}
          onChange={handleChange}
          required
        />
        <Form.Input
          label="Confirm Password"
          placeholder="Confirm password.."
          name="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={handleChange}
          required
          // error={errors.confirmPassword ? true : false}
        />
        <Button type="submit" primary>Register</Button>
      </Form>      
      {/* {
        Object.keys(errors).length > 0 && <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map(el => <li key={el}>{el}</li>)}
          </ul>
        </div>
      } */}
    </div>
  )
}

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ){
    register(
      registerInput:{
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ){
      id email username createdAt token
    }
  }
`
export default Register;