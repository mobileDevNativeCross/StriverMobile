import {Map, fromJS} from 'immutable';
import {loop, combineReducers} from 'redux-loop';
import NavigationStateReducer from '../modules/navigation/NavigationState';
import AuthStateReducer from '../modules/auth/AuthState';
import HomeStateReducer from '../modules/Home/HomeState';
import AppStateReducer from '../modules/AppState';
import LiveWorkoutStateReducer from '../modules/LiveWorkout/LiveWorkoutState';

const reducers = {
  //auth0 Authentication login state
  auth: AuthStateReducer,

  home: HomeStateReducer,

  // @NOTE: By convention, the navigation state must live in a subtree called
  //`navigationState`
  navigationState: NavigationStateReducer,

  liveWorkout: LiveWorkoutStateReducer,

  app: AppStateReducer,

};

// initial state, accessor and mutator for supporting root-level
// immutable data with redux-loop reducer combinator
const immutableStateContainer = Map();
const getImmutable = (child, key) => child ? child.get(key) : void 0;
const setImmutable = (child, key, value) => child.set(key, value);

const namespacedReducer = combineReducers(
  reducers,
  immutableStateContainer,
  getImmutable,
  setImmutable
);

export default function mainReducer(state, action) {
  const [nextState, effects] = namespacedReducer(state || void 0, action);

  // enforce the state is immutable
  return loop(fromJS(nextState), effects);
}
