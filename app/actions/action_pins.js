import { DROP_NEW_PIN } from '../constants/constants.js';
import { store } from 'redux';
let nextPinId = 3;

function dropNewPin(pinInfo) {
  return {
    type: DROP_NEW_PIN,
    id: nextPinId++,
    longitude: pinInfo.longitude,
    latitude: pinInfo.latitude,
    title: pinInfo.title
  };
}

export default function getLocationToSave(location) {

  return (dispatch) => {
      var coords = {};
      if(!location) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
              coords.longitude = position.coords.longitude;
              coords.latitude = position.coords.latitude;
              coords.title = 'My Current Location';
              dispatch(dropNewPin(coords));
          },
          (error) => {
            console.error(error);
          },
          {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
        );
        
      } else {
        coords.longitude = location.longitude;
        coords.latitude = location.latitude;
        coords.title = 'New Pin Location';
        dispatch(dropNewPin(coords));
      }
    };
}
