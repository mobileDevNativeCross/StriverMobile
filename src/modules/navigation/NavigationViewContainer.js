import {connect} from 'react-redux';
import {pushRoute, popRoute} from './NavigationState';
import NavigationView from './NavigationView';
import * as LiveWorkoutState from '../LiveWorkout/LiveWorkoutState';
import * as NavigationState from '../navigation/NavigationState';
import * as HomeState from '../Home/HomeState';

export default connect(
  state => ({
    navigationState: state.get('navigationState').toJS(),
    state: state
  }),
  dispatch => ({
    pushRoute(index) {
      dispatch(pushRoute(index));
    },
    onNavigateBack() {
      dispatch(popRoute());
    },
    // fixing a bug with not saving current Scene
    containerGetPrevNavigationState() {
      console.warn('going to get previous state');
      dispatch(NavigationState.getPrevNavigationState());
    },
    backToHomeFromLiveWorkout() {
      dispatch(popRoute());
      dispatch(HomeState.checkEnter(true));
      dispatch(LiveWorkoutState.clearCheck());
      dispatch(LiveWorkoutState.showWindowFinish(false));
    }
  })
)(NavigationView);
