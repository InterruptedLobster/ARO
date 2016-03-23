import {SIGN_UP, LOG_IN, LOG_OUT} from '../constants/constants.js';

const initialState = {
  username: null,
  token: null,
  error: null
};

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
      return initialState;
    default:
      return state;
  }
}
