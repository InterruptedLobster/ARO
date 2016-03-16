import {PIN_MAP} from '../constants/constants.js';
import {DROP_NEW_PIN} from '../constants/constants.js';

const initialState = {
  pins: []
};

export default function(state = initialState, action) {
  switch(action.type) {
    case 'PIN_MAP':
      return  Object.assign({}, state);
    case 'DROP_NEW_PIN':
      return Object.assign({}, state, {
        pins: [
        ...state.pins,
          {
            id: action.id,
            long: action.long,
            lat: action.lat,
            title:action.title,
            visible: true
          }
        ]
      })
    default:
      return state;
  }
}
