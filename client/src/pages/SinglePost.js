import React, {useContext} from 'react'
import {Button, Card, Form, Grid, Icon, Image, Label} from 'semantic-ui-react'
import {useMutation, useQuery} from '@apollo/react-hooks';
import { FETCH_POST_QUERY, SUBMIT_COMMENT_MUTATION } from '../graphQueries/FetchPosts';
import LikeBtn from '../components/LikeBtn';
import {AuthContext} from '../context/auth'
import { DeleteBtn } from '../components/DeleteBtn';
import SingleComment from '../components/SingleComment';
import { useState } from 'react';

const SinglePost = (props) => {
  let markUp;
  const postId = props.match.params.postId
  const {user} = useContext(AuthContext)

  const [comment, setComment] = useState('')
  const {data} = useQuery(FETCH_POST_QUERY, {
    variables: {postId}
  });
  const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
    update(){
      setComment('')
    },
    variables:{
      postId,
      body: comment
    }
  })
  // Redirect on update => Mutation
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
          {user && <Card fluid>
            <Card.Content>
              <h3>Post a comment</h3>
              <Form>
                <div className="ui action input fluid">
                  <input 
                    type="text" 
                    placeholder="Comment.." 
                    name="comment" 
                    value={comment} 
                    onChange={e => setComment(e.target.value)} 
                  />
                  <button 
                    type="submit" 
                    className="ui button teal"
                    disabled={comment.trim() === ''}
                    onClick={submitComment}
                  > 
                    Submit
                  </button>
                </div>
              </Form>
            </Card.Content>
          </Card>}
          {comments.map(c => <SingleComment key={c.id} comment={c} user={user} postId={id} />)}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  }
  return markUp 
}

export default SinglePost;