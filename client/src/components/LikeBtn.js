import React, {useEffect,useState} from 'react'
import {Button, Icon, Label} from 'semantic-ui-react'
import {useMutation} from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';

const LikeBtn = ({user, post:{id, likes}}) => {
  const [liked, setLiked] = useState(false)
  useEffect(() => {
    if(user && likes.find(like => like.username === user.username)){
      setLiked(true)
    }
    else{
      setLiked(false)
    }
  }
  ,[user, likes])

  const [likePost] = useMutation(LIKE_POST_MUTATION, {
    variables: { postId: id }
  })
  const likedBtn = user && liked ? <Button color="teal">
      <Icon name="heart" />
    </Button>
    : !user ?
    <Button as={Link} to="/login" color="teal" basic>
      <Icon name="heart" />
    </Button>
    : 
    <Button color="teal" basic>
      <Icon name="heart" />
  </Button>

  return (
    <Button 
       as="div" 
       labelPosition="right"
       onClick={likePost}
     >
      {likedBtn}     
       <Label basic color="teal" pointing="left">
         {likes.length}
       </Label>
  </Button>
  )
}

const LIKE_POST_MUTATION = gql`
  mutation likePost($postId:ID!){
    likePost(postId: $postId){
      id
      likes{
        username
        id
      }
      likeCount
    }
  }
`

export default LikeBtn;