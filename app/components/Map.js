import React, { Component, StyleSheet, View, Dimensions, AlertIOS, Text  } from 'react-native';
import Button from 'react-native-button';
import MapView from 'react-native-maps';
import _ from 'underscore';
import image from '../assets/redPin.png';
import { PinCallout } from './PinCallout';
import PinEditButton from './PinEditButton';

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      position: null,
      selectedPin: undefined,
      dropPinLocation: undefined,
    };
  }

  onRegionChange(region) {
    this.setState({ position: region });
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
    const { pins } = this.props;
    return _.map(pins, (pinObject, key) => {
      // console.log(pinObject,'this is pinObject')
      return (
        // console.log(pinObject,'this is pinObject')
        <MapView.Marker
          image={image}
          key={key}
          coordinate={{latitude: pinObject.latitude, longitude: pinObject.longitude}}
          onSelect={() => this.setState({ selectedPin: pinObject })}
          onDeselect={() => this.setState({ selectedPin: undefined })}
        >
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
    const { updatePins, updateRecent, deletePin } = this.props;
    return (
      <View style={styles.buttonContainer}>
        <PinEditButton 
          pin={this.state.selectedPin}
          updatePins={updatePins}
          updateRecent={updateRecent}
          deletePin={deletePin}
          hideButton={() => this.setState({selectedPin: undefined})}
        />
      </View>
    )
  }

  moveMapToUser(location) {
    const {currLoc} = this.props;
    let currRegion = {
      latitude: currLoc.latitude,
      longitude: currLoc.longitude,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005
    };
    this.refs.map.animateToRegion(currRegion, 250)
  }



  render() {
    const { pins, getLocationToSave, currLoc, recent } = this.props;
    return (
      <View style={styles.container}>
        <MapView
          ref="map"
          showsUserLocation={true}
          //TODO: find a better way to show map initially, added below line so it would stop zooming in from world view
          initialRegion={{ longitudeDelta: 0.005, latitude: currLoc.latitude,longitude: currLoc.longitude, latitudeDelta: 0.005 }}
          region={this.state.position}
          onRegionChange={this.onRegionChange.bind(this)}
          style={styles.map}
          showsCompass={true}
          onLongPress={ (e) => {
              let coords = e.nativeEvent.coordinate
              this.dropPin(coords);
            }
          }
        >
        { Object.keys(pins).length !== 0 ? this.renderMarkers.call(this) : void 0 }
        </MapView>
        { this.state.selectedPin ? this.renderEditButton.call(this) : void 0 }
        <Button
          onPress={this.moveMapToUser.bind(this, this.props.fullLoc)}>
          CENTER ON ME
        </Button>
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
    height: Dimensions.get('window').height/1.25,
    margin: 10,
    borderWidth: 1,
    borderColor: '#000000',
  },

  buttonContainer: {
    left: Dimensions.get('window').width/2 - 50,
    bottom: 100,
    backgroundColor: 'transparent',
    position: 'absolute',
  },
});

