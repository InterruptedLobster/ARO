import { connect } from 'react-redux';
import getLocationToSave from '../actions/action_dropNewPin.js';
import getPins from '../actions/action_updatePins.js';
import deletePin from '../actions/action_deletePin.js';
import updateRecent from '../actions/action_updateRecent.js';
import MapView from '../components/MapView.js';

function mapStateToProps(state) {
  return {
    pins: state.pins,
    recent: state.recent
  };
}

export default connect(mapStateToProps, { getLocationToSave, getPins, deletePin, updateRecent })(MapView);
