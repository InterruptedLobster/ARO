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
