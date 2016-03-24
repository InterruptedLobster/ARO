import {SIGN_UP, LOG_IN, LOG_OUT, GET_INFO} from '../constants/constants.js';

const initialState = {
  userId : null,
  // userId: {
  //   token: null,
  //   email:null,
  //   permissions: null,
  //   error: null
  },
  photo: null,
  info: null,
  // photo : {
  //   url : null,
  //   height: null,
  //   width: null,
  // },
};
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
    // console.log("made it to action login !!!!!", action.payload);
    let userInfo = {};
      userInfo[action.payload.userId] = action.payload;
      // console.log("made it to action login !!!!!", userInfo);
      return action.payload;
    case LOG_OUT:
      return initialState;
    case GET_PHOTO:
      return Object.assign({}, state,
        action.payload
      )
    case GET_INFO:
      return Object.assign({}, state,
        action.payload
      )
    default:
      return state;
  }
}
