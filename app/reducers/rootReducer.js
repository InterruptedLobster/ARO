import { combineReducers } from 'redux';
import pins from './reducer_pins';
import recent from './reducer_recent.js';

const rootReducer = combineReducers({
  pins,
  recent
});

export default rootReducer;
