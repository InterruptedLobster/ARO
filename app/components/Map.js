import React, {
  Component,
  StyleSheet,
  View,
  Dimensions,
  AlertIOS,
  Text,
  Image
} from 'react-native';

import Button from 'react-native-button';
import MapView from 'react-native-maps';
import _ from 'underscore';
import baseImg from '../assets/redPin.png';
import targetImg from '../assets/blackPin.png';
import { PinCallout } from './PinCallout';
import PinEditButton from './PinEditButton';
import * as geoAction from '../lib/orientation/utils';
import { myCurrLoc, currLoc } from '../lib/db/db';

/*
FUNCTION: renders the map and contains all the methods that pertains to maps
  renders markers, invokes callouts, shows target pin
METHODS:
  setListener-- function that sets a listener on each friend in db and keeps track of where they are
  setPinTitle--function responsible for setting pin title and saving that pin when clicking on map
   takes in string that user inputs
  dropPin-- function that prompts user to 'setPinTitle' and drops pin when clicking on map
    takes in an coords object with longitude and latitude
  moveMapToUser-- function responsible for moving map to user's current location
  goToTarget-- function responsible centering map on targetPin
    takes in coords obj with longitude and latitude
  renderMarkers-- function reponsible for populating map with pins in redux state as markers on a map
  renderFriends--  function repsonsible for rendering friend's current locations, uses images as markers
  renderEditButton-- function that renders edit button when user selects pin

PROPS:
  friends: nested objects; with friend's user id as key storing object with name, id, and picture
  targetPin: nested object with longitude, latitude, and id
  getLocationToSave: thunk function that dispatches actions related to saving a pin
    takes in location coords obj if clicked on map, recent array from store, and title which is a string
  recent: array of pins ids, static length of 10
  updateRecent: function responsible for syncing redux store's recent array with updated db
  deletePin: function responsible for deleting pin from store and db
    takes in pin obj w id, longitude, latitude and title
  setTarget: function responsible for setting targetPin, takes in coords obj
  shareWithFriend: function responsible for sharing current pin with friend, will post to their db
*/

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPin: undefined,
      dropPinLocation: undefined,
      loaded: false,
      friendLocs: {},
    };
  }

  componentWillMount() {
    const { friends } = this.props;
    let self = this;
    let counter = 0;

    for(var friendId in friends) {
      self.setListener(friends[friendId]);
      counter++;
      if(counter === Object.keys(friends).length) {
        this.setState({loaded: true});
      }
    }
  }

  //gets location of user upon map view render
  componentDidMount() {
    geoAction.getCurrent((loc)=>{
      this.refs.map.animateToRegion(loc, 100);
    });
  }

  componentWillUpdate(nextProps) {
    const {targetPin} = nextProps;
    if(this.props.targetPin.id !== targetPin.id) {
      if(targetPin.longitude) {
        this.goToTarget.call(this, targetPin);
      }
    }
  }

  setListener(friend) {
    let self = this;
    // sets a firebase listener on each friend
    currLoc.child(friend.id).on("value", function(snap) {
      // updates friend's location in state as they move
      let friendObj ={};
      friendObj[friend.id] = snap.val();
      friendObj = Object.assign({}, self.state.friendLocs, friendObj);
      self.setState({
        friendLocs: friendObj
      });
    });
  }



  //saves title and pin when saving pin by clicking point on map
  setPinTitle(title) {
    const { getLocationToSave, recent } = this.props;

    getLocationToSave(this.state.dropPinLocation, recent, title);
    this.setState({dropPinLocation: undefined});
  }
  //will prompt user to title pin if user saves pin by clicking point on map
  dropPin(coordinate) {
    this.setState({dropPinLocation: coordinate});
    AlertIOS.prompt(
        'Drop a Pin?',
        'Enter title:',
        [{
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'OK',
          onPress: this.setPinTitle.bind(this)
        }],
        'plain-text'
      );
  }

  //centers map onto user location whenever "center on me" is pressed
  moveMapToUser() {
    var self = this;
    geoAction.getCurrent((loc) =>{
      self.refs.map.animateToRegion(loc, 100);
    });
  }

  goToTarget(targetPin){
    let goTo= Object.assign({}, targetPin, {
      latitudeDelta: 0.005,
      longitudeDelta: 0.005
    });
    this.ref.map.animateToRegion(goTo, 100);
  }

  //renders markers for each pin saved
  renderMarkers() {
    const { pins, targetPin } = this.props;

    return _.map(pins, (pinObject, key) => {
      let image = baseImg;
      if ( key === targetPin.id ) {
        image = targetImg;
      }
      return (
        <MapView.Marker
          key={key}
          coordinate={{latitude: pinObject.latitude, longitude: pinObject.longitude}}
          onSelect={() => this.setState({ selectedPin: pinObject })}
          onDeselect={() => this.setState({ selectedPin: undefined })}
        >
          <Image source={image} />
          <MapView.Callout tooltip>
            <PinCallout>
              <Text style={{ color: 'black', alignSelf:'center', fontSize:16 }}>{pinObject.title}</Text>
            </PinCallout>
          </MapView.Callout>
        </MapView.Marker>
      );
    });
  }

  renderFriends() {
    const { friends } = this.props;
    let copy = this.state.friendLocs;

    // renders friends current locations
    return _.map(copy, (coords, id) => {
        return (
          <MapView.Marker
            coordinate={coords}
            key={id}
            title={friends[id].name}
          >
            <Image
              source={{uri: friends[id].picture}}
              style={styles.icon}
            />
          </MapView.Marker>
        );
    }) ;
  }

  renderEditButton() {
    const { friends, updatePins, updateRecent, deletePin, setTarget, targetPin, shareWithFriend } = this.props;

    return (
      <View style={styles.editButton}>
        <PinEditButton
          pin={this.state.selectedPin}
          friends={friends}
          shareWithFriend={shareWithFriend}
          updatePins={updatePins}
          updateRecent={updateRecent}
          deletePin={deletePin}
          setTarget={setTarget}
          targetPin={targetPin}
          hideButton={() => this.setState({selectedPin: undefined})}
        />
      </View>
    );
  }

  render() {
    const { pins, getLocationToSave, recent, targetPin, friends } = this.props;
    const { stateLocation } = this.state;
    return (
      <View style={styles.container}>
        <MapView
          ref="map"
          showsUserLocation={true}
          initialRegion={stateLocation}
          style={styles.map}
          showsCompass={true}
          onLongPress={ (e) => {
              let coords = e.nativeEvent.coordinate;
              this.dropPin(coords);
            }
          }
        >

        { Object.keys(pins).length !== 0 ? this.renderMarkers.call(this) : void 0 }

        { this.state.loaded === true ? this.renderFriends.call(this) : void 0 }

        </MapView>

        { this.state.selectedPin ? this.renderEditButton.call(this) : void 0 }


        <View style={styles.centerButton}>
          <Button
            style={[styles.bubble, styles.button]}
            onPress={this.moveMapToUser.bind(this)}>
            Center on me!
          </Button>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  map: {
    flex: 1,
  },

  editButton: {
    position: 'absolute',
    backgroundColor: 'transparent',
    left: Dimensions.get('window').width/2 - 75,
    bottom: 100,
  },

  centerButton: {
    position: 'absolute',
    backgroundColor: 'transparent',
    left: Dimensions.get('window').width/2 - 100,
    bottom: 50,
    borderRadius: 10,
  },

  bubble: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
  },

  button: {
    width: 200,
    alignItems: 'center',
  },

  icon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'transparent',
  },
});
