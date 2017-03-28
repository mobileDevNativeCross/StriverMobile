import {Map, List} from 'immutable';
import {loop, Effects} from 'redux-loop';

// Initial state
const initialState = Map({
  check: List([]),
  len: 0,
  // windowShow: false,
});


// Actions
const SET_CHECK = 'SET_CHECK';
const SET_LENGTH = 'SET_LENGTH';
const CLEAR_CHECK = 'CLEAR_CHECK';
// const WINDOW_SHOW = 'WINDOW_SHOW';

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

// export const windowFinishShow = (windowShow) => ({
//   type: WINDOW_SHOW,
//   windowShow,
// });


// Reducer
export default function LiveWorkoutStateReducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_LENGTH: {
      const checkMas = new Array(action.len).fill(false);
      return state
        .set(['len'], action.len)
        .set(['check'], checkMas);
    }

    case SET_CHECK: {
      return state
        .setIn(['check', action.index], !state.getIn(['check', action.index]));
    }

    case CLEAR_CHECK: {
      const size = state.get('check').size;

      for (var i = 0; i < size; i ++) {
        state = state.setIn(['check', i], false);
      }
      return state;
    }

    // case WINDOW_SHOW: {
    //   return state
    //     .set('windowShow', action.windowShow);
    // }

    default:
      return state;
  }
}
