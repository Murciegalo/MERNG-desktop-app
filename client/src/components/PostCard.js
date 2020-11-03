import React from 'react'
import { Link } from 'react-router-dom';
import {Card, Image, Button, Icon, Label} from 'semantic-ui-react'

const PostCard = ({post:{ body, createdAt, id, username, likeCount, commentCount, likes }}) => {
  const likePost = () => {
    console.log('text')
  }
  const commentPost = () => {
    console.log('tatat')
  }
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
        <Card.Description as={Link} to={`/posts/${id}`}>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button 
          as="div" 
          labelPosition="right"
          onClick={likePost}
        >
          <Button color="teal" basic>
            <Icon name="heart" />
          </Button>
          <Label basic color="teal" pointing="left">
            {likeCount}
          </Label>
        </Button>
        <Button 
          as="div" 
          labelPosition="right"
          onClick={commentPost}
        >
          <Button color="blue" basic>
            <Icon name="comments" />
          </Button>
          <Label basic color="blue" pointing="left">
            {commentCount}
          </Label>
        </Button>
      </Card.Content>
    </Card>
  )
}

export default PostCard;