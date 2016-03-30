//this should add ownprops from parent map
import React, { Component, StyleSheet, Dimensions } from 'react-native';
import getLocationToSave from '../actions/action_dropNewPin.js';

import Button from 'react-native-button';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { userData } from '../lib/db/db.js';

const styles = StyleSheet.create({
  DropNewPinButton: {
    position: 'absolute',
    left: Dimensions.get('window').width / 2 - 90,
    bottom: 0,
    width: 180,
    color: '#fff',
    textAlign: 'center',
    padding: 10,
    backgroundColor: '#2e8b7d',
  }
});

class DropNewPinButton extends Component {
  constructor(props) {
    super(props);
    this.state= {
     long: null,
     lat: null,
     title: ''
    };
  }

  handleClick() {
    const { getLocationToSave, recent } = this.props;
    getLocationToSave(null, recent);

  }

  render() {
    return (
      <Button
        style={styles.DropNewPinButton}
        onPress={this.handleClick.bind(this)}>
        Drop New Pin
      </Button>
    );
  }
}

//smart container for the button component
function mapStateToProps(state) {
  return {
    pins: state.pins,
    recent: state.recent
  };
}

export default connect(mapStateToProps, { getLocationToSave })(DropNewPinButton);
