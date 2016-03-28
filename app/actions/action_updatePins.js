import { UPDATE_PINS, ALERT_SHARE } from '../constants/constants.js';
import { userData } from '../lib/db/db.js';
const updatePins = (payload) => {
  return {
    type: UPDATE_PINS,
    payload
  };
};
const alertShare = (payload) => {
  return {
    type: ALERT_SHARE,
    payload
  };
};
export default function(pin, newTitle) {
  if(arguments.length === 2) {
    pin.title = newTitle;
    userData.child(pin.id).set(pin);
  }
  return (dispatch) => {
    userData.on("value", function(snap) {
      var pins = snap.val();
      for(var key in pins) {
        if (pins[key].friend) {
          dispatch(alertShare(pins[key]));
          console.log('found pin from friend!', pins[key]);
        }
      }
      dispatch(updatePins(snap.val()));
    });
  };
}
