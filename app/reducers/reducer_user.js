import {SIGN_UP, LOG_IN, LOG_OUT} from '../constants/constants.js';

var initialState = {};

export default function(state = initialState, action) {
  switch(action.type){
    case SIGN_UP:
      return Object.assign({}, state,
        action.payload
        );
    case LOG_IN:
      return Object.assign({}, state,
        action.payload
        );
    case LOG_OUT:
      return Object.assign({}, state,
        action.payload
        );
    default:
      return state;
  }
}
