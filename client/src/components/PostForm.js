import React, {useState} from 'react'
import {Form,Button} from 'semantic-ui-react';

const PostForm = () => {
  const [data, setData] = useState('')
  
  const handleSubmit = e => {
    e.preventDefault()
  }
  const handleChange = () => {

  }

  return (
    <Form onSubmit={handleSubmit}>
      <h2>Create a Post</h2>
      <Form.Field>
        <Form.Input
          placeholder="Hi world!"
          name="body"
          onChange={handleChange}
          value={data}
          required
        />
        <Button type="submit" color="teal">Submit</Button>
      </Form.Field>
    </Form>
  )
}
export default PostForm;