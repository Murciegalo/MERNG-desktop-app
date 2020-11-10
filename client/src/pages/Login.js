import React, {useState,useContext} from 'react'
import gql from 'graphql-tag';
import {Button, Form} from 'semantic-ui-react'
import {useMutation} from '@apollo/react-hooks'
import {AuthContext} from '../context/auth'

const Login = (props) => {
  const {login} = useContext(AuthContext)
  const [data, setData] = useState({
    email:'',
    password:'',
  })
  const {email,password} = data;
    const [ loginUser, {loading} ] = useMutation(LOGIN_USER, {
    update(_, result){
      login(result.data.login);
      props.history.push('/')
    },
    variables: data
  })
  const handleSubmit = e => {
    e.preventDefault()
    loginUser()
    setData({
      username: '',
      email:'',
      password:'',
      confirmPassword:''
    })
    
  }
  const handleChange = e => {
    setData({
      ...data,
      [e.target.name] : e.target.value
    })
  }

  return (
    <div className="form-container">
      <Form onSubmit={handleSubmit} className={!loading ? "": "loading"}>
        <h1 className="page-title">Login</h1>
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
        <Button type="submit" primary>Login</Button>
      </Form>      
    </div>
  )
}

const LOGIN_USER = gql`
  mutation login(
    $email: String!
    $password: String!
  ){
    login(email: $email password: $password)
    {
      id email username createdAt token
    }
  }
`

export default Login;