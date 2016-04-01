import React, {
  Component,
  View,
  ListView,
  StyleSheet,
  Text
} from 'react-native';

import Button from 'react-native-button';
import { Actions } from 'react-native-router-flux';
import FriendListItem from './FriendListItem';

export default class FriendList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      // create the data source
      dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      })
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(nextProps.friends)
    });
  }

  componentWillMount() {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this.props.friends)
    });
  }

  renderItem(friend) {
    const { onPress } = this.props;
    return (
      // pass down pin info to FriendListItem
      <FriendListItem
        onPress={onPress}
        friend={friend}
      />
    );
  }

  render() {
    return (
      <View style={style.container}>
        <View style={style.status}>
          <Button
            style={style.button}
            onPress={ () => { Actions.pop() }}
            >Back
          </Button>
          <View style={style.title}>
            <Text style={style.text}>Friends</Text>
          </View>
          <View style={{flex:1}}></View>
        </View>
        <ListView
          style={style.list}
          dataSource={this.state.dataSource}
          renderRow={this.renderItem.bind(this)}
        />
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    flex: 9,
    backgroundColor: '#74B7AD',
  },
  status: {
    flex: 1.1,
    alignSelf: 'stretch',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 5,
  },
  title: {
    flex: 4,
    alignItems: 'center',
    marginTop: 20,
  },
  text: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2e8b7d',
  },
  button: {
    flex: 1,
    marginTop: 28,
    marginLeft: 15,
    alignItems: 'center',
  }
})
