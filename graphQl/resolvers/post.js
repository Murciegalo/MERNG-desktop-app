const { AuthenticationError, UserInputError } = require('apollo-server')
const Post = require('../../Models/Post')
const authCheck = require('../../utils/authCheck')

module.exports = {
  Query:{
    async getPosts() {
      try {
        const posts = await Post.find().sort({ createdAt: -1 })
        return posts
      } 
      catch (err) {
        throw new Error(err)
      }
    },
    async getPost(_, {postId}){
      try {
        const post = await Post.findById(postId)
        if(post){
          return post
        }else{
          throw new Error('Post not found')
        }
      } 
      catch (err) {
        throw new Error(err)
      }
    }
  },
  Mutation:{
    async createPost(_, { body }, context){
      const user = authCheck(context)
      if(body.trim() === ''){
        return new Error('Please write something nice ,xD')
      }
      const newPost = new Post({
        body,
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString()
      })
      const savedPost = await newPost.save()
      //Publish 
      context.pubsub.publish('New Post', {
        newPost: savedPost 
      })
      return savedPost;
    },
    async deletePost(_, { postId }, context){
      const user = authCheck(context)
      try {
        const post = await Post.findById(postId)
        if(user.username === post.username){
          await post.delete()
          return 'Post deleted successfully'
        }
        else{
          throw new AuthenticationError('You can only delete your own posts, sorry')
        }  
      } 
      catch (err) {
        throw new Error(err)
      }
    },
    async createComment(_, { postId, body }, context){
      const {username} = authCheck(context)
      if(body.trim() === ''){
        throw new UserInputError('Empty comment',{
          errors: {
            body: 'Please don\'t forget to write your comment'
          }
        })
      }
      const post = await Post.findById(postId)
      if(post){
        post.comments.unshift({ 
          body, 
          username, 
          createdAt: new Date().toISOString()
        })
        await post.save()
        return post;
      }
      else throw new UserInputError('Post not found')
    },
    async deleteComment(_, { postId, commentId }, context){
      const {username} = authCheck(context)
      const post = await Post.findById(postId)
      if(post){
        const findComment = post.comments.findIndex(c => c.id === commentId)
        if(post.comments[findComment].username === username){
          post.comments.splice(findComment,1);
          await post.save()
          return post;
        }
        else{
          throw new AuthenticationError('Sorry, you can only remove your own comments')
        }
      }
      else throw new UserInputError('Post not found')
    },
    async likePost(_, { postId }, context){
      const {username} = authCheck(context)
      const post = await Post.findById(postId)
      if(post){
        // Already liked?
        if(post.likes.find(like => like.username === username)){
          post.likes = post.likes.filter(like => like.username !== username)
        }
        else{
          post.likes.push({
            username,
            createdAt: new Date().toISOString()
          })
        }
        await post.save()
        return post
      }
      else throw new UserInputError('Post not found')
    },
  },
  Subscription:{
    newPost:{                                       //convention type
      subscribe:(_,__,{ pubsub }) => pubsub.asyncIterator('New Post')
    }
  }
}