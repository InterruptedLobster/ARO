import React, { Component, View, StyleSheet } from 'react-native';
import AR from './AR';
import Map from './Map';
import DropNewPinButton from '../containers/container_dropNewPin';
import PinList from './PinList';
import Button from 'react-native-button';
import { ref, myCurrLoc } from '../lib/db/db';

const styles = StyleSheet.create({
  ViewMenu: {
    position: 'absolute',
    top: 25,
    right: 25,
    flexDirection: 'row',
  },
  ViewButton: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginRight: 1,
    color: '#fff',
    fontWeight: 'bold',
    backgroundColor: '#2e8b7d',
  },
});
/*
FUNCTION: component that holds and renders the different views (AR, map, list)
METHODS:
  toggleView-- function that toggles view between ar, map and list
  sharewithFriend-- function responsible for sharing a pin with friend
    takes in pin obj and friend obj
    pin obj has alertedYet: bool, id, longitude, latitude, title
    friend obj has id, name and picture url
PROPS:
  pins: nested object with keys of pin id and id, longitude, latitude and title
  recent:
  friends: nested objects; with friend's user id as key storing object with name, id, and picture
  user: obj with email, picture, name and id
  targetPin: nested object with longitude, latitude, and id
  getLocationToSave: thunk function that dispatches actions related to saving a pin
    takes in location coords obj if clicked on map, recent array from store, and title which is a string
  updatePins: function responsible for updating the state of pins
  updateRecent: function responsible for syncing redux store's recent array with updated db
  deletePin: function responsible for deleting pin from store and db
  setTarget: function responsible for setting targetPin, takes in coords obj
  clearTarget: function that can clear targetPin
*/
export default class ViewContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      view: 'map'
    };
  }

  componentWillMount() {
    const { updatePins, updateRecent } = this.props;
    updatePins();
    updateRecent();
  }

  toggleView(view) {
    this.setState({ view });
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

  render() {
    const { pins, recent, friends, user, targetPin, getLocationToSave, updatePins, updateRecent, deletePin, setTarget, clearTarget } = this.props;
    return (
      <View style={{flex: 1}}>
      { this.state.view === 'ar' ? <AR pins={pins} targetPin={targetPin} /> : void 0 }
      { this.state.view === 'map' ? <Map
          shareWithFriend={this.shareWithFriend.bind(this)}
          getLocationToSave={getLocationToSave}
          // initialLoc={this.state.initialLoc}
          pins = {pins}
          recent = {recent}
          updatePins={updatePins}
          updateRecent={updateRecent}
          deletePin={deletePin}
          friends={friends}
          targetPin={targetPin}
          setTarget={setTarget}
          clearTarget={clearTarget}
        /> : void 0 }
      { this.state.view === 'list' ? <PinList
          shareWithFriend={this.shareWithFriend.bind(this)}
          deletePin={deletePin}
          updatePins={updatePins}
          updateRecent={updateRecent}
          pins={pins}
          friends={friends}
          user={user}
          targetPin={targetPin}
          setTarget={setTarget}
          /> : void 0 }
        <View style={styles.ViewMenu}>
        { this.state.view != 'ar' ? <Button
            style={styles.ViewButton}
            onPress={this.toggleView.bind(this, 'ar')}
          >
            AR
          </Button> : void 0 }
        { this.state.view != 'map' ? <Button
          style={styles.ViewButton}
          onPress={this.toggleView.bind(this, 'map')}
          >
          Map
          </Button> : void 0 }
        { this.state.view != 'list' ? <Button
          style={styles.ViewButton}
          onPress={this.toggleView.bind(this, 'list')}
          >
          List
          </Button> : void 0 }
        </View>
        <DropNewPinButton/>
      </View>
    );
  }
}
