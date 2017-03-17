import {Map, List} from 'immutable';
import {loop, Effects} from 'redux-loop';
// import {generateRandomNumber} from '../../services/randomNumberService';

// Initial state
const initialState = Map({
  check: List([]),
  len: 0,
});


// Actions
const SET_CHECK = 'SET_CHECK';
const SET_LENGTH = 'SET_LENGTH';
const CLEAR_CHECK = 'CLEAR_CHECK';
// const INCREMENT = 'CounterState/INCREMENT';
// const RESET = 'CounterState/RESET';
// const RANDOM_REQUEST = 'CounterState/RANDOM_REQUEST';
// const RANDOM_RESPONSE = 'CounterState/RANDOM_RESPONSE';
// const GET_WORKOUT_TREE = 'CounterState/GET_WORKOUT_TREE';

// Action creators
export const setLength = (len) => ({
  type: SET_LENGTH,
  len,
})

export const setCheck = (index) => ({
  type: SET_CHECK,
  index
});

export const clearCheck = () => ({
  type: CLEAR_CHECK,
  // check: [false],
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
    case SET_LENGTH: {
      const checkMas = new Array(action.len).fill(false);
      return state
        .set(['len'], action.len)
        .set(['check'], checkMas);
    }

    case SET_CHECK: {
      // console.warn(state.getIn(['check']));
      return state
        .setIn(['check', action.index], !state.getIn(['check', action.index]));
    }

    case CLEAR_CHECK: {
      const size = state.get('check').size;
      // state.get('check').map((value, index) console.warn)
      // return state.map(item => { item.set('item', false) })
      // const a = Map();
      // stateMas = [];
      // let stateMas = [];
      // console.warn('SIZE',size);
      for (var i = 0; i < size; i ++) {
        state = state.setIn(['check', i], false);
      }
      // console.warn('STATECHECK', state);
      return state;
      // return initialState;
      // console.warn('CLEAR', state);
      // return state
      //   .update((check) => {
      //     return check.set([]);
      //   });
      // return state
      //   .set('check', action.check);
      // return state
      //   .get('check').map(value => false)
      // return state.merge(initialState);
      // return state.update('check', (check) => check.set('check', []));
      // return state
      //  .delete('check');
    }

    default:
      return state;
  }
}
