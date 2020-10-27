const { AuthenticationError, UserInputError } = require('apollo-server');
const Post = require('../../Models/Post');
const authCheck = require('../../utils/authCheck');


module.exports = {
  Query:{
    async getPosts(){
      try {
        const posts = await Post.find().sort({createdAt: -1})
        return posts
      } 
      catch (err) {
        throw new Error(err.message)
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
      const newPost = new Post({
        body,
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString()
      })
      const savedPost = await newPost.save()
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
          throw new AuthenticationError('Action not allowed')
        }  
      } 
      catch (err) {
        throw new Error(err)
      }
    },
    async createComment(_, { postId, body }, context){
      const user = authCheck(context)
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
          username: user.username, 
          createdAt: new Date().toISOString()
        })
        await post.save()
        return post;
      }
      else throw new UserInputError('Post not found')
    },
    async deleteComment(_, { body }, context){
      const user = authCheck(context)
    },
    async likePost(_, { body }, context){
      const user = authCheck(context)
    }
  }
}