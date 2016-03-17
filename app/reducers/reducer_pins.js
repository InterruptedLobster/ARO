import {PIN_MAP, DROP_NEW_PIN} from '../constants/constants.js';

const initialState = {
  pins: []
};

export default function(state = initialState, action) {
  switch(action.type) {
    case PIN_MAP:
      return  Object.assign({}, state);
    case DROP_NEW_PIN:
      return Object.assign({}, state, {
        pins: [
        ...state.pins,
          {
            id: action.id,
            pinInfo: action.pinInfo,
            visible: true
          }
        ]
      })
    default:
      return state;
  }
}
