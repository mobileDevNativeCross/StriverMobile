import {connect} from 'react-redux';
import CounterView from './CounterView';

export default connect(
  state => ({
    loading: state.getIn(['counter', 'loading']),
    userName: state.getIn(['auth', 'currentUser', 'name']),
    userProfilePhoto: state.getIn(['auth', 'currentUser', 'picture']),
    nextWorkoutToken: state.getIn(['auth', 'authenticationToken', 'idToken']),
    nextWorkoutTree: state.getIn(['counter', 'nextWorkoutTree']),
    state: state
  })
)(CounterView);
