import React, {Component, Image, Text, TouchableHighlight, View, StyleSheet} from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class FriendListItem extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { friend } = this.props;
    // const pic = friend.picture; TODO: Add picture and email

    return (
      <TouchableHighlight
        onPress={() => {
          this.props.onPress( friend );
          // TODO: And then make the friend list go away.
          Actions.pop();
        }}
      >
        <View style={style.container}>
          <Text style={style.text}>
            {friend.name}
          </Text>
        </View>
      </TouchableHighlight>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 4,
    margin: 4,
    padding: 6,
  },
  text: {
    alignSelf: 'center',
    fontSize: 24,
  },
  icon: {
    alignSelf: 'flex-start',
    margin: 4,
    borderWidth: 1,
    borderColor: '#000000',
  }
});
