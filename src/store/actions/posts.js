import { ADD_COMMENT, SET_POSTS, CREATING_POST, POST_CREATED } from "./actionTypes";
import axios from "axios";

export const addPost = post => {
  return dispatch => {
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
        axios.post('/posts.json', { ...post })
          .then(res => {
            dispatch(fetchPosts());
            dispatch(postCreated());
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));

  }

}

export const addComment = payload => {
  return dispatch => {
    axios.get(`/posts/${payload.postId}.json`)
      .catch(err => console.log(err))
      .then(res => {
        const comments = res.data.comments || [];
        comments.push(payload.comment);

        axios.patch(`/posts/${payload.postId}.json`, { comments })
          .catch(err => console.log(err))
          .then(res => {
            dispatch(fetchPosts());
          });
      })
  }
  // return {
  //   type: ADD_COMMENT,
  //   payload
  // }
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