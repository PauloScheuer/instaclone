import { SET_POSTS, CREATING_POST, POST_CREATED, ADD_COMMENT } from '../actions/actionTypes';

const initialPosts = {
  posts: [

  ],
  isUploading: false
}

const postReducer = (state = initialPosts, action) => {
  switch (action.type) {
    case SET_POSTS:
      return {
        ...state,
        posts: action.payload
      }
    case CREATING_POST:
      return {
        ...state,
        isUploading: true
      }
    case POST_CREATED:
      return {
        ...state,
        isUploading: false
      }
    case ADD_COMMENT:
      return {
        ...state,
        posts: state.posts.map(post => {
          if (post.id === action.payload.postId) {
            if (post.comments) {
              post.comments = post.comments.concat(action.payload.comment);
            } else {
              post.comments = [action.payload.comment]
            }
          }
          return post;
        })
      }
    default:
      return state;
  }
}

export default postReducer;