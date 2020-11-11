import React, {useContext} from 'react'
import {useQuery} from '@apollo/react-hooks'
import { Grid, GridColumn, Transition } from 'semantic-ui-react'
import {FETCH_POSTS_QUERY} from '../graphQueries/FetchPosts';
import {AuthContext} from '../context/auth'
import PostCard from '../components/PostCard'
import PostForm from '../components/PostForm'

const Home = () => {
  const { loading, data } = useQuery(FETCH_POSTS_QUERY)
  const {user} = useContext(AuthContext)

  return loading ? <h1>Loading Posts...</h1> : 
    <Grid columns={3} divided>
      <Grid.Row className="page-title">
        <h1>Recent Posts</h1>
      </Grid.Row>
      <Grid.Row>
        {user && <GridColumn><PostForm /></GridColumn>}
        <Transition.Group>
        { data.getPosts.length > 0 ? ( 
            data.getPosts.map(post => (  
              <Grid.Column key={post.id} style={{marginBottom: 20}}>    
                <PostCard post={post} />          
              </Grid.Column>))
          ): null
        }</Transition.Group>
      </Grid.Row>
    </Grid>
}


export default Home;