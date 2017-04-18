import {Map} from 'immutable';
import {AsyncStorage} from 'react-native';

// Initial state
const initialState = Map({
  currentToken: null,
});

const wrongToken = {'tokenType': 'bearer', 'accessToken': 'x4FiU4nZWCp9GCs3', 'idToken': 'test2'};

// Actions
const SET_CURRENT_TOKEN_TO_REDUX = 'SET_CURRENT_TOKEN_TO_REDUX';
const SET_WRONG_TOKEN = 'AuthState/SET_WRONG_TOKEN'; //for old token debugging


// Action creators
export const setTokenToRedux = (token) => (dispatch) => {
  dispatch({
    type: SET_CURRENT_TOKEN_TO_REDUX,
    setToken: token,
  })
};

//This function is for old token debugging
export function setWrongToken() {
  return {
      type: SET_WRONG_TOKEN,
  }
}

// Reducer
export default function AppStateReducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_CURRENT_TOKEN_TO_REDUX:
      return state
        .set('currentToken', action.setToken);

    case SET_WRONG_TOKEN:
    AsyncStorage.setItem('currentToken', JSON.stringify(wrongToken))
        return state
            .set('currentToken', wrongToken);

    default:
      return state;
  }
}
