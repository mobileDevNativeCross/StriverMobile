import {Map, List} from 'immutable';
import {loop, Effects} from 'redux-loop';

// Initial state
const initialState = Map({
  check: List([]),
  len: 0,
});


// Actions
const SET_CHECK = 'SET_CHECK';
const SET_LENGTH = 'SET_LENGTH';
const CLEAR_CHECK = 'CLEAR_CHECK';

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


// Reducer
export default function CounterStateReducer(state = initialState, action = {}) {
  switch (action.type) {
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
