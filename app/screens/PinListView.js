import React, { Component, View } from 'react-native';
import PinList from '../components/PinList';
import { Actions as routerActions } from 'react-native-router-flux';
import Button from 'react-native-button';

export default class extends Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { getPins, updateRecent } = this.props;
    getPins();
    updateRecent();
  }

  render() {
    const { pins, deletePin } = this.props;
    return (
      <View style={{flex: 1, paddingTop: 20}}>
        <Button onPress={routerActions.pop}>Back</Button>
        <PinList
          deletePin={deletePin}
          pins={pins}
        />
      </View>
    );
  }
}
