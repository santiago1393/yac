
import {combineReducers} from 'redux';
import loginReducer from './reducer-login';
import chatReducer from './reducer-chat';

const rootReducer = combineReducers({
  // short hand property names
  //cats
  //products: productReducer,
  login: loginReducer,
  chat: chatReducer,
});

export default rootReducer;
