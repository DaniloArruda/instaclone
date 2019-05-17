import { combineReducers, createStore, compose, applyMiddleware } from 'redux'
import userReducer from './reducers/userReducer';
import postsReducer from './reducers/postsReducer';
import thunk from 'redux-thunk';
import messageReducer from './reducers/messageReducer';

const reducers = combineReducers({
  user: userReducer,
  posts: postsReducer,
  message: messageReducer 
})

const storeConfig = () => {
  return createStore(reducers, compose(applyMiddleware(thunk)));
}

export default storeConfig;