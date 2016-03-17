import React, { Component, PropTypes, View } from 'react-native';
import AR from './AR.js';
import Map from './Map.js';
import DropNewPinButton from '../containers/container_dropNewPin'

export default class ViewContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'map'
    };
  }

  render() {
    return (
      <View>
        <AR/>
        <Map/>
        <DropNewPinButton/>
      </View>
    );
  }
}
