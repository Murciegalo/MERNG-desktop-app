const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');

const { MONGO_DB } = require('./confg.js')
const typeDefs = require('./graphQl/typeDefs');
const resolvers = require('./graphQl/resolvers/index');


const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({req}) => ({req}) //forward the req.body from the request to context 
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