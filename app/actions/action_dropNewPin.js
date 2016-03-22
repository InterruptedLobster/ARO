import { DROP_NEW_PIN } from '../constants/constants.js';
import { userData } from '../lib/db/db.js';
let currentId = 0;
function dropNewPin(pinInfo, currentId) {
  return {
    type: DROP_NEW_PIN,
    id: currentId,
    payload: pinInfo
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
              //this assigns pushedObj to added pin object while adding to db
              let pushedObj = userData.push(coords);
              dispatch(dropNewPin(coords, pushedObj.key()));
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
        let pushedObj = userData.push(coords);
        dispatch(dropNewPin(coords, pushedObj.key()));
      }
    };
}
