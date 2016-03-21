import { UPDATE_PINS } from '../constants/constants.js';
import { userData } from '../lib/db/db.js';
function updatePins(allPins) {
  return {
    type: UPDATE_PINS,
    payload: allPins
  };
}

export default function() {
 return (dispatch) => {
  userData.once("value", function(snap) {
    var fetchedPins = {};
    snap.forEach(function(savedPin) {
      var key = savedPin.key();
      fetchedPins[key]=savedPin.val();
    });
    dispatch(updatePins(fetchedPins));
  });
 };
}
