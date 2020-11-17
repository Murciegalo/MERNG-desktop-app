import gql from 'graphql-tag'

export const FETCH_POSTS_QUERY = gql`
{
  getPosts{
    id body createdAt username likeCount
    likes{
      username
    }
    commentCount
    comments{
      id username createdAt body
    }
  }
}
`
export const FETCH_POST_QUERY = gql`
  query($postId:ID!){
    getPost(postId: $postId){
      id
      body
      createdAt
      username
      likes{
        username
      }
      commentCount
      comments{
        id
        username
        createdAt
        body
      }
    }
  }
`
export const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId:ID!){
    deletePost(postId: $postId)
  }
`

export const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($postId:ID!, $commentId:ID!){
    deleteComment(postId: $postId, commentId: $commentId){
      id
      comments{
        id
        username
        createdAt
        body
      }
      commentCount
    }
  }
`