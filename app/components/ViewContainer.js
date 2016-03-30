import React, { Component, View, StyleSheet } from 'react-native';
import AR from './AR';
import Map from './Map';
import DropNewPinButton from '../containers/container_dropNewPin';
import PinList from './PinList';
import Button from 'react-native-button';
import { myCurrLoc } from '../lib/db/db';

const styles = StyleSheet.create({
  ViewMenu: {
    position: 'absolute',
    top: 25,
    right: 25,
    flexDirection: 'row',
  },
  ViewButton: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    color: '#fff',
    fontWeight: 'bold',
    backgroundColor: '#2e8b7d',
  },
});

export default class ViewContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      view: 'map'
    };
  }

  componentWillMount() {
    const { updatePins, updateRecent } = this.props;
    updatePins();
    updateRecent();
  }

  toggleView(view) {
    this.setState({ view });
  }

  render() {
    const { pins, recent, friends, user, targetPin, getLocationToSave, updatePins, updateRecent, deletePin, setTarget, clearTarget } = this.props;

    return (

      <View style={{flex: 1}}>
      { this.state.view === 'ar' ? <AR pins={pins} targetPin={targetPin} /> : void 0 }
      { this.state.view === 'map' ? <Map
          getLocationToSave={getLocationToSave}
          // initialLoc={this.state.initialLoc}
          pins = {pins}
          recent = {recent}
          updatePins={updatePins}
          updateRecent={updateRecent}
          deletePin={deletePin}
          friends={friends}
          targetPin={targetPin}
          setTarget={setTarget}
          clearTarget={clearTarget}
        /> : void 0 }
      { this.state.view === 'list' ? <PinList
          deletePin={deletePin}
          updatePins={updatePins}
          updateRecent={updateRecent}
          pins={pins}
          friends={friends}
          user={user}
          targetPin={targetPin}
          setTarget={setTarget}
          /> : void 0 }
        <View style={styles.ViewMenu}>
        { this.state.view != 'ar' ? <Button
            style={styles.ViewButton}
            onPress={this.toggleView.bind(this, 'ar')}
          >
            AR
          </Button> : void 0 }
        { this.state.view != 'map' ? <Button
          style={styles.ViewButton}
          onPress={this.toggleView.bind(this, 'map')}
          >
          Map
          </Button> : void 0 }
        { this.state.view != 'list' ? <Button
          style={styles.ViewButton}
          onPress={this.toggleView.bind(this, 'list')}
          >
          List
          </Button> : void 0 }
        </View>
        <DropNewPinButton/>
      </View>
    );
  }
}
