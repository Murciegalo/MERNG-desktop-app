import React, {useState} from 'react'
import {Form,Button} from 'semantic-ui-react';
import {useMutation} from '@apollo/react-hooks'
import gql from 'graphql-tag'
import {FETCH_POSTS_QUERY} from '../graphQueries/FetchPosts';

const PostForm = () => {
  const [comment, setData] = useState({
    body: ''
  })

  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    variables: comment,
    update(proxy, result){
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY
      })
      data.getPosts = [ result.data.createPost, ...data.getPosts ]
      proxy.writeQuery({query: FETCH_POSTS_QUERY, data})
      setData({
        ...comment,
        body:''
      })
    }
  })
  const handleSubmit = e => {
    e.preventDefault()
    createPost()
  }
  const handleChange = e => setData({ 
    [e.target.name] : e.target.value 
  })

  return <>
    <Form onSubmit={handleSubmit}>
      <h2>Create a Post</h2>
      <Form.Field>
        <Form.Input
          placeholder="Hi world!"
          name="body"
          onChange={handleChange}
          value={comment.body}
          required
          // error={error ? true : false}
        />
        <Button type="submit" color="teal">Submit</Button>
      </Form.Field>
    </Form>
  </>
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