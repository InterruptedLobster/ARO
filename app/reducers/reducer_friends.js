import { UPDATE_FRIENDS } from '../constants/constants.js';

var initialState = {};

export default function(state = initialState, action) {
  switch(action.type){
    case UPDATE_FRIENDS:
      return action.payload;
    default:
      return state;
  }
}
