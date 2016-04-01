import React, {
  Component,
  View,
  Text,
  ListView,
  StyleSheet
} from 'react-native';

import PinListItem from './PinListItem.js';
import * as geoAction from '../lib/orientation/utils';

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
    var self = this;
    geoAction.getCurrent((loc) => {
      self.setState({
        currLoc: loc
      });
    });

    this.watchID = geoAction.setWatch((loc)=> {
      self.setState({
        currLoc: loc
      });
      self.redraw();
    });

    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this.props.pins)
    });
  }

  componentWillUnmount() {
    geoAction.clearWatch(this.watchID);
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
    const { updatePins, updateRecent, deletePin, setTarget, targetPin, shareWithFriend, friends, user } = this.props;
    return (
        // pass down pin info to PinListItem
        <PinListItem
          shareWithFriend={shareWithFriend}
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
      <View style={style.container}>
        <View style={style.status}>
          <View style={style.title}>
            <Text style={style.text}>My Pins</Text>
          </View>
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
    flexDirection: 'column',
  },
  status: {
    flex: 1.1,
    alignSelf: 'stretch',
    alignItems: 'center',
    backgroundColor: 'white',
    flexDirection: 'column',
    borderRadius: 5,
    borderBottomWidth: 1,
    borderColor: '#2e8b7d',
  },
  title: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 24,
  },
  text: {
    fontSize: 26,
    alignSelf: 'center',
    color: '#2e8b7d',
    fontWeight: 'bold',
  },
  list: {
    flex: 9,
    backgroundColor: '#CAE3E1'
  }
})

