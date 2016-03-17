import React, { Component, PropTypes, View } from 'react-native';
import AR from './AR.js';
import Map from './Map.js';

const testArray = [
  { name: 'AWS', latitude: 37.7832379, longitude: -122.4084653 },    // AWS
  { name: 'Punjab', latitude: 37.7840612, longitude: -122.4093445 } ];  // Punjab

const testLoc = { latitude: 37.7836881, longitude: -122.4088256 }; // Test location

export default class ViewContainer extends Component {
  constructor() {
    super();
    this.state = {
      view: 'map'
    };
  }
  render() {
    return (
      <View>
        <AR currLoc={ testLoc } locs={ testArray }/>
        <Map/>
      </View>
    );
  }
}
