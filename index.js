const { ApolloServer } = require('apollo-server');
const gql = require('graphql-tag');
const mongoose = require('mongoose');

const Post = require('./Models/Post')
const { MONGO_DB } = require('./confg.js')

const typeDefs = gql`
  type Post{
    id: ID!
    body: String!
    createdAt: String!
    username: String!
  }
  type Query{
    getPosts: [Post]
  }
`

const resolvers = {
  Query:{
    async getPosts(){
      try {
        const posts = await Post.find()
        return posts
      } 
      catch (err) {
        throw new Error(err.message)
      }
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

mongoose.connect( 
  MONGO_DB , 
  { 
    useNewUrlParser: true ,
    useUnifiedTopology: true
  }
)
  .then(() => {
    console.log('DB!')
    return server.listen({ port: 4000 })
  })
  .then( res => console.log(`Server on: ${res.url}`))