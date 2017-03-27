import {connect} from 'react-redux';
import BeginWorkoutView from './BeginWorkoutView';

export default connect(
  (state, props) => ({
    loading: state.getIn(['home', 'loading']),
    userName: state.getIn(['auth', 'currentUser', 'name']),
    athleteId: state.getIn(['auth', 'currentUser', 'appMetadata', 'striver_user_id']),
    userProfilePhoto: state.getIn(['auth', 'currentUser', 'picture']),
    nextWorkoutToken: state.getIn(['auth', 'authenticationToken', 'idToken']),
    nextWorkoutTree: state.getIn(['home', 'nextWorkoutTree']),
    check: state.getIn(['beginWorkout', 'check']),
    some: state.getIn(['beginWorkout', 'some']),
    currentTimerValue: state.getIn(['home', 'timerValue']),
    reduxTimerId: state.getIn(['home', 'timerId']),
  })
)(BeginWorkoutView);
