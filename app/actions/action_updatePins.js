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
    dispatch(updatePins(snap.val()));
  });
 };
}
