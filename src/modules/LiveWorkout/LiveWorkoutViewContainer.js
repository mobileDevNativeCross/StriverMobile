import {connect} from 'react-redux';
import LiveWorkoutView from './LiveWorkoutView';

export default connect(
  (state, props) => ({
    loading: state.getIn(['home', 'loading']),
    userName: state.getIn(['auth', 'currentUser', 'name']),
    athleteId: state.getIn(['auth', 'currentUser', 'appMetadata', 'striver_user_id']),
    userProfilePhoto: state.getIn(['auth', 'currentUser', 'picture']),
    reduxCurrentToken: state.getIn(['app', 'currentToken']),
    nextWorkoutToken: state.getIn(['auth', 'authenticationToken', 'idToken']),
    nextWorkoutTree: state.getIn(['home', 'nextWorkoutTree']),
    check: state.getIn(['liveWorkout', 'check']),
    currentTimerValue: state.getIn(['home', 'timerValue']),
    // reduxTimerId: state.getIn(['home', 'timerId']),
    showWindowFinish: state.getIn(['liveWorkout', 'show']),
  })
)(LiveWorkoutView);
