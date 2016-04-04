import React, { Component, PropTypes, StyleSheet, Text, View  } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import getLocationToSave from '../actions/action_dropNewPin';
import updatePins from '../actions/action_updatePins';
import deletePin from '../actions/action_deletePin';
import updateRecent from '../actions/action_updateRecent';
import clearTarget from '../actions/action_setTarget';
import setTarget from '../actions/action_setTarget';
import ViewContainer from '../components/ViewContainer';

//container that handles all of the redux store logic pertaining to the views
function mapStateToProps(state) {
  return {
    pins: state.pins,
    recent: state.recent,
    friends: state.friends,
    user: state.user,
    targetPin: state.targetPin,
  };
}

export default connect(mapStateToProps, { getLocationToSave, updatePins, deletePin, updateRecent, setTarget, clearTarget })(ViewContainer);
