import React, { Component, AlertIOS , View, StyleSheet} from 'react-native';
import Button from 'react-native-button';
import { Actions } from 'react-native-router-flux';

/*
FUNCTION: button that will pop up when user clicks pin on map
  provides option to the user to manipulate pin (delete, set as target ...etc)
METHODS:
  editTitle(value)
    expects a string, which the user passes in when editing a pin title
    calls actions which updates pins with new title
PROPS:
  pin-- object with longitude, latitude, title
  updatePins-- function responsible for syncing redux store's pins with updated db
  updateRecent-- function responsible for syncing redux store's recent array with updated db
  deletePin-- function that deletes pin in db and redux store
  friends--  nested objects; with friend's user id as key storing object with name, id, and picture
  setTarget--  function responsible for setting current pin as the targetPin in redux store
  shareWithFriend-- function responsible for sharing current pin with friend, will post to their db
*/

export default class PinEditButton extends Component{
  constructor(props) {
    super(props);
  }

  editTitle(value) {
    const { pin, updatePins, updateRecent } = this.props;

    updatePins(pin, value);
    updateRecent();
  }

  render() {
    const { pin, deletePin, friends, setTarget, shareWithFriend } = this.props;
    return(
      <Button
        style={[styles.bubble, styles.button]}

        onPress={ () => {
          hideButton();
          AlertIOS.prompt(
            pin.title,
            'Editing Pin',
            [{
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'Edit Title',
              onPress: this.editTitle.bind(this)
            },
            {
              text: 'Share',
              onPress: () => { Actions.friends({ onPress: shareWithFriend.bind( null, pin ), friends: friends }) },
            },
            {
              text: 'Set Target',
              onPress: () => {
                setTarget(pin)
              },
            },
            {
              text: 'Delete',
              onPress: () => {
                deletePin(pin);
              }
            }],
            'plain-text'
          )}}>
        Edit Pin</Button>
    )
  }
}

const styles = StyleSheet.create({
  bubble: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
  },

  button: {
    width: 150,
    alignItems: 'center',
  },
})
