import React, {useContext} from 'react'
import { Link } from 'react-router-dom';
import {Card, Image, Button, Icon, Label,Popup} from 'semantic-ui-react'
import {AuthContext} from '../context/auth';
import { DeleteBtn } from './DeleteBtn';
import LikeBtn from './LikeBtn';

const PostCard = ({
  post:{ body, createdAt, id, username, likeCount, commentCount, likes }
}) => {
  const {user} = useContext(AuthContext)

  const deleteBtn = user && user.username === username && <DeleteBtn postId={id} />
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
        <LikeBtn user={user} post={{id,likes,likeCount}}/>
        <Popup
          content="Comment on post"
          trigger={
            <Button 
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
          }
        />
        {deleteBtn}
      </Card.Content>
    </Card>
  )
}

export default PostCard;