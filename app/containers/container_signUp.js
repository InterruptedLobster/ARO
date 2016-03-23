import React, { Component, StyleSheet, View, Image, Text, TextInput  } from 'react-native';
import { connect } from 'react-redux';
import signUp from '../actions/action_signUp.js';

class SignUp extends Component {
  render() {
    <View>
    </View>
  }
}
function mapStateToProps(state) {
  return {
    user: state.user
  };
}
export default connect(mapStateToProps, {signUp})(SignUp);
