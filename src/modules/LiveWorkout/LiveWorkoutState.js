import { Map } from 'immutable';
import { AsyncStorage, StatusBar } from 'react-native';

// Initial state
const initialState = Map({
  check: [],
  len: 0,
  show: false,
});


// Actions
const SET_CHECK = 'SET_CHECK';
const SET_LENGTH = 'SET_LENGTH';
const CLEAR_CHECK = 'CLEAR_CHECK';
const SHOW_WINDOW = 'SHOW_WINDOW';

// Action creators
export const setCheckArray = (array) => ({
  type: SET_LENGTH,
  len: array.len,
  check: array,
});

export const setLength = (len) => (dispatch) => {
  const checkMas = new Array(len).fill(false);
  AsyncStorage.getItem('checked').then(res => {
    if (res && JSON.parse(res).length > 0) {
      let reslen = JSON.parse(res).length;
      dispatch({
        type: SET_LENGTH,
        len,
        check: JSON.parse(res),
      })
    } else {
      AsyncStorage.setItem('checked', JSON.stringify(checkMas))
      dispatch({
        type: SET_LENGTH,
        len,
        check: checkMas,
      })
    }
  });
};

export const setCheck = (index) => (dispatch, getState) => {
  const newState = getState().getIn(['liveWorkout', 'check']).map((value, ind) => {
    if (ind === index) {
      return !value;
    }
    return value;
  });
  AsyncStorage.setItem('checked', JSON.stringify(newState));
  dispatch({
    type: SET_CHECK,
    newState,
  });
};

export const clearCheck = () => (dispatch, getState) => {
  const size = getState().getIn(['liveWorkout', 'check']).length;
  let checkMas = getState().getIn(['liveWorkout', 'check']);
  for (let i = 0; i < size; i ++) {
    checkMas[i] = false;
  }
  AsyncStorage.setItem('checked', JSON.stringify(checkMas));
  dispatch({
    type: CLEAR_CHECK,
    checkMas,
  });
};

export const showWindowFinish = (show) => dispatch => {
  AsyncStorage.setItem('showWindowFinish', JSON.stringify(show))
  .then(() => {
    if (show) {
      StatusBar.setBackgroundColor('rgba(0,0,0,.3)', true)
    }
  })
  .catch(e => console.warn('error in SHOW_WINDOW: ', e));
  dispatch({
    type: SHOW_WINDOW,
    show: show,
  })
};

export const setWindowFinishVisible = () => (dispatch) => {
  AsyncStorage.getItem('showWindowFinish').then(visible => {
    if (visible && JSON.parse(visible)) {
      parsedVisible = JSON.parse(visible);
      StatusBar.setBackgroundColor('rgba(0,0,0,.3)', true);
      dispatch({
        type: SHOW_WINDOW,
        show: parsedVisible,
      });
    }
  })
};


// Reducer
export default function LiveWorkoutStateReducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_LENGTH: {
      return state
        .set('len', action.len)
        .set('check', action.check);
    }

    case SET_CHECK: {
      return state.set('check', action.newState);
    }

    case CLEAR_CHECK: {
      return state.set('check', action.checkMas);
    }

    case SHOW_WINDOW: {
      return state.set('show', action.show);
    }

    default:
      return state;
  }
};
