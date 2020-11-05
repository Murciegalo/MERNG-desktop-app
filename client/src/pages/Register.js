import gql from 'graphql-tag';
import React, {useState} from 'react'
import {Button, Form} from 'semantic-ui-react'
import {useMutation} from '@apollo/react-hooks'

export const Register = () => {
  const [data, setData] = useState({
    username: '',
    email:'',
    password:'',
    confirmPassword:''
  })
  const {username, email, password, confirmPassword} = data;
  const [ addUser, {loading} ] = useMutation(REGISTER_USER, {
    update(proxy, result){
      console.log(result)
    },
    variables: data
  })
  const handleSubmit = e => {
    e.preventDefault()
    addUser()
  }
  const handleChange = e => {
    setData({
      ...data,
      [e.target.name] : e.target.value
    })
  }
  return (
    <div className="form-container">
      <Form onSubmit={handleSubmit} noValidate>
        <h1 className="page-title">Register</h1>
        <Form.Input
          label="Username"
          placeholder="Username.."
          name="username"
          type="text"
          value={username}
          onChange={handleChange}
        />
        <Form.Input
          label="Email"
          placeholder="Email.."
          name="email"
          type="email"
          value={email}
          onChange={handleChange}
        />
        <Form.Input
          label="Password"
          placeholder="Password.."
          name="password"
          type="password"
          value={password}
          onChange={handleChange}
        />
        <Form.Input
          label="Confirm Password"
          placeholder="Confirm password.."
          name="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={handleChange}
        />
        <Button type="submit" primary>Register</Button>
      </Form>      
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