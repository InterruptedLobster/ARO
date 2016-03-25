import React, { Component, View } from 'react-native';
import AR from './AR.js';
import Map from './Map.js';
import DropNewPinButton from '../containers/container_dropNewPin';
import PinList from './PinList.js';

export default class ViewContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      view: 'AR',
      currLoc: {
        latitude: 37.7835551,
        longitude: -122.4089013,
      },
    };
  }

  componentWillMount() {
    const { getPins, updateRecent } = this.props;
    getPins();
    updateRecent();
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        var coords = {};
        coords.longitude = position.coords.longitude;
        coords.latitude = position.coords.latitude;
        this.setState({
          currLoc: coords
        });
      },
      (error) => {
        alert(error.message);
      },
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );

    this.watchID = navigator.geolocation.watchPosition(
      (position) => {
        var coords = {};
        coords.longitude = position.coords.longitude;
        coords.latitude = position.coords.latitude;
      }
    );
  }

      // <Map
        //   getLocationToSave={getLocationToSave}
        //   currLoc={this.state.currLoc}
        //   initialLoc={this.state.initialLoc}
        //   pins = {pins}
        //   recent = {recent}
        // />
        // <PinList
        //   deletePin={deletePin}
        //   pins={pins}
        //   />
  render() {
    const { getLocationToSave, pins, deletePin, recent } = this.props;
    return (
      <View style={{flex: 1}}>
        <AR currLoc={ this.state.currLoc } pins={pins} />
        <DropNewPinButton/>
      </View>
    );
  }
}
