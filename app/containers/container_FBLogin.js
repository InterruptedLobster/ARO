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
  componentWillMount() {
    // console.log('this is will mount userTest:', this.props.userTest);
  }
  componentDidMount() {
    // console.log('this is did mount userTest:', this.props.userTest);
  }
  render() {
  const { user, action } = this.props;

    // console.log('this is props!@#!@#!@#!', this.props)
    var _this = this;
    // var user = this.state.user;
    return (
      <View style={styles.loginContainer}>

        { user && <Photo user={user} /> }
        { user && <Info user={user} /> }

        <FBLogin style={{ marginBottom: 10, }}
          permissions={["email","user_friends"]}
          onLogin={function(data){
            console.log("*******Logged in!");
            action.logIn(data.credentials);
            // _this.setState({ user : data.credentials });
          }}
          onLogout={function(){
            console.log("*******Logged out.");
            action.logOut();
            // _this.setState({ user : null });
          }}
          onLoginFound={function(data){
            console.log("********Existing login found.");

            action.logIn(data.credentials);

            // _this.setState({ user : data.credentials });
          }}
          onLoginNotFound={function(){
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

var Photo = React.createClass({
  propTypes: {
    user: React.PropTypes.object.isRequired,
  },

  // getInitialState: function(){
  //   return {
  //     photo: null,
  //   };
  // },

  componentWillMount: function(){
    const { user } = this.props;
    var _this = this;
    // var user = this.props.user;
    var api = `https://graph.facebook.com/v2.3/${user.userId}/picture?width=${FB_PHOTO_WIDTH}&redirect=false&access_token=${user.token}`;

    fetch(api)
      .then((response) => response.json())
      .then((responseData) => {
        console.log('------this is responseData from photo fetch!----->>>', responseData.data);
        action.getPhoto(responseData.data);
        // _this.setState({
        //   photo : {
        //     url : responseData.data.url,
        //     height: responseData.data.height,
        //     width: responseData.data.width,
        //   },
        // });
      })
      .done();
  },

  render: function(){
    const { photo } = this.props;
    if(photo === null) {
      return this.renderLoading();
    }
    // if(this.state.photo == null) return this.renderLoading();

    // var photo = this.state.photo;

    return (
      <View style={styles.bottomBump}>

        <Image
          style={photo &&
            {
              height: photo.height,
              width: photo.width,
            }
          }
          source={{uri: photo && photo.url}}
        />
      </View>
    );
  },
  renderLoading: function(){
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
});

var Info = React.createClass({
  propTypes: {
    user: React.PropTypes.object.isRequired,
  },

  // getInitialState: function(){
  //   return {
  //     info: null,
  //   };
  // },

  componentWillMount: function(){
    var _this = this;
    var user = this.props.user;
    var api = `https://graph.facebook.com/v2.3/${user.userId}?fields=name,email&access_token=${user.token}`;

    fetch(api)
      .then((response) => response.json())
      .then((responseData) => {
        _this.setState({
          info : {
            name : responseData.name,
            email: responseData.email,
          },
        });
      })
      .done();
  },

  render: function(){
    var info = this.state.info;

    return (
      <View style={styles.bottomBump}>
        <Text>{ info && this.props.user.userId }</Text>
        <Text>{ info && info.name }</Text>
        <Text>{ info && info.email }</Text>
      </View>
    );
  }
});

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
const smartPhoto = connect(mapStateToProps, mapDispatchToProps)(Photo);
const smartInfo = connect(mapStateToProps, mapDispatchToProps)(Info);

