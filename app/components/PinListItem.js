import React, {Component, Text, TouchableHighlight, View, StyleSheet, AlertIOS} from 'react-native';
import { Actions } from 'react-native-router-flux';
import FriendList from './FriendList';
import { ref } from '../lib/db/db';
import Location from '../lib/orientation/locationMath';

export default class PinListItem extends Component {

  constructor(props) {
    super(props);
  }

  touchOptions() {
    const { pin, friends, deletePin, setTarget, redraw } = this.props;
    AlertIOS.prompt(
        pin.title,
        '('+pin.longitude + ', ' + pin.latitude + ')',
        [{
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Edit Title',
          onPress: this.editTitle.bind(this)
        },
        {
          text: 'Share',
          onPress: () => { Actions.friends({ onPress: this.shareWithFriend.bind( this, pin ), friends: friends }) },
        },
        {
          text: 'Set Target',
          onPress: () => {
            setTarget(pin);
            redraw();
          },
        },
        {
          text: 'Delete',
          onPress: () => {
            deletePin(pin);
          }
        }],
        'plain-text'
      );
  }

  shareWithFriend( pin, friend ) {
    const { user } = this.props;
    if( typeof user.id !== 'string' ) {
      console.log( 'shareWithFriend: user id must be a string' );
      return null;
    }
    if( typeof friend.id !== 'string' ) {
      console.log( 'shareWithFriend: friend id must be a string' );
      return null;
    }
    if( typeof pin !== 'object' ) {
      console.log( 'shareWithFriend: pin must be an object' );
      return null;
    }
    if( typeof pin.id !== 'string' ) {
      console.log( 'shareWithFriend: pin id must be a string' );
      return null;
    }
    // Make a copy of the pin

    var pinCopy = Object.assign({}, {alertedYet: false} ,pin);
    // Set pin.friend to the userID of the person sending the pin
    pinCopy.friend = user;
    // Post the pin to the friend's firebase.
    var friendPin = ref.child( friend.id ).child( 'pins' ).child( pin.id );
    friendPin.set( pinCopy );
    return true;
  }

  editTitle(value) {
    const { pin, updatePins, updateRecent } = this.props;

    updatePins(pin, value);
    updateRecent();
  }

  render() {
    const { pin, targetPin, currLoc } = this.props;
    let name = '';
    let isTarget = pin.id === targetPin.id;
    let relative = Location.relativeLocsInFeet( currLoc, pin );
    let distance = Math.sqrt( Math.pow( relative.x, 2 ) + Math.pow( relative.z, 2 ) ).toFixed(0);
    if ( distance > 5280 ) {
      distance /= 5280;
      distance = Math.floor( distance );
      distance += ' mi.'
    } else {
      distance += ' ft.';
    }
    if( pin.friend ) {
     name = pin.friend.name;
    }
    return (
      <TouchableHighlight
        onPress={() => {
          this.touchOptions()
        }}
      >
        <View style={[style.container, pin.friend && style.friend, isTarget && style.target]}>
          <Text style={[style.text, pin.friend && style.friendText, isTarget && style.targetText]}>
            {pin.title}
          </Text>
          <View style={style.undertext}>
            <Text style={[style.friendName, isTarget && style.targetText]}>
              {name}
            </Text>
            <Text style={[isTarget && style.targetText]}>
              {distance}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}


const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 4,
    margin: 4,
    padding: 6
  },
  text: {
    alignSelf: 'center',
    fontSize: 24,
  },
  friend: {
    backgroundColor: 'lightblue',
  },
  friendName: {
    marginRight: 10,
  },
  target: {
    backgroundColor: 'black',
  },
  targetText: {
    color: 'white',
  },
  undertext: {
    flexDirection: 'row',
    alignSelf: 'center',
  }
});
