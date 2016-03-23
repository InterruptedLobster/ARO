import { SIGN_UP } from '../constants/constants.js';

function signUp(payload) {
  return {
    type: SIGN_UP,
    payload
  };
}
