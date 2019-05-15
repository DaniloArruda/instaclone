import { combineReducers, createStore } from 'redux'
import userReducer from './reducers/userReducer';
import postsReducer from './reducers/postsReducer';

const reducers = combineReducers({
  user: userReducer,
  posts: postsReducer
})

const storeConfig = () => {
  return createStore(reducers);
}

export default storeConfig;