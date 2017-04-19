import {connect} from 'react-redux';
import LiveWorkoutView from './LiveWorkoutView';

export default connect(
  (state, props) => ({
    // userName: state.getIn(['auth', 'currentUser', 'name']),
    // userProfilePhoto: state.getIn(['auth', 'currentUser', 'picture']),
    reduxCurrentToken: state.getIn(['app', 'currentToken']),
    nextWorkoutTree: state.getIn(['home', 'nextWorkoutTree']),
    check: state.getIn(['liveWorkout', 'check']),
    showWindowFinish: state.getIn(['liveWorkout', 'show']),
  })
)(LiveWorkoutView);
