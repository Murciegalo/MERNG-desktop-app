import React, {useContext} from 'react'
import {Button, Card, Grid, Icon, Image, Label} from 'semantic-ui-react'
import {useQuery} from '@apollo/react-hooks';
import { FETCH_POST_QUERY } from '../graphQueries/FetchPosts';
import LikeBtn from '../components/LikeBtn';
import {AuthContext} from '../context/auth'
import { DeleteBtn } from '../components/DeleteBtn';

const SinglePost = (props) => {
  let markUp;
  const postId = props.match.params.postId
  const {user} = useContext(AuthContext)

  const {data} = useQuery(FETCH_POST_QUERY, {
    variables: {postId}
  });
  
  
  const deletePostCB = () => props.history.push('/')
  const deleteBtn = user && data && user.username === data.getPost.username && <
    DeleteBtn 
      postId={data.getPost.id}
      callback={deletePostCB} 
    />

  if(!data){
    markUp = <p>Loading post...</p>
  }
  else{
    const {id, body, createdAt, username, comments, likes, commentCount } = data.getPost;
    markUp = <Grid>
      <Grid.Row>
        <Grid.Column width={2}>
          <Image 
            src="https://react.semantic-ui.com/images/avatar/small/molly.png"
            float="right"
          />  
        </Grid.Column>
        <Grid.Column width={10}>
          <Card fluid>
            <Card.Content>
              <Card.Header>{username}</Card.Header>
              <Card.Meta>{createdAt.toLocaleString('YYYY:MM:DD')}</Card.Meta>
              <Card.Description>{body}</Card.Description>
            </Card.Content>
            <hr/>
            <Card.Content extra>
              <LikeBtn user={user} post={{id,likes}}/>
              <Button
                as="div"
                labelPosition="right"
                onClick={() => console.log('in progress')}
              >
                <Button color="blue" basic>
                  <Icon name="comments"/>
                </Button>
                <Label basic color="blue" pointing="left">
                  {commentCount}
                </Label>
              </Button>
              {deleteBtn}
            </Card.Content>
          </Card>
          {comments.map(c => <Card fluid key={c.id}>
            <Card.Content>
              <Card.Header>{c.username}</Card.Header>
              <Card.Meta>{c.createdAt.toLocaleString("mm/dd/yyyy")}</Card.Meta>
              <Card.Description>{c.body}</Card.Description>
            </Card.Content>
          </Card>)}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  }
  return markUp 
}

export default SinglePost;