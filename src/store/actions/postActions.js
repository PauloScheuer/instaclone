import { SET_POSTS, CREATING_POST, POST_CREATED, ADD_COMMENT } from './actionTypes';
import axios from 'axios';
import { setMessage } from './messageActions';
import RNFetchBlob from 'rn-fetch-blob';
const fs = RNFetchBlob.fs;

export const addPost = (post) => {
  return (dispatch, getState) => {
    dispatch(creatingPost());
    fs.readFile(post.image.uri, 'base64')
      .then(data => {
        axios({
          url: 'uploadImage',
          baseURL: 'https://us-central1-instaclone-683f4.cloudfunctions.net',
          method: 'post',
          data: {
            image: data
          }
        }).catch(err => {
          dispatch(setMessage({ title: 'Opa', text: 'Deu ruim' }))
        })
          .then(res => {
            post.image = res.data.imageURL;
            axios.post(`/posts.json?auth=${getState().user.token}`, { ...post })
              .catch(err => {
                dispatch(setMessage({ title: 'Opa', text: 'Deu ruim' }))
              })
              .then(res => {
                dispatch(getPosts());
                dispatch(postCreated());
                dispatch(setMessage({ title: 'Boa', text: 'Post cadastrado!' }))
              });
          })
      })
  }
}
export const addComment = (payload) => {
  return (dispatch, getState) => {
    axios.get(`/posts/${payload.postId}.json`)
      .catch(err => {
        dispatch(setMessage({ title: 'Opa', text: 'Deu ruim' }))
      })
      .then(res => {
        const comments = res.data.comments || [];
        comments.push(payload.comment);
        axios.patch(`/posts/${payload.postId}.json?auth=${getState().user.token}`, { comments })
          .catch(err => {
            dispatch(setMessage({ title: 'Opa', text: 'Deu ruim' }))
          })
          .then(res => {
            dispatch(getPosts());
          })
      })
  }
}

export const setPosts = (posts) => {
  return {
    type: SET_POSTS,
    payload: posts
  }
}
export const getPosts = () => {
  return dispatch => {
    axios.get('/posts.json')
      .catch(err => {
        dispatch(setMessage({ title: 'Opa', text: 'Deu ruim' }))
      })
      .then(res => {
        const rawPosts = res.data;
        const posts = [];
        for (const key in rawPosts) {
          posts.push({
            ...rawPosts[key],
            id: key
          })
        }
        dispatch(setPosts(posts.reverse()));
      })
  }
}

export const creatingPost = () => {
  return {
    type: CREATING_POST
  }
}

export const postCreated = () => {
  return {
    type: POST_CREATED
  }
}