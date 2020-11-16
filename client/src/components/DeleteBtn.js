import React, {useState} from 'react'
import {Button,Icon, Confirm} from 'semantic-ui-react'
import {useMutation} from '@apollo/react-hooks';
import { DELETE_POST_MUTATION, FETCH_POSTS_QUERY } from '../graphQueries/FetchPosts';


export const DeleteBtn = ({postId, callback}) => {
  const [toggle, setToggle] = useState(false)
  const [deletePost] = useMutation(DELETE_POST_MUTATION, {
    variables: { postId },
    update(proxy){
      setToggle(false)
      //TODO: Remove post from cache(UI)
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY
      })
      data.getPosts = data.getPosts.filter(el => el.id !== postId)
      proxy.writeQuery({query: FETCH_POSTS_QUERY, data })
      if(callback) callback()
    }
  })
  return <>
    <Button as="div" color="red" floated="right" onClick={() => setToggle(true)}>
      <Icon name="trash" style={{margin:0}}/>
    </Button>
    <Confirm 
      open={toggle} 
      onCancel={() => setToggle(false)} 
      onConfirm={deletePost}
    />
  </>
}
