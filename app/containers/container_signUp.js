import React, { Component, StyleSheet, View, Image, Text, TextInput  } from 'react-native';
import Button from 'react-native-button';
import { connect } from 'react-redux';
import { signUp }from '../actions/action_user';
import { bindActionCreators } from 'redux';
import * as userActions from '../actions/action_user';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName : '',
      lastName : '',
      email : '',
      number : 0
    };
  }
  onSubmit() {

  }

  render() {
    const {firstName, lastName, email, } = this.state
    return (
    <View>
      <View>
      <TextInput
        onChangeText={(text) => this.setState({text})}
        value={firstName}
      />
      </View>
      <View>
      <TextInput
        onChangeText={(text) => this.setState({text})}
        value={lastName}
      />
      </View>
      <View>
      <TextInput
        onChangeText={(text) => this.setState({text})}
        value={email}
      />
      </View>
      <Button text="Signup" clickAction={this.onSubmit.bind(this)}> </Button>
    </View>
    )
  }
}
function mapStateToProps(state) {
  return {
    user: state.user
  };
}
function mapDispatchToProps(dispatch) {
  return {
    action: bindActionCreators(userActions, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
