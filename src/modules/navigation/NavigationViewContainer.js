import {connect} from 'react-redux';
import {pushRoute, popRoute} from './NavigationState';
import NavigationView from './NavigationView';
import * as LiveWorkoutState from '../LiveWorkout/LiveWorkoutState';
import * as HomeState from '../Home/HomeState';

export default connect(
  state => ({
    navigationState: state.get('navigationState').toJS()
  }),
  dispatch => ({
    pushRoute(index) {
      dispatch(pushRoute(index));
    },
    onNavigateBack() {
      console.warn('onNavigateBack()');
      dispatch(popRoute());
    },
    backToHomeFromLiveWorkout() {
      dispatch(popRoute());
      dispatch(HomeState.checkEnter(true));
      dispatch(LiveWorkoutState.clearCheck());
      dispatch(LiveWorkoutState.showWindowFinish(false));
    }
  })
)(NavigationView);
