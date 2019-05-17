import { SET_MESSAGE } from "../actions/actionTypes";

const initalState = {
  title: '',
  text: ''
}

const messageReducer = (state = initalState, action) => {
  switch (action.type) {
    case SET_MESSAGE:
      return {
        ...state,
        title: action.payload.title,
        text: action.payload.text
      }
    
    default: 
      return state
  }
}

export default messageReducer;