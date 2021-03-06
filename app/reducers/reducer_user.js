import { LOG_IN, LOG_OUT } from '../constants/constants.js';

var initialState = {};

export default function(state = initialState, action) {
  switch(action.type){
    case LOG_IN:
      return action.payload;
    case LOG_OUT:
      return initialState;
    default:
      return state;
  }
}
