import React, { Component, StyleSheet, View, Text  } from 'react-native';

class SignUp extends Component {


}
function mapStateToProps(state) {
  return {
    user: state.user
  }
}
export default connect(mapStateToProps)(SignUp);
