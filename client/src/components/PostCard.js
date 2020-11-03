import React from 'react'
import {Card, Image, Button} from 'semantic-ui-react'

const PostCard = ({post:{ body, createdAt, id, username, likeCount, commentCount, likes }}) => {
  return (
    <Card>
      <Card.Content>
        <Image
          floated='right'
          size='mini'
          src='https://react.semantic-ui.com/images/avatar/large/molly.png'
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta>{createdAt}</Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>hahaaha
      </Card.Content>
    </Card>
  )
}

export default PostCard;