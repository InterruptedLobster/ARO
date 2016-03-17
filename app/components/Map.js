
import React, { Component, PropTypes, StyleSheet, Text, View, Dimensions, AlertIOS  } from 'react-native';

import MapView from 'react-native-maps';


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
      lastPosition: undefined,
      pins: [],
      walker: undefined
    };
  }


  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        var initialPosition = JSON.stringify(position);
        this.setState({walker: initialPosition});
      },
      (error) => {
        alert(error.message)
      },
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );

    this.watchID = navigator.geolocation.watchPosition(
      (position) => {
        var lastPosition = JSON.stringify(position);
        this.setState({lastPosition: position});
      }
    );

  }

  onRegionChange(region) {
    this.setState({ position: region });
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          showsUserLocation={true}
          followUserLocation={true}
          region={this.state.position}
          onRegionChange={this.onRegionChange.bind(this)}
          style={styles.map}
          showsCompass={true}
          onLongPress={
            () =>
            AlertIOS.alert(
                'Drop a Pin?',
                null,
                [{
                  text: 'Cancel',
                  style: 'cancel'
                },
                {
                  text: 'OK'
                }]
              )
          }
        />



      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
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
