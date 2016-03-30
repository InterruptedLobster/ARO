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

//this is "updatePins" called in components
export default function(pin, newTitle) {
  if(arguments.length === 2) {
    pin.title = newTitle;
    userData.child(pin.id).set(pin);
  }
  return (dispatch) => {

    //this listens and filters for pins that are recently shared by friends
    userData.on("child_added", function(snap) {
      var sharedPin = snap.val();

        //alertedYet is a flag in the shared pin obj that will ensure notification will happen once
        if (sharedPin.alertedYet !== null && sharedPin.alertedYet === false) {
          var message = sharedPin.friend.name + " shared a pin with you!";

          //if user chooses to go to the newly shared pin, this obj will be passed in to set new targetPin
          var targetRecentlyShared = {};
          targetRecentlyShared.id = sharedPin.id;
          targetRecentlyShared.longitude = sharedPin.longitude;
          targetRecentlyShared.latitude = sharedPin.latitude;

          Alert.alert(message, null,
          [
            {text: 'Show me shared pin!', onPress: () => dispatch(setTarget(targetRecentlyShared))},
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ]);

          //once alerted, set alertedYet to true so it doesn't alert again
          userData.child(sharedPin.id).update({alertedYet: true});
        }
    });

    userData.on("value", function(snap) {
      dispatch(updatePins(snap.val()));
    });
  };
}
