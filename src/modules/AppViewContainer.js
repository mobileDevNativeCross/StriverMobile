import {connect} from 'react-redux';
import AppView from './AppView';
import * as NavigationState from './navigation/NavigationState';

export default connect(
  state => ({
    isReady: state.getIn(['navigationState', 'isReady']),
    isLoggedIn: state.getIn(['auth', 'isLoggedIn']),
    nextWorkoutToken: state.getIn(['auth', 'authenticationToken', 'idToken']),
  }),
  dispatch => ({
    containerGetPrevNavigationState() {
      dispatch(NavigationState.getPrevNavigationState());
    },
  })
)(AppView);
