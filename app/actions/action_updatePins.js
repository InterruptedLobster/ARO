import { UPDATE_PINS, SET_TARGET } from '../constants/constants.js';
import { userData } from '../lib/db/db.js';
import { Alert } from 'react-native';

function updatePins (payload) {
  return {
    type: UPDATE_PINS,
    payload
  };
}

function setTarget(payload) {
  return {
    type: SET_TARGET,
    payload
  };
}
export default function(pin, newTitle) {
  if(arguments.length === 2) {
    pin.title = newTitle;
    userData.child(pin.id).set(pin);
  }
  return (dispatch) => {
    //this listens to new things added
    userData.on("child_added", function(snap) {
      var sharedPin = snap.val();
        if (sharedPin.alertedYet !== null && sharedPin.alertedYet === false) {
          var message = sharedPin.friend.name + " shared a pin with you!";
          //if user choose to show shared pin
          var targetRecentlyShared = {};
          targetRecentlyShared.id = sharedPin.id;
          targetRecentlyShared.longitude = sharedPin.longitude;
          targetRecentlyShared.latitude = sharedPin.latitude;
          console.log(targetRecentlyShared, 'this is target recently shared');
          Alert.alert(message, null,
          [
            {text: 'Show me shared pin!', onPress: () => dispatch(setTarget(targetRecentlyShared))},
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ]);
          //once alerted, yet alertedYet to true so it doesn't alert again
          userData.child(sharedPin.id).update({alertedYet: true});
        }
    });
    userData.on("value", function(snap) {
      dispatch(updatePins(snap.val()));
    });
  };
}
