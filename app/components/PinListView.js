import React, { Component, View } from 'react-native';
import PinList from './PinList';
import ViewMenu from './ViewMenu';

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
      <View style={{flex: 1}}>
        <ViewMenu />
        <PinList
          deletePin={deletePin}
          pins={pins}
        />
      </View>
    );
  }
}
