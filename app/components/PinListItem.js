import React, {
  Component,
  Text,
  TouchableHighlight,
  View,
  StyleSheet,
  AlertIOS,
  Image
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import Location from '../lib/orientation/locationMath';

/*
FUNCTION: each pin displayed as an entry in the list
METHODS:
  toughOptions-- function that pops open, displaying the different actions a user can do with the pins
    allows deleting, sharing, setting target, editing title
PROPS:
  pin: obj with longidtude, latitude, title, and id
  friends: nested objects; with friend's user id as key storing object with name, id, and picture
  deletePin: function responsible for deleting pin from store and db
    takes in pin (see above for obj structure)
  setTarget: function responsible for setting targetPin, takes in coords obj
  redraw: function responsible that forces pinlist to re-render, solves rendering issue when going between pages
  shareWithFriend: function responsible for sharing current pin with friend, will post to their db
  updatePins: function responsible for updating the state of pins
  updateRecent: function responsible for syncing redux store's recent array with updated db
  currLoc: obj with longitude, latitude that is fetched in PinList and passed down as props
  targetPin: nested object with longitude, latitude, and id
*/
export default class PinListItem extends Component {

  constructor(props) {
    super(props);
  }

  touchOptions() {
    const { pin, friends, deletePin, setTarget, redraw, shareWithFriend } = this.props;
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
          onPress: () => { Actions.friends({ onPress: shareWithFriend.bind( null, pin ), friends: friends }) },
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

  editTitle(value) {
    const { pin, updatePins, updateRecent } = this.props;

    updatePins(pin, value);
    updateRecent();
  }

  render() {
    const { pin, targetPin, currLoc } = this.props;
    let name = 'Your Pin';
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
          <Image
            source={require('../assets/listviewPin.png')}
            style={style.pin}
          />
          <View style={style.left}>
            <Text style={[style.text, pin.friend && style.friendText, isTarget && style.targetText]}>
              {pin.title}
            </Text>
            <Text style={[style.friendName, isTarget && style.targetText]}>
              {name}
            </Text>
          </View>
          <View style={style.right}>
            <Text style={[style.distance,isTarget && style.targetText]}>
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
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 4,
    margin: 4,
    padding: 6,
  },
  left: {
    flex: 5,
    marginLeft: 10,
    alignSelf: 'flex-start',
  },
  right: {
    flex: 2,
    alignSelf: 'center',
    justifyContent: 'flex-end',
  },
  text: {
    alignSelf: 'flex-start',
    fontSize: 22,
  },
  friend: {
    backgroundColor: 'lightblue',
  },
  friendName: {
    justifyContent: 'flex-start',
  },
  target: {
    backgroundColor: 'pink',
    borderWidth: 2,
    borderColor: 'black',
  },
  targetText: {
    color: 'black',
  },
  distance: {
    fontSize: 19,
    fontStyle: 'italic',
  },
  pin: {
    flex: 1,
    alignSelf: 'center',
    height: 50,
  }
});
