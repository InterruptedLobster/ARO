
import React, { Component, StyleSheet, View, Dimensions, AlertIOS, Text  } from 'react-native';

import MapView from 'react-native-maps';
import _ from 'underscore';
import image from '../assets/redPin.png';
import {PinCallout} from './PinCallout.js';

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      position: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
    };
    this.testRef = new Firebase("https://interruptedlobster.firebaseio.com/pins");
  }

  onRegionChange(region) {
    this.setState({ position: region });
  }
  renderMarkers() {
    const { pins } = this.props;
    return _.map(pins.pins, (pinObject) => {

      return (
        <MapView.Marker
          image={image}
          key={pinObject.id}
          coordinate={{latitude: pinObject.latitude, longitude: pinObject.longitude}}>
          <MapView.Callout tooltip>
            <PinCallout>
              <Text style={{ color: 'black', alignSelf:'center', fontSize:16 }}>{pinObject.title}</Text>
            </PinCallout>
          </MapView.Callout>

        </MapView.Marker>
      );
    });
  }

  render() {
    const { pins, dropPin, currLoc } = this.props;
    return (
      <View style={styles.container}>
        <MapView
          showsUserLocation={true}
          region={{
            latitude: currLoc.latitude,
            longitude: currLoc.longitude,
            latitudeDelta: 0.00922,
            longitudeDelta: 0.00421
          }}
          style={styles.map}
          showsCompass={true}
          onLongPress={
            (e) => {
              let coords = e.nativeEvent.coordinate

              AlertIOS.alert(
                  'Drop a Pin?',
                  null,
                  [{
                    text: 'Cancel',
                    style: 'cancel'
                  },
                  {
                    text: 'OK',
                    onPress: () => {
                      dropPin(coords)
                      this.testRef.push(coords)
                    }
                  }]
                )
            }
          }
        >
        {Object.keys(pins.pins).length !== 0 ? this.renderMarkers.call(this) : void 0 }
        </MapView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    color: 'white',
    textAlign: 'center',
    marginBottom: 5,
  },
  map: {
    height: Dimensions.get('window').height/2,
    margin: 10,
    borderWidth: 1,
    borderColor: '#000000',
  },
});
