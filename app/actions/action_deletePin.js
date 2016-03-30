import { UPDATE_RECENT, DELETE_PIN } from '../constants/constants.js';
import { userData, userRecent } from '../lib/db/db.js';

function deletePin(selectedPin) {
  return {
    type: DELETE_PIN,
    payload: selectedPin
  };
}

function updateRecent(payload) {
  return {
    type: UPDATE_RECENT,
    payload
  };
}

function deleteRecentPin(selectedPin, dispatch) {
  let newRecent;
  userRecent.once("value", (snapshot) => {
    let recents = snapshot.val(), index;
    for(var i = 0; i < recents.length; i++) {
      if(recents[i] === selectedPin.id) {
        index = i;
      }
    }
    // delete only if the deleted pin is also in the recent pins
    if (index) {
      recents.splice(index, 1);
      userRecent.set(recents);
    }
    dispatch(updateRecent(recents));
  });
}

//finds the pin in db and calls action to delete from store
export default function (pin) {
    userData.child(pin.id).remove();
  return (dispatch) => {
    dispatch(deletePin(pin));
    deleteRecentPin(pin, dispatch);
  };
}
