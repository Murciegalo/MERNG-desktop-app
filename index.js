const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
const typeDefs = require('./graphQl/typeDefs')
const Post = require('./Models/Post')
const { MONGO_DB } = require('./confg.js')



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