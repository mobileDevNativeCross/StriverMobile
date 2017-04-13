import {connect} from 'react-redux';
import HomeView from './HomeView';

export default connect(
  state => ({
    // userName: state.getIn(['auth', 'currentUser', 'name']),
    // userProfilePhoto: state.getIn(['auth', 'currentUser', 'picture']),
    reduxCurrentToken: state.getIn(['app', 'currentToken', 'idToken']),
    // nextWorkoutToken: state.getIn(['auth', 'authenticationToken', 'idToken']),
    nextWorkoutTree: state.getIn(['home', 'nextWorkoutTree']),
    checkEnter: state.getIn(['home', 'checkEnter']),
    state: state, //for developing
  })
)(HomeView);
