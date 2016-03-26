import { combineReducers } from 'redux';
import pins from './reducer_pins';
import recent from './reducer_recent.js';
import user from './reducer_user';
const rootReducer = combineReducers({
  pins,
  recent,
  user
});

export default rootReducer;
