import { ALERT_SHARE } from '../constants/constants.js';

var initialState = null;

export default function(state = initialState, action) {
  switch(action.type){
    case ALERT_SHARE:
      return action.payload;
    default:
      return state;
  }
}
