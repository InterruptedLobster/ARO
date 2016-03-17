//this should add ownprops from parent map
import React, { Component } from 'react-native';
import getLocationToSave from '../actions/action_pins.js';
import Button from 'react-native-button';

// import DropNewPinButton from '../components/DropNewPinButton.js';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class DropNewPinButton extends Component {
  constructor(props) {
    super(props);
    this.state= {
     long: null,
     lat: null,
     title: ''
    };
    this.ref = new Firebase("https://interruptedlobster.firebaseio.com/user1");
  }

  handleClick() {
   this.props.actions.getLocationToSave();
   console.log('this is the pin', this.props.pins)
  }
  render() {
    return (
      <Button
        style={{borderWidth: 1, borderColor: 'blue'}}
        onPress={this.handleClick.bind(this)}>
        Press Me!
      </Button>

    );
  }
}

function mapStateToProps(state) {
  return {
    pins: state.pins
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({getLocationToSave: getLocationToSave}, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DropNewPinButton);


