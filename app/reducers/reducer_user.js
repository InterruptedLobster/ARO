import {SIGN_UP, LOG_IN, LOG_OUT, GET_INFO, GET_PHOTO} from '../constants/constants.js';

var initialState = {};

export default function(state = initialState, action) {
  switch(action.type){
    case LOG_IN:
    let userInfo = {};
      userInfo[action.payload.uid] = action.payload;
      return userInfo;
    case LOG_OUT:
      return initialState;
    default:
      return state;
  }
}
