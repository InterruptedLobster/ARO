//this should add ownprops from parent map
import React, { Component } from 'react-native';
import getLocationToSave from '../actions/action_dropNewPin.js';

import Button from 'react-native-button';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { userData } from '../lib/db/db.js';

class DropNewPinButton extends Component {

  handleClick() {
    const { getLocationToSave, recent } = this.props;
    getLocationToSave(null, recent);

  }

  render() {
    return (
      <Button
        style={{borderWidth: 1, borderColor: 'blue'}}
        onPress={this.handleClick.bind(this)}>
        Drop New Pin!
      </Button>
    );
  }
}

function mapStateToProps(state) {
  return {
    pins: state.pins,
    recent: state.recent
  };
}

export default connect(mapStateToProps, { getLocationToSave })(DropNewPinButton);
