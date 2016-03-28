import { UPDATE_PINS } from '../constants/constants.js';
import { userData } from '../lib/db/db.js';
import { Alert } from 'react-native';
const updatePins = (payload) => {
  return {
    type: UPDATE_PINS,
    payload
  };
};

export default function(pin, newTitle) {
  if(arguments.length === 2) {
    pin.title = newTitle;
    userData.child(pin.id).set(pin);
  }
  return (dispatch) => {
    //this listens to new things added
    userData.on("child_added", function(snap) {
      var pin = snap.val();
        if (pin.alertedYet !== null && pin.alertedYet === false) {
          var message = pin.friend.name + " shared a pin with you!";
          Alert.alert(message, null,
          [
            {text: 'Show me pin!', onPress: () => console.log('Ask me later pressed')},
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ]);
          //once alerted, yet alertedYet to true so it doesn't alert again
          userData.child(pin.id).update({alertedYet: true});
        }
    });
    userData.on("value", function(snap) {
      dispatch(updatePins(snap.val()));
    });
  };
}
