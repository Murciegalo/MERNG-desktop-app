import React from 'react'
import {Card} from 'semantic-ui-react'
import { DeleteBtn } from './DeleteBtn';

const SingleComment = ({comment:{id,username,createdAt,body}, user, postId}) => {
  return <Card fluid key={id}>
    <Card.Content>
      <Card.Header>{username}</Card.Header>
      <Card.Meta>{createdAt.toLocaleString("mm/dd/yyyy")}</Card.Meta>
      <Card.Description>{body}</Card.Description>
      {user && user.username === username && <DeleteBtn commentId={id} postId={postId}/>}
    </Card.Content>
  </Card>
}
export default SingleComment;