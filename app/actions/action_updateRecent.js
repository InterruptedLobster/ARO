import { UPDATE_RECENT } from '../constants/constants.js';
import { userRecent } from '../lib/db/db.js';

function updateRecent(payload) {
  return {
    type: UPDATE_RECENT,
    payload
  };
}

export default function() {
 return (dispatch) => {
  userRecent.once("value", function(snap) {
    dispatch(updateRecent(snap.val()));
  });
 };
}
