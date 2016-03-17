import React, { Component, PropTypes, StyleSheet, Text, View  } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import getLocationToSave from '../actions/action_pins.js';

import ViewContainer from '../components/ViewContainer.js';


// export default class MapContainer extends Component {
//   constructor() {
//     super();
//     this.state = {
//       location: {
//         long: null,
//         lat:null
//       }
//   };
//   //include fetching function from maps
//   render() {
//     return React.createElement(Map, { location: this.state.location });
//   }

//   };
// }
function mapStateToProps(state) {
  return {
    pins: state.pins,
    // currentPin: getLocation()
  };
}
function mapDispatchToProps(dispatch){
  //TODO: figure out which actions to dispatch
  return {
    dropNewPin: bindActionCreators(getLocationToSave, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewContainer);

