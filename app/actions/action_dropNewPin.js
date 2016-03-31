import { DROP_NEW_PIN, UPDATE_RECENT, SET_RECENT} from '../constants/constants';
import { userData, userRecent } from '../lib/db/db';
import setTarget from './action_setTarget';
import * as geoAction from '../lib/orientation/utils';


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

/* getLocationToSave is the called anytime a pin is dropped by one of two ways
1) when user drops pin by clicking on map, location is passed in when invoked
location is a coords obj w long, lat.

2) when user drops pin by pressing button, location is omitted and getLocationToSave
will fetch user's current location.

prevRecent is the previous recent array, we pass this in so checkRecent can
produce a new recent array

pinTitle is what the user names the pin when dropping by clicking on map.
*/

export default function getLocationToSave(location, prevRecent, pinTitle) {

  //abstracted helper function for pins saved through clicking anywhere on map or dropping on current location
  function getLocationHelper(loc, title, dispatch){
    let recent;
    loc.title = title;
    // this assigns pushedObj to added pin object while adding to db
    let pushedObj = userData.push(loc);
    loc.id = pushedObj.key();
    // this adds the 'key' as a key-value pair in the pin object
    pushedObj.update({"id": pushedObj.key()});
    dispatch(dropNewPin(loc, pushedObj.key()));
    // set the target to the most recently dropped pin
    dispatch(setTarget(loc));
    // this updates the recent pins state
    recent = checkRecent(prevRecent, loc.id);
    dispatch(setRecent(recent));
    //this updates recent in db
    userRecent.set(recent);
  }
  return (dispatch) => {
      if(!location) {
        geoAction.getCurrent((loc)=>{
          getLocationHelper(loc, "My Current Location", dispatch);
        });
      } else {
        if(pinTitle === '') {
          pinTitle = 'New Totem';
        }
        getLocationHelper(location, pinTitle, dispatch );
      }
    };
}
