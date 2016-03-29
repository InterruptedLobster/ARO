import { SET_TARGET, CLEAR_TARGET } from '../constants/constants.js';

function setTarget(payload) {
  return {
    type: SET_TARGET,
    payload
  };
}

function clearTarget() {
  return {
    type: CLEAR_TARGET,
  };
}

export default function(pin) {
  return (dispatch) => {
    dispatch(setTarget(pin));
  };
}
