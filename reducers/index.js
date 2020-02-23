import {combineReducers} from 'redux';
import todoReducers from './todoReducers';
import authReducers from './authReducers';
export default combineReducers({
  auth: authReducers,
  todo: todoReducers,
});
