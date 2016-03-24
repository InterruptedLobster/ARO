import { connect } from 'react-redux';
import getLocationToSave from '../actions/action_dropNewPin';
import getPins from '../actions/action_updatePins';
import deletePin from '../actions/action_deletePin';
import updateRecent from '../actions/action_updateRecent';
import PinListView from './PinListView';

function mapStateToProps(state) {
  return {
    pins: state.pins,
    recent: state.recent
  };
}

export default connect(mapStateToProps, { getLocationToSave, getPins, deletePin, updateRecent })(PinListView);
