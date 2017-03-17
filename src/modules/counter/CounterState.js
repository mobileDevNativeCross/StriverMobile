import {Map} from 'immutable';
import {loop, Effects} from 'redux-loop';
import {generateRandomNumber} from '../../services/randomNumberService';

// Initial state
const initialState = Map({
  nextWorkoutTree: 111,
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
    // console.warn('returning response.json()', response.json());
    return response.json();
  })
  .then((responseJson) => {
    dispatch(({
      type: GET_WORKOUT_TREE,
      response: responseJson,
    }))
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
      console.warn('timerIncrement() working');
      return state.update('timerValue', timerValue => timerValue + 1);

    case TIMER_RESET:
      console.warn('TIMER_RESET is working');
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
        // console.warn('state is: ', action.response);
          return state
            .set('nextWorkoutTree', action.response);
    }

    default:
      return state;
  }
}
