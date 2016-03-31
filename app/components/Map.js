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
import { myCurrLoc, currLoc } from '../lib/db/db';


export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPin: undefined,
      dropPinLocation: undefined,
      loaded: false,
      friendLocs: {},
      stateLocation: {
        longitude: 38.783913,
        latitude: -121.409031,
        longitudeDelta: 0.005,
        latitudeDelta: 0.005
      }
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

  componentDidMount() {
    this.getCurrentLocation((coords) => {
      this.setState({
        stateLocation: coords
      });
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
      self.state.friendLocs[friend.id] = snap.val();
    });
  }

  getCurrentLocation(callback) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        var coords = {};
        coords.longitude = position.coords.longitude;
        coords.latitude = position.coords.latitude;
        coords.longitudeDelta = 0.005;
        coords.latitudeDelta = 0.005;
        callback(coords);
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

  moveMapToUser() {
    this.getCurrentLocation( (coords) => {
      this.refs.map.animateToRegion(coords, 100);
    });
  }

  goToTarget(pinObj){
    const {targetPin, clearTarget} = this.props;
    this.refs.map.animateToRegion(targetPin, 100);
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
          region = {targetPin.longitude ? targetPin: stateLocation }
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
