import {PIN_MAP, DROP_NEW_PIN} from '../constants/constants.js';

const testArray = [
  { id: 0, title: 'AWS', latitude: 37.783278, longitude: -122.4084808 },           // AWS
  { id: 1, title: 'Punjab', latitude: 37.7840612, longitude: -122.4093445 },       // Punjab
  { id: 2, title: 'Hack Reactor', latitude: 37.7835551, longitude: -122.4089013 }, // Hack Reactor
];

const initialState = {
  pins: testArray,
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
            longitude: action.longitude,
            latitude: action.latitude,
            title:action.title,
            visible: true
          }
        ]
      })
    default:
      return state;
  }
}
