import React, { Component, View } from 'react-native';
import AR from '../components/AR';
import ViewMenu from '../components/ViewMenu';
import DropNewPinButton from '../containers/container_dropNewPin';

export default class extends Component {

  constructor(props) {
    super(props);
    this.state = {
      view: 'map',
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

  render() {
    const { getLocationToSave, pins, deletePin, recent } = this.props;
    return (
      <View style={{flex: 1}}>
        <AR currLoc={ this.state.currLoc } pins={pins} />
        <ViewMenu />
        <DropNewPinButton/>
      </View>
    );
  }
}
