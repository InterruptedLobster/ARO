import React, { Component, PropTypes, View } from 'react-native';
import AR from './AR.js';
import Map from './Map.js';

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
        <AR/>
        <Map/>
      </View>
    );
  }
}
