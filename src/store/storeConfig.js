import { combineReducers, createStore, compose, applyMiddleware } from 'redux'
import userReducer from './reducers/userReducer';
import postsReducer from './reducers/postsReducer';
import thunk from 'redux-thunk';

const reducers = combineReducers({
  user: userReducer,
  posts: postsReducer
})

const storeConfig = () => {
  return createStore(reducers, compose(applyMiddleware(thunk)));
}

export default storeConfig;