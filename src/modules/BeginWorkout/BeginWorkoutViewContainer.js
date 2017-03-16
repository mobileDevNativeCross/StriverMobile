import {connect} from 'react-redux';
import BeginWorkoutView from './BeginWorkoutView';

export default connect(
  state => ({
    // counter: state.getIn(['counter', 'value']),
    loading: state.getIn(['counter', 'loading']),
    userName: state.getIn(['auth', 'currentUser', 'name']),
    userProfilePhoto: state.getIn(['auth', 'currentUser', 'picture']),
    nextWorkoutToken: state.getIn(['auth', 'authenticationToken', 'idToken']),
    nextWorkoutTree: state.getIn(['counter', 'nextWorkoutTree']),
    state: state
  })
)(BeginWorkoutView);
