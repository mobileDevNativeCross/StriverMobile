import {Map, List} from 'immutable';
import {loop, Effects} from 'redux-loop';
import {AsyncStorage} from 'react-native';

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
});


// Reducer
export default function LiveWorkoutStateReducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_LENGTH: {
      const checkMas = new Array(action.len).fill(false);
      // AsyncStorage.setItem('checked', JSON.stringify(checkMas));
      return state
        .set(['len'], action.len)
        .set(['check'], checkMas);
    }

    case SET_CHECK: {
      const newState = state.get('check').toArray();
      newState[action.index] = !newState[action.index];

      try {
        AsyncStorage.setItem('checked', JSON.stringify(newState))
        // AsyncStorage.setItem(['checked', action.index], !state.getIn(['check', action.index]))
      }
      catch (e) {
        console.log(e);
      }
      return state.setIn(['check', action.index], !state.getIn(['check', action.index]));
    }

    case CLEAR_CHECK: {
      const size = state.get('check').size;

      for (var i = 0; i < size; i ++) {
        state = state.setIn(['check', i], false);
      }
      return state;
    }

    default:
      return state;
  }
}
