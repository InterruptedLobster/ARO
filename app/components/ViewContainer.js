import React, { Component, View } from 'react-native';
import AR from './AR';
import Map from './Map';
import DropNewPinButton from '../containers/container_dropNewPin';
import PinList from './PinList';
import Button from 'react-native-button';
import { myCurrLoc } from '../lib/db/db';

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
          initialLoc={this.state.initialLoc}
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
      { this.state.view != 'list' ? <Button
          onPress={this.toggleView.bind(this, 'list')}
        >
          List
        </Button> : void 0 }
      { this.state.view != 'ar' ? <Button
          onPress={this.toggleView.bind(this, 'ar')}
        >
          AR
        </Button> : void 0 }
      { this.state.view != 'map' ? <Button
          onPress={this.toggleView.bind(this, 'map')}
        >
          Map
        </Button> : void 0 }
        <DropNewPinButton/>
      </View>
    );
  }
}
