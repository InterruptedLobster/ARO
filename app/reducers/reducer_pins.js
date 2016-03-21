import {DROP_NEW_PIN, UPDATE_PINS} from '../constants/constants.js';

const testObj = {
 0: { title: 'AWS', latitude: 37.783278, longitude: -122.4084808 },           // AWS
 1: { title: 'Punjab', latitude: 37.7840612, longitude: -122.4093445 },       // Punjab
 2: { title: 'Hack Reactor', latitude: 37.7835551, longitude: -122.4089013 },
 3: { title: 'Apple Inc', latitude: 37.78825, longitude: -122.4324} // Hack Reactor
};

const initialState = testObj;


export default function(state = initialState, action) {
  switch(action.type) {
    case UPDATE_PINS:
      return Object.assign({}, state,
         action.payload
      );
    case DROP_NEW_PIN:
      return Object.assign({}, state,
        action.id = action.payload
      );
    default:
      return state;
  }
}

// state.pins = {{},{},{}}
