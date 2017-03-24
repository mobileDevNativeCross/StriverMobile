import {Map} from 'immutable';
import {loop, Effects} from 'redux-loop';
import {generateRandomNumber} from '../../services/randomNumberService';
import {setLength} from '../BeginWorkout/BeginWorkoutState';
import * as auth0 from '../../services/auth0';

// Initial state
const initialState = Map({
  nextWorkoutTree: {},
  loading: false,
  timerValue: 0,
  timerId: 'liveWorkoutTimer'
});

// Actions
const TIMER_INCREMENT = 'CounterState/TIMER_INCREMENT';
const TIMER_RESET = 'CounterState/TIMER_RESET';
const RESET = 'CounterState/RESET';
const RANDOM_REQUEST = 'CounterState/RANDOM_REQUEST';
const RANDOM_RESPONSE = 'CounterState/RANDOM_RESPONSE';
const GET_WORKOUT_TREE = 'CounterState/GET_WORKOUT_TREE';

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
    console.warn('response', JSON.stringify(response, null, 2));
    if (response.status !==200 && response.ok !== true /* && response._bodyText === 'Unauthorized', '//n'*/) {
        console.warn('Probably Wrong token or old token - finish @oldTokenBugfixing');
    /* @oldTokenBugfixing
    *      auth0.showLogin()
    *     .then(() => console.warn('Show auth0 login screen'))
    *     .catch(e => console.warn('error in showLogin()', e))
    */
    }
    return response.json();
  })
  .then((responseJson) => {
    dispatch(({
      type: GET_WORKOUT_TREE,
      response: responseJson,
    }))
    dispatch(setLength(responseJson.liveWorkoutComponents.length))
  })
  .catch((e) => {
    console.log('error is (probably just didn\'t get token YET!): ', e);
  });



}

export function timerIncrement() {
  return {type: TIMER_INCREMENT};
}

export function timerReset() {
  return {type: TIMER_RESET};
}

export function reset() {
  return {type: RESET};
}

export function random() {
  return {
    type: RANDOM_REQUEST
  };
}

export async function requestRandomNumber() {
  return {
    type: RANDOM_RESPONSE,
    payload: await generateRandomNumber()
  };
}

// Reducer
export default function CounterStateReducer(state = initialState, action = {}) {
  switch (action.type) {
    case TIMER_INCREMENT:
      return state.update('timerValue', timerValue => timerValue + 1);

    case TIMER_RESET:
      return state.update('timerValue', timerValue => 0);

    case RESET:
      return initialState;

    case RANDOM_REQUEST:
      return loop(
        state.set('loading', true),
        Effects.promise(requestRandomNumber)
      );

    case RANDOM_RESPONSE:
      return state
        .set('loading', false)
        .set('value', action.payload);

    case GET_WORKOUT_TREE: {
          return state
            .set('nextWorkoutTree', action.response);
    }

    default:
      return state;
  }
}
