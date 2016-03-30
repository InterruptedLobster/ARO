import { DROP_NEW_PIN, UPDATE_RECENT, SET_RECENT} from '../constants/constants';
import { userData, userRecent } from '../lib/db/db';
import setTarget from './action_setTarget';

function dropNewPin(payload, id) {
  return {
    type: DROP_NEW_PIN,
    id,
    payload
  };
}

function setRecent(payload) {
  return {
    type: SET_RECENT,
    payload
  };
}

//checks length of recent pins array in store
function checkRecent(current = [], id) {
  var updated;
  if(!Array.isArray(current)) {
    return [id];
  }
  if(current.length >= 10) {
    updated = current.slice(1);
    updated.push(id);
    return updated;
  } else {
    current = current.concat(id);
    return current;
  }
}

//called whenever a pin is saved
export default function getLocationToSave(location, current, pinTitle) {

  //abstracted helper function for pins saved through clicking anywhere on map or dropping on current location
  function getLocationHelper(loc, title, dispatch){
    let coords = {}, recent;
     coords.longitude = loc.longitude;
     coords.latitude = loc.latitude;
     coords.title = title;

     // this assigns pushedObj to added pin object while adding to db
     let pushedObj = userData.push(coords);
     coords.id = pushedObj.key();

     // this adds the 'key' as a key-value pair in the pin object
     pushedObj.update({"id": pushedObj.key()});
     dispatch(dropNewPin(coords, pushedObj.key()));

     // set the target to the most recently dropped pin
     dispatch(setTarget(coords));

     // this updates the recent pins state
     recent = checkRecent(current, coords.id);

     dispatch(setRecent(recent));

     //updates recent pins in db
     userRecent.set(recent);
  }

  return (dispatch) => {

      if(!location) { //if dropping pin on current location
        navigator.geolocation.getCurrentPosition(
          (position) => {
             getLocationHelper(position.coords, "My Current Location", dispatch);
          },
          (error) => {
            console.error(error);
          },
          {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
        );
      } else { //if dropping a pin by clicking anywhere on map
        if(pinTitle === '') {
          pinTitle = 'New Totem';
        }
        getLocationHelper(location, pinTitle, dispatch );
      }
    };
}
