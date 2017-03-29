import {Map, List} from 'immutable';
import {loop, Effects} from 'redux-loop';
import {AsyncStorage} from 'react-native';

// Initial state
const initialState = Map({
  check: [],
  len: 0,
});


// Actions
const SET_CHECK = 'SET_CHECK';
const SET_LENGTH = 'SET_LENGTH';
const CLEAR_CHECK = 'CLEAR_CHECK';

// Action creators
export const setCheckArray = (array) => ({
  type: SET_LENGTH,
  len: array.len,
  check: array,
});


export const setLength = (len) => (dispatch) => {
  let checkMas = new Array(len).fill(false);
  AsyncStorage.getItem('checked').then(res => {
    if (res && JSON.parse(res).length > 0) {
      let reslen = JSON.parse(res).length;
      dispatch({
        type: SET_LENGTH,
        len,
        check: JSON.parse(res),
      })
    } else {
      dispatch({
        type: SET_LENGTH,
        len,
        check: checkMas,
      })
    }
  });
}

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
      return state
        .set('len', action.len)
        .set('check', action.check);
    }

    case SET_CHECK: {
      const newState = state.get('check').map((a, i) => {
        if (i === action.index) {
          return !a;
        }
        return a;
      });
      AsyncStorage.setItem('checked', JSON.stringify(newState));
      return state.set('check', newState);
    }

    case CLEAR_CHECK: {
      const size = state.get('check').length;
      let checkMas = state.get('check');
      for (let i = 0; i < size; i ++) {
        checkMas[i] = false;
      }
      AsyncStorage.setItem('checked', JSON.stringify(checkMas));
      return state.set('check', checkMas);
    }

    default:
      return state;
  }
}
