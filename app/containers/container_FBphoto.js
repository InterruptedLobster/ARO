// import React, {
//   Component,
//   StyleSheet,
//   Image,
//   Text,
//   View,
// } from 'react-native';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import * as userActions from '../actions/action_user';

// const FB_PHOTO_WIDTH = 200;


// var Photo = React.createClass({
//   propTypes: {
//     user: React.PropTypes.object.isRequired,
//   },

//   // getInitialState: function(){
//   //   return {
//   //     photo: null,
//   //   };
//   // },

//   componentWillMount: function(){
//     console.log('this is props in photo!!!!!!!', this.props);
//     const { user , action } = this.props;
//     console.log('this is {user in photo!!!}', user);
//     var _this = this;
//     // var user = this.props.user;
//     var api = `https://graph.facebook.com/v2.3/${user.userId}/picture?width=${FB_PHOTO_WIDTH}&redirect=false&access_token=${user.token}`;

//     fetch(api)
//       .then((response) => response.json())
//       .then((responseData) => {
//         console.log('------this is responseData from photo fetch!----->>>', responseData.data);
//         // action.getPhoto(responseData.data);
//         // _this.setState({
//         //   photo : {
//         //     url : responseData.data.url,
//         //     height: responseData.data.height,
//         //     width: responseData.data.width,
//         //   },
//         // });
//       })
//       .done();
//   },

//   render: function(){
//     const { photo } = this.props.user;
//     if(photo === null) {
//       return this.renderLoading();
//     }
//     // if(this.state.photo == null) return this.renderLoading();

//     // var photo = this.state.photo;

//     return (
//       <View style={styles.bottomBump}>

//         <Image
//           style={photo &&
//             {
//               height: photo.height,
//               width: photo.width,
//             }
//           }
//           source={{uri: photo && photo.url}}
//         />
//       </View>
//     );
//   },
//   renderLoading: function(){
//     return (
//       <View>
//         <Text>Loading...</Text>
//       </View>
//     );
//   }
// });

// var styles = StyleSheet.create({
//   loginContainer: {
//     marginTop: 150,

//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   bottomBump: {
//     marginBottom: 15,
//   },
// });

// function mapStateToProps(state) {
//   return {
//     user: state.user,
//     // photo: state.user.photo,
//     // info: state.user.info
//   }
// }

// function mapDispatchToProps(dispatch) {
//   return {
//     action: bindActionCreators(userActions, dispatch)
//   }
// }
// export default connect(mapStateToProps, mapDispatchToProps)(Photo);

