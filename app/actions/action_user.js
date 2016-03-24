import { SIGN_UP, LOG_IN, LOG_OUT, GET_PHOTO, GET_INFO } from '../constants/constants.js';
import { ref } from '../lib/db/db.js';
export const signUp = (payload) => {
  return {
    type: SIGN_UP,
    payload
  };
};

export const getPhoto = (payload) => {
  return {
    type: GET_PHOTO,
    payload
  };
};

export const getInfo = (payload) => {
  return {
    type: GET_INFO,
    payload
  };
};

export const logIn = (payload) => {
  return {
    type: LOG_IN,
    payload
  };
};

export const logOut = () => {
  return {
    type: LOG_OUT
  };


