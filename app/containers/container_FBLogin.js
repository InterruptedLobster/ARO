import React, {
  Component,
  StyleSheet,
  Image,
  Text,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../actions/action_user';
import { Actions } from 'react-native-router-flux';
import { changeUser } from '../lib/db/db';
import FBLogin from 'react-native-facebook-login';

//log in component through imported module that deals with log in, error, and log out
//each prop inside component is an event handler

class LogIn extends Component {
  constructor(props){
    super(props);
  }

  render() {
  const { user, action } = this.props;
    return (
      <View style={styles.loginContainer}>

        <FBLogin style={{ marginBottom: 10, }}
          permissions={["email","user_friends"]}
          onLogin={function(data){
            //upon successful log in to fb, change db ref to specific user, route to view,
            //and dispatch action which updates the store
            changeUser(data.credentials.userId)
            Actions.view();
            action.firebase_check(data.credentials);
          }}
          onLogout={function(){
            //upon logout, dispatch log out action
            action.logOut();
          }}
          onLoginFound={function(data){
            //if user was already signed in this will execute
            changeUser(data.credentials.userId)
            Actions.view();
            action.firebase_check(data.credentials);
          }}
          onLoginNotFound={function(){
            //if user has not signed in since last session
            action.logOut();
          }}
          onError={function(data){
            console.log(data);
          }}
          onCancel={function(){
            //when user hits cancel on fb sigin
            console.log("User cancelled.");
          }}
          onPermissionsMissing={function(data){
            console.log(data);
          }}
        />
      </View>
    );
  }
}

var styles = StyleSheet.create({
  loginContainer: {
    marginTop: 150,

    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomBump: {
    marginBottom: 15,
  },
});

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

function mapDispatchToProps(dispatch) {
  return {
    action: bindActionCreators(userActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
