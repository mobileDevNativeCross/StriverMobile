import {connect} from 'react-redux';
import CounterView from './CounterView';

export default connect(
  state => ({
    currentState: state.getIn(['auth', 'authenticationToken', 'idToken'])
  })
)(CounterView);
