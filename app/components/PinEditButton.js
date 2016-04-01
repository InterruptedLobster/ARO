import React, { Component, AlertIOS , View, StyleSheet} from 'react-native';
import Button from 'react-native-button';
import { Actions } from 'react-native-router-flux';

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
    const { pin, deletePin, friends, hideButton, setTarget, shareWithFriend } = this.props;
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
    color: '#2e8b7d',
  },
})
