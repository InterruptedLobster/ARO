import { DROP_NEW_PIN } from '../constants/constants.js';
import {store } from 'redux';
let nextPinId = 0;


function dropNewPin(pinInfo) {
  return {
    type: DROP_NEW_PIN,
    id: nextPinId++,
    pinInfo: pinInfo
  };
}

export default function getLocationToSave() {
  return (dispatch) => {
    navigator.geolocation.getCurrentPosition(
    (position) => {
        var coords = {};
        coords.long = position.coords.longitude;
        coords.lat = position.coords.latitude;
        coords.title = 'My Current Location';
        dispatch(dropNewPin(coords));
    },
    (error) => {
      alert(error.message);
    },
    {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
  };

}