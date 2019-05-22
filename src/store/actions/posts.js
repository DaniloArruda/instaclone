import { ADD_COMMENT, SET_POSTS, CREATING_POST, POST_CREATED } from "./actionTypes";
import axios from "axios";
import { setMessage } from "./message";

export const addPost = post => {
  return (dispatch, getState) => {
    dispatch(creatingPost());

    axios({
      url: 'uploadImage',
      baseURL: 'https://us-central1-insta-4b47e.cloudfunctions.net',
      method: 'post',
      data: {
        image: post.image.base64
      }
    }).then(response => {
        post.image = response.data.imageUrl;
        axios.post(`/posts.json?auth=${getState().user.token}`, { ...post })
          .then(res => {
            dispatch(fetchPosts());
            dispatch(postCreated());
          })
          .catch(err => dispatch(setMessage({ text: 'Ocorreu um erro inesperado' })));
      })
      .catch(err => dispatch(setMessage({ text: 'Ocorreu um erro inesperado' })));

  }

}

export const addComment = payload => {
  return (dispatch, getState) => {
    axios.get(`/posts/${payload.postId}.json`)
      .then(res => {
        const comments = res.data.comments || [];
        comments.push(payload.comment);

        axios.patch(`/posts/${payload.postId}.json?auth=${getState().user.token}`, { comments })
          .then(res => {
            dispatch(fetchPosts());
          })
          .catch(err => dispatch(setMessage({ text: 'Ocorreu um erro inesperado' })));
      })
      .catch(err => dispatch(setMessage({ text: 'Ocorreu um erro inesperado' })));
  }
}

export const setPosts = posts => {
  return {
    type: SET_POSTS,
    payload: posts
  }
}

export const fetchPosts = () => {
  return dispatch => {
    axios.get('/posts.json')
      .then(res => {
        const rawPosts = res.data;
        const posts = [];

        for (key in rawPosts) {
          posts.push({
            ...rawPosts[key],
            id: key,
          })
        }

        dispatch(setPosts(posts.reverse()));
      })
      .catch(err => console.log(err));
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