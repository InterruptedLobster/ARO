import React, {Component, View, ListView} from 'react-native';
import PinListItem from './PinListItem.js';
import * as geoAction from '../lib/utils';

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
    const { updatePins, updateRecent, deletePin, setTarget, targetPin, friends, user } = this.props;
    return (
        // pass down pin info to PinListItem
        <PinListItem
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
      <ListView
        style={{ marginTop: 15 }}
        dataSource={this.state.dataSource}
        renderRow={this.renderItem.bind(this)}
      />
    );
  }
}
