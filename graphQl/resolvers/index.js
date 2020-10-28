const postResolvers = require('./post');
const usersResolvers = require('./users');

module.exports = {
  Post:{
    likeCount: parent => parent.likes.length,
    commentCount: parent => parent.comments.length
  },
  Query: {
    ...postResolvers.Query ,
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...postResolvers.Mutation
  },
  Subscription: {
    ...postResolvers.Subscription
  }
}