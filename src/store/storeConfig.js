import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import userReducer from './reducers/userReducer';
import postReducer from './reducers/postReducer';
import messageReducer from './reducers/messageReducer';

const reducers = combineReducers({
  user: userReducer,
  post: postReducer,
  message: messageReducer
});

const storeConfig = () => {
  return createStore(reducers, compose(applyMiddleware(thunk)));
}

export default storeConfig;