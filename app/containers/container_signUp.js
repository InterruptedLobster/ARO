import React, { Component, StyleSheet, View, Image, Text, TextInput  } from 'react-native';
import { connect } from 'react-redux';
import signUp from '../actions/action_signUp';
import { bindActionCreators } from 'redux';
import * as userActions from '../actions/action_user';

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
function mapDispatchToProps(dispatch) {
  return {
    action: bindActionCreators()
  }
}
export default connect(mapStateToProps, {signUp})(SignUp);
