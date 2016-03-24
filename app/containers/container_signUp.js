//this page not being used but
// import React, { Component, StyleSheet, View, Image, Text, TextInput  } from 'react-native';
// import Button from 'react-native-button';

// import { connect } from 'react-redux';
// import { signUp }from '../actions/action_user';
// import { bindActionCreators } from 'redux';
// import * as userActions from '../actions/action_user';


// class SignUp extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       firstName : '',
//       lastName : '',
//       email : '',
//       number : 0
//     };
//   }
//   onSubmit() {
//     console.log(this.props, 'this props in signup comp----');
//     const { action } = this.props;
//     console.log(action, 'action in signup comp----');
//   }

//   render() {
//     const {firstName, lastName, email, } = this.state;
//     return (
//     <View style = {styles.container}>
//       <Button style = {styles.button}
//       text="Signup with FaceBook"
//       onPress={this.onSubmit.bind(this)}>
//       Sign Up with FaceBook
//       </Button>
//     </View>
//     )
//   }
// }
// function mapStateToProps(state) {
//   return {
//     user: state.user
//   };
// }
// function mapDispatchToProps(dispatch) {
//   return {
//     action: bindActionCreators(userActions, dispatch)
//   }
// }
// export default connect(mapStateToProps, mapDispatchToProps)(SignUp);

// var styles =  StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center', // vertical align
//     alignItems: 'center', // horizontal align
//     backgroundColor: 'grey',
//     opacity:.3
//   },
//   button: {
//     padding:6,
//     backgroundColor: '#97B8BD',
//     flexWrap:'wrap',
//     alignSelf:'center',
//     width:225,
//     marginBottom:10,
//     borderRadius:5
//   }
// })
