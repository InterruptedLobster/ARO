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



import FBLogin from 'react-native-facebook-login';

//sets fb photo width
const FB_PHOTO_WIDTH = 200;

//this is data.credentials
// { tokenExpirationDate: '2016-05-22T17:41:07-07:00',
//   permissions: [ 'email', 'contact_email', 'user_friends', 'public_profile' ],
//   userId: '10153780375328598',
//   token: 'CAAYZANvux7B...etc..gBAOCT0knZg' }

class LogIn extends Component {
  constructor(props){
    super(props);
    // this.state = {
    //   user: null
    // };
  }
     // { user && <Photo user={user} action ={action} /> }
      // { user && <Info user={user} action={action} /> }
  render() {
  const { user, action } = this.props;
    // console.log('this is props!@#!@#!@#!', this.props)
    var _this = this;
    // var user = this.state.user;
    return (
      <View style={styles.loginContainer}>

        <FBLogin style={{ marginBottom: 10, }}
          permissions={["email","user_friends"]}
          onLogin={function(data){
            console.log("*******Logged in! and this is props");
            action.firebase_check(data.credentials);
            // _this.setState({ user : data.credentials });
          }}
          onLogout={function(){
            console.log("*******Logged out.");
            action.logOut();
            // _this.setState({ user : null });
          }}
          onLoginFound={function(data){
            //if user was already signed in, no need to sign in again
            console.log("********Existing login found.");

            // action.logIn(data.credentials); does data persist already?

            // _this.setState({ user : data.credentials });
          }}
          onLoginNotFound={function(){
            //if user has not signed in since last session
            console.log("*******No user logged in.");
            action.logOut();
            // _this.setState({ user : null });
          }}
          onError={function(data){
            console.log("*******ERROR");
            console.log(data);
          }}
          onCancel={function(){
            console.log("******User cancelled.");
          }}
          onPermissionsMissing={function(data){
            console.log("*******Check permissions!");
            console.log(data);
          }}
        />

        <Text>{ user ? user.token : "N/A" }</Text>
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
    user: state.user,
    photo: state.user.photo,
    info: state.user.info
  }
}

function mapDispatchToProps(dispatch) {
  return {
    action: bindActionCreators(userActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);

