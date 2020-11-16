import React, {useContext} from 'react'
import { Link } from 'react-router-dom';
import {Card, Image, Button, Icon, Label} from 'semantic-ui-react'
import {AuthContext} from '../context/auth';

const PostCard = ({
  post:{ body, createdAt, id, username, likeCount, commentCount, likes }
}) => {
  const {user} = useContext(AuthContext)
  const likePost = () => {
    console.log('text')
  }
  const deleteBtn = user && user.username === username ? <
    Button as="div" color="red" onClick={() => console.log('deleted')}>
      <Icon name="trash" />
    </Button> : ''
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
          as={Link}
          to={`/posts/${id}`}
        >
          <Button color="blue" basic>
            <Icon name="comments" />
          </Button>
          <Label basic color="blue" pointing="left">
            {commentCount}
          </Label>
        </Button>
        {deleteBtn}
      </Card.Content>
    </Card>
  )
}

export default PostCard;