import React, {useState} from 'react'
import {Form,Button} from 'semantic-ui-react';
import {useMutation} from '@apollo/react-hooks'
import gql from 'graphql-tag'

const PostForm = () => {
  const [data, setData] = useState({
    body: ''
  })

  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    update(_, result){
    setData({
      ...data,
      body:''
    })
    },
    variables: data
  })
  const handleSubmit = e => {
    e.preventDefault()
    createPost()
  }
  const handleChange = e => setData({ 
    [e.target.name] : e.target.value 
  })
  

  return (
    <Form onSubmit={handleSubmit}>
      <h2>Create a Post</h2>
      <Form.Field>
        <Form.Input
          placeholder="Hi world!"
          name="body"
          onChange={handleChange}
          value={data.body}
          required
        />
        <Button type="submit" color="teal">Submit</Button>
      </Form.Field>
    </Form>
  )
}
const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!){
    createPost(body: $body){
      id
      body
      createdAt
      username
      likes{
        id
        username
        createdAt
      }
      likeCount
      comments{
        id
        username
        createdAt
      }
      commentCount
    }
  }
`
export default PostForm;