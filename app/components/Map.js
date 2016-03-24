import React, { Component, StyleSheet, View, Dimensions, AlertIOS, Text  } from 'react-native';
import Button from 'react-native-button';
import MapView from 'react-native-maps';
import _ from 'underscore';
import image from '../assets/redPin.png';
import { PinCallout } from './PinCallout.js';

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      position: null,
    };
  }

  onRegionChange(region) {
    this.setState({ position: region });
  }

  renderMarkers() {
    const { pins } = this.props;
    return _.map(pins, (pinObject, key) => {
      return (
        <MapView.Marker
          image={image}
          key={key}
          coordinate={{latitude: pinObject.latitude, longitude: pinObject.longitude}}
        >
          <MapView.Callout tooltip>
            <PinCallout>
              <Text style={{ color: 'black', alignSelf:'center', fontSize:16 }}>pinId: {key}</Text>
            </PinCallout>
          </MapView.Callout>

        </MapView.Marker>
      );
    });
  }
//TODO: move map to user in a smoother way
//it is very sudden and disrupted right now
  moveMapToUser(location) {
    const {currLoc} = this.props;
    this.setState({position: {
      longitude: currLoc.longitude,
      latitude: currLoc.latitude,
      longitudeDelta: 0.005,
      latitudeDelta: 0.005
    }});
  }

  render() {
    const { pins, getLocationToSave, currLoc, recent } = this.props;
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          showsUserLocation={true}
          //TODO: find a better way to show map initially, added below line so it would stop zooming in from world view
          initialRegion={{longitudeDelta: 0.005000044296161832, latitude: currLoc.latitude,longitude: currLoc.longitude, latitudeDelta: 0.00536722351829988  }}
          region={this.state.position}
          onRegionChange={this.onRegionChange.bind(this)}
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
                      getLocationToSave(coords, recent)
                    }
                  }]
                )
            }
          }
        >

        {Object.keys(pins).length !== 0 ? this.renderMarkers.call(this) : void 0 }
        </MapView>
        <Button style={styles.center}
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
  },
  map: {
    height: Dimensions.get('window').height,
  },
  center: {
    position: 'absolute',
    bottom: 20,
    right: 10,
    padding: 5
  }
});
