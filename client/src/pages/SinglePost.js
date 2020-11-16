import React, {useContext} from 'react'
import {Button, Card, Grid, Icon, Image, Label} from 'semantic-ui-react'
import {useQuery} from '@apollo/react-hooks';
import { FETCH_POST_QUERY } from '../graphQueries/FetchPosts';
import LikeBtn from '../components/LikeBtn';
import {AuthContext} from '../context/auth'

const SinglePost = (props) => {
  let markUp;
  const postId = props.match.params.postId
  const {user} = useContext(AuthContext)

  const {data:{ getPost }} = useQuery(FETCH_POST_QUERY, {
    variables: {postId}
  });

  if(!getPost){
    markUp = <p>Loading post...</p>
  }
  else{
    const {id, body, createdAt, username, comments, likes, likeCount, commentCount } = getPost;
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
              <LikeBtn user={user} post={{id,likeCount,likes}}/>
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
            </Card.Content>
          </Card>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  }
  return (
    <>
     {markUp} 
    </>
  )
}

export default SinglePost;