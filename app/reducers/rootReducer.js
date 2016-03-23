import { combineReducers } from 'redux';
import pins from './reducer_pins';
import user from './reducer_user';
import recent from './reducer_recent.js';

const rootReducer = combineReducers({
  pins,
  recent,
  user
});

export default rootReducer;
