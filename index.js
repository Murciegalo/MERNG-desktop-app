const { ApolloServer } = require('apollo-server');
const gql = require('graphql-tag');
const mongoose = require('mongoose');
const { MONGO_DB } = require('./confg.js')

const typeDefs = gql`
  type Query{
    sayHi: String!
  }
`

const resolvers = {
  Query:{
    sayHi: () => 'Hello World'
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