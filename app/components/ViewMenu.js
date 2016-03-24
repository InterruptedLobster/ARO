import React, { View } from 'react-native';
import { Actions as routerActions } from 'react-native-router-flux';
import Button from 'react-native-button';

export default () => (
  <View>
    <Button onPress={routerActions.ar}>AR</Button>
    <Button onPress={routerActions.map}>Map</Button>
    <Button onPress={routerActions.list}>List</Button>
  </View>
);
