const gql = require('graphql-tag');

const typeDefs = gql`
  type Post{
    id: ID!
    body: String!
    createdAt: String!
    username: String!
  }
  type Query{
    getPosts: [Post]
    getPost(postId: ID!):Post
  }
  type User{
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
  }
  input RegisterInput{
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }
  type Mutation{
    register(registerInput: RegisterInput):User!
    login(email:String! , password:String!):User!
    createPost(body:String!):Post!
    deletePost(postId:ID!):String!
  }
`

module.exports = typeDefs;