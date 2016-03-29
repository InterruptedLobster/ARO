import React, {
  StyleSheet,
  View,
  Text
} from 'react-native';

export const PinCallout = React.createClass({
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.bubble}>
          <View style={styles.amount}>
            {this.props.children}
          </View>
        </View>
      </View>
    );
  },
});

var styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
  },
  bubble: {
    width: 140,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    backgroundColor: 'white',
    opacity: 0.8,
    paddingHorizontal: 8,
    paddingVertical: 1,
    borderRadius: 4,
    borderColor: 'black',
    borderWidth: 0.3,
  },
  amount: {
    flex: 0.5,
  },
});
