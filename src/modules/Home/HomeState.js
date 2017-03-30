import {Map} from 'immutable';
import {loop, Effects} from 'redux-loop';
import {setLength} from '../LiveWorkout/LiveWorkoutState';
import * as auth0 from '../../services/auth0';
import { AsyncStorage } from 'react-native';

// Initial state
const initialState = Map({
  checkEnter: true,
  nextWorkoutTree: {},
  loading: false,
  timerValue: 0,
  timerId: 'liveWorkoutTimer'
});

// Actions
const TIMER_INCREMENT = 'HomeState/TIMER_INCREMENT';
const TIMER_RESET = 'HomeState/TIMER_RESET';
const GET_WORKOUT_TREE = 'HomeState/GET_WORKOUT_TREE';
const CHECK_ENTER = 'HomeState/CHECK_ENTER';

// Action creators
export const getWorkoutTree = () => (dispatch, getState) => {
  const token = getState().getIn(['auth', 'authenticationToken', 'idToken'])
  fetch('https://strivermobile-api.herokuapp.com/api/nextworkout',{
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + token
    }
  })
  .then((response) => {
    if ((response.status == 401) && (response.ok == false)  && (response._bodyText === 'Unauthorized', '\\n')) {
      auth0.showLogin()
        .catch(e => console.log('error in showLogin()', e))
    }
    return response.json();
  })
  .then((responseJson) => {
    dispatch(({
      type: GET_WORKOUT_TREE,
      response: responseJson,
    }))
    AsyncStorage.setItem('workoutTree', JSON.stringify(responseJson));
    dispatch(setLength(responseJson.liveWorkoutComponents.length));
  })
  .catch((e) => {
    console.log('error in getWorkoutTree(): ', e);
  });
}

export function setWorkoutTree(workoutTree) {
  return {
    type: GET_WORKOUT_TREE,
    response: workoutTree,
  }
}

export function checkEnter(checkEnter) {
  return {
    type: CHECK_ENTER,
    checkEnter: checkEnter,
  };
}

export function timerIncrement() {
  return {type: TIMER_INCREMENT};
}

export function timerReset() {
  return {type: TIMER_RESET};
}

// Reducer
export default function HomeStateReducer(state = initialState, action = {}) {
  switch (action.type) {
    case TIMER_INCREMENT:
      return state.update('timerValue', timerValue => timerValue + 1);

    case TIMER_RESET:
      return state.update('timerValue', timerValue => 0);

    case GET_WORKOUT_TREE: {
      return state
        .set('nextWorkoutTree', action.response);
    }

    case CHECK_ENTER: {
      return state
        .set('checkEnter', action.checkEnter);
    }

    default:
      return state;
  }
}
