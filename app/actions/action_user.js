import { SIGN_UP, LOG_IN, LOG_OUT } from '../constants/constants.js';
import { ref } from '../lib/db/db.js';
export const signUp = (payload) => {
  return {
    type: SIGN_UP,
    payload
  };
};

export const logIn = (payload) => {
  return {
    type: LOG_IN,
    payload
  };
};


export const logOut = (payload) => {
  return {
    type: LOG_OUT,
    payload
  };
};

export const fbauth = () => {

};

// ref.authWithOAuthRedirect("facebook", function(error) {
//   if (error) {
//     console.log("Login Failed!", error);
//   } else {
//     // We'll never get here, as the page will redirect on success.
//   }
// });

// ref.authWithOAuthPopup("facebook", function(error, authData) {
//   if (error) {
//     console.log("Login Failed!", error);
//   } else {
//     console.log("Authenticated successfully with payload:", authData);
//   }
// });
