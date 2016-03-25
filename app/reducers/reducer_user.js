import {SIGN_UP, LOG_IN, LOG_OUT, GET_INFO, GET_PHOTO} from '../constants/constants.js';

var initialState = {};
//this is action.payload:
// { tokenExpirationDate: '2016-05-22T17:41:07-07:00',
//   permissions: [ 'email', 'contact_email', 'user_friends', 'public_profile' ],
//   userId: '10153780375328598',
//   token: 'CAAYZANvux7B...etc..gBAOCT0knZg' }

export default function(state = initialState, action) {
  switch(action.type){
    case SIGN_UP:
      return Object.assign({}, state,
        action.payload
        );
    case LOG_IN:
    let userInfo = {};
      userInfo[action.payload.uid] = action.payload;
      return userInfo;
    case LOG_OUT:
      return initialState;
    case GET_PHOTO:
    // console.log("%%%%% made it to action GET_PHOTO", action.payload);
      return Object.assign({}, state,
        action.payload
      );
    case GET_INFO:
      // console.log("%%%%% made it to action GET_INFO", action.payload);
      return Object.assign({}, state,
        action.payload
      );
    default:
      return state;
  }
}
