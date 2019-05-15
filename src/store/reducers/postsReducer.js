import { ADD_POST, ADD_COMMENT } from '../actions/actionTypes'

const initialState = {
  posts: [
    {
      id: Math.random(),
      nickname: 'Rafael Pereira',
      email: 'rafael@email.com',
      image: require('../../../assets/imgs/fence.jpg'),
      comments: [
        {
          nickname: 'João Filho',
          comment: 'Stunning!'
        },
        {
          nickname: 'Maria Joana',
          comment: 'Foto legal! Onde foi tirada?',
        },
      ]
    },
    {
      id: Math.random(),
      nickname: 'José Pereira',
      email: 'jose@email.com',
      image: require('../../../assets/imgs/bw.jpg'),
      comments: [],
    }
  ]
}

const postsReducer = (state = initialState, action) => {
  switch(action.type) {
    case ADD_POST:
      return {
        ...state,
        posts: state.posts.concat({
          ...action.payload
        })
      }
    
    case ADD_COMMENT:
      return {
        ...state,
        posts: state.posts.map(post => {
          if (post.id === action.payload.postId) {
            if (post.comments) {
              post.comments = post.comments.concat(action.payload.comment);
            } else {
              post.comments = [action.payload.comment];
            }
          }

          return post;
        })
      }

    default:
      return state
  }
}

export default postsReducer;