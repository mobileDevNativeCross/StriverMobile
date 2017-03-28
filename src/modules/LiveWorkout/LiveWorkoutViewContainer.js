import {connect} from 'react-redux';
import LiveWorkoutView from './LiveWorkoutView';

export default connect(
  (state, props) => ({
    loading: state.getIn(['home', 'loading']),
    userName: state.getIn(['auth', 'currentUser', 'name']),
    athleteId: state.getIn(['auth', 'currentUser', 'appMetadata', 'striver_user_id']),
    userProfilePhoto: state.getIn(['auth', 'currentUser', 'picture']),
    nextWorkoutToken: state.getIn(['auth', 'authenticationToken', 'idToken']),
    nextWorkoutTree: state.getIn(['home', 'nextWorkoutTree']),
    check: state.getIn(['liveWorkout', 'check']),
    // some: state.getIn(['liveWorkout', 'some']),
    currentTimerValue: state.getIn(['home', 'timerValue']),
    reduxTimerId: state.getIn(['home', 'timerId']),
    windowShow: state.getIn(['liveWorkout', 'windowShow']),
  })
)(LiveWorkoutView);
