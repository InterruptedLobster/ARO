import React, { Component, StyleSheet, View, Dimensions, AlertIOS, Text, Image  } from 'react-native';
import Button from 'react-native-button';
import MapView from 'react-native-maps';
import _ from 'underscore';
import baseImg from '../assets/redPin.png';
import targetImg from '../assets/blackPin.png';
import { PinCallout } from './PinCallout';
import PinEditButton from './PinEditButton';
import { myCurrLoc, currLoc } from '../lib/db/db';


export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      position: null,
      selectedPin: undefined,
      dropPinLocation: undefined,
      loaded: false,
      friendLocs: {},
      stateLocation: {
        longitude: null,
        latitude: null,
        longitudeDelta: 0.005,
        latitudeDelta: 0.005
      }
    };
  }
// Friend
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

  setListener(friend) {
    let self = this;
    currLoc.child(friend.id).on("value", function(snap) {
      self.state.friendLocs[friend.id] = snap.val();
    });
  }

  renderFriends() {
    // renders friends current locations
    const { friends } = this.props;
    let copy = this.state.friendLocs;
    return _.map(copy, (coords, id) => {
        return (
        <MapView.Marker
          coordinate={coords}
          key={id}
          image={{uri: friends[id].picture}}
          style={styles.icon}
        />

        )
      });
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        var coords = {};
        coords.longitude = position.coords.longitude;
        coords.latitude = position.coords.latitude;
        coords.longitudeDelta = 0.005;
        coords.latitudeDelta = 0.005;
        this.setState({
          stateLocation: coords
        });
      },
      (error) => {
        alert(error.message);
      },
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
  }

  setPinTitle(title) {
    const { getLocationToSave, recent } = this.props;
    getLocationToSave(this.state.dropPinLocation, recent, title);
    this.setState({dropPinLocation: undefined});
  }

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

  renderEditButton() {
    const { updatePins, updateRecent, deletePin, setTarget, targetPin } = this.props;
    return (
      <View style={styles.editButton}>
        <PinEditButton
          pin={this.state.selectedPin}
          updatePins={updatePins}
          updateRecent={updateRecent}
          deletePin={deletePin}
          setTarget={setTarget}
          targetPin={targetPin}
          hideButton={() => this.setState({selectedPin: undefined})}
        />
      </View>
    )
  }

  moveMapToUser() {
    const {stateLocation} = this.state;
    this.refs.map.animateToRegion(stateLocation, 2500)
  }

  goToTarget(pinObj){
    const {targetPin, clearTarget} = this.props
    this.refs.map.animateToRegion(targetPin, 250);
  }

  render() {
    const { pins, getLocationToSave, recent, targetPin, friends } = this.props;
    const { stateLocation } = this.state;

    if(targetPin.longitude) {
      this.goToTarget.call(this, targetPin);
    }
    return (
      <View style={styles.container}>
        <MapView
          ref="map"
          showsUserLocation={true}
          //TODO: find a better way to show map initially, added below line so it would stop zooming in from world view
          //TODO: initial region is optional, which one do you guys think is smoother?
          // initialRegion={{ longitudeDelta: 0.005, latitude: currLoc.latitude,longitude: currLoc.longitude, latitudeDelta: 0.005 }}
          region={this.state.position}
          style={styles.map}
          showsCompass={true}
          onLongPress={ (e) => {
              let coords = e.nativeEvent.coordinate
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
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
    height: Dimensions.get('window').height,
  },

  map: {
    height: Dimensions.get('window').height/1.15,
    margin: 10,
    borderWidth: 1,
    borderColor: '#000000',
  },

  editButton: {
    position: 'absolute',
    backgroundColor: 'transparent',
    left: Dimensions.get('window').width/2 - 75,
    bottom: 90,
  },

  centerButton: {
    position: 'absolute',
    backgroundColor: 'transparent',
    left: Dimensions.get('window').width/2 - 100,
    bottom: 40,
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
    borderRadius: 13,
    backgroundColor: 'transparent',
  },
});

