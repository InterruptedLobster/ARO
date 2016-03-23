import { SIGN_UP, LOG_IN, LOG_OUT } from '../constants/constants.js';

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
