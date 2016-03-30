import React, {Component, View, ListView} from 'react-native';
import PinListItem from './PinListItem.js';

export default class PinList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      // create the data source
      currLoc: {
        latitude: 37.7835551,
        longitude: -122.4089013,
      },
      dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      })
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(nextProps.pins)
    });
  }

  componentWillMount() {
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
        this.setState({currLoc: coords});
        this.redraw();
      }
    );

    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this.props.pins)
    });
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch( this.watchID );
  }

  redraw() {
    let newPins = {};
    for( var key in this.props.pins ) {
      newPins[key] = Object.assign({}, this.props.pins[key]);
    }
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(newPins)
    });
  }

  renderItem(pin) {
    const { updatePins, updateRecent, deletePin, setTarget, targetPin, friends, user } = this.props;
    return (
        // pass down pin info to PinListItem
        <PinListItem
          updatePins={updatePins}
          updateRecent={updateRecent}
          deletePin={deletePin}
          targetPin={targetPin}
          setTarget={setTarget}
          currLoc={this.state.currLoc}
          redraw={this.redraw.bind(this)}
          pin={pin}
          friends={friends}
          user={user}
        />
      );
  }

  render() {
    return (
      <ListView
        style={{ marginTop: 15 }}
        dataSource={this.state.dataSource}
        renderRow={this.renderItem.bind(this)}
      />
    );
  }
}
