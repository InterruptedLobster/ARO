import React, { View } from 'react-native';
import { Actions as routerActions } from 'react-native-router-flux';
import Button from 'react-native-button';

const styles = {
  View: {
    position: 'absolute',
    top: 30,
    left: 20,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  Button: {
    padding: 10
  }
};

export default () => (
  <View style={styles.View}>
    <Button style={styles.Button} onPress={routerActions.ar}>AR</Button>
    <Button style={styles.Button} onPress={routerActions.list}>List</Button>
  </View>
);
