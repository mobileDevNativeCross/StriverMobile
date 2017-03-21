import {connect} from 'react-redux';
import BeginWorkoutView from './BeginWorkoutView';

export default connect(
  (state, props) => ({
    loading: state.getIn(['counter', 'loading']),
    userName: state.getIn(['auth', 'currentUser', 'name']),
    athleteId: state.getIn(['auth', 'currentUser', 'appMetadata', 'striver_user_id']),
    userProfilePhoto: state.getIn(['auth', 'currentUser', 'picture']),
    nextWorkoutToken: state.getIn(['auth', 'authenticationToken', 'idToken']),
    nextWorkoutTree: state.getIn(['counter', 'nextWorkoutTree']),
    check: state.getIn(['beginWorkout', 'check']),
    some: state.getIn(['beginWorkout', 'some']),
    currentTimerValue: state.getIn(['counter', 'timerValue']),
    reduxTimerId: state.getIn(['counter', 'timerId']),
  })
)(BeginWorkoutView);
