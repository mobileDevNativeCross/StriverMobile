import {connect} from 'react-redux';
import BeginWorkoutView from './BeginWorkoutView';

export default connect(
  (state, props) => ({
    // counter: state.getIn(['counter', 'value']),
    loading: state.getIn(['counter', 'loading']),
    userName: state.getIn(['auth', 'currentUser', 'name']),
    userProfilePhoto: state.getIn(['auth', 'currentUser', 'picture']),
    nextWorkoutToken: state.getIn(['auth', 'authenticationToken', 'idToken']), // state.get('auth').get('auth...').get('idToken')
    nextWorkoutTree: state.getIn(['counter', 'nextWorkoutTree']),
    state: state,
    check: state.getIn(['beginWorkout', 'check']),
    some: state.getIn(['beginWorkout', 'some']),
    currentTimerValue: state.getIn(['counter', 'timerValue']),
    reduxTimerId: state.getIn(['counter', 'timerId']),
  })
)(BeginWorkoutView);
