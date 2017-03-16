import {Map} from 'immutable';
import {loop, Effects} from 'redux-loop';
// import {generateRandomNumber} from '../../services/randomNumberService';

// Initial state
const initialState = Map({
  check: [],
});

// Actions
const SET_CHECK = 'SET_CHECK';
const CLEAR_CHECK = 'CLEAR_CHECK';
// const INCREMENT = 'CounterState/INCREMENT';
// const RESET = 'CounterState/RESET';
// const RANDOM_REQUEST = 'CounterState/RANDOM_REQUEST';
// const RANDOM_RESPONSE = 'CounterState/RANDOM_RESPONSE';
// const GET_WORKOUT_TREE = 'CounterState/GET_WORKOUT_TREE';

// Action creators
export const setCheck = (check) => ({
  type: SET_CHECK,
  check,
});

export const clearCheck = () => ({
  type: CLEAR_CHECK,
  check: [],
});
  // const token = getState().getIn(['auth', 'authenticationToken', 'idToken'])
  //
  // fetch('https://strivermobile-api.herokuapp.com/api/nextworkout',{
  //   method: 'GET',
  //   headers: {
  //     'Authorization': 'Bearer ' + token
  //   }
  // })
  // .then((response) => {
  //   // console.warn('returning response.json()', response.json());
  //   return response.json();
  // })
  // .then((responseJson) => {
  //   dispatch(({
  //     type: GET_WORKOUT_TREE,
  //     response: responseJson,
  //   }))
  // })
  // .catch((e) => {
  //   console.warn('error is: ', e);
  // });

// export function increment() {
//   return {type: INCREMENT};
// }
//
// export function reset() {
//   return {type: RESET};
// }
//
// export function random() {
//   return {
//     type: RANDOM_REQUEST
//   };
// }
//
// export async function requestRandomNumber() {
//   return {
//     type: RANDOM_RESPONSE,
//     payload: await generateRandomNumber()
//   };
// }

// Reducer
export default function CounterStateReducer(state = initialState, action = {}) {
  switch (action.type) {
  //   case INCREMENT:
  //     return state.update('value', value => value + 1);
  //
  //   case RESET:
  //     return initialState;
  //
  //   case RANDOM_REQUEST:
  //     return loop(
  //       state.set('loading', true),
  //       Effects.promise(requestRandomNumber)
  //     );
  //
  //   case RANDOM_RESPONSE:
  //     return state
  //       .set('loading', false)
  //       .set('value', action.payload);
  //
    case SET_CHECK: {
      return state
        .set('check', action.check);
    }

    case CLEAR_CHECK: {
      return state
        .set('check', action.check);
    }

    default:
      return state;
  }
}
