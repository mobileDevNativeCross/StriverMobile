import {connect} from 'react-redux';
import HomeView from './HomeView';

export default connect(
  state => ({
    reduxCurrentToken: state.getIn(['app', 'currentToken']),
    nextWorkoutTree: state.getIn(['home', 'nextWorkoutTree']),
    checkEnter: state.getIn(['home', 'checkEnter']),
    state: state, //for developing
  })
)(HomeView);
