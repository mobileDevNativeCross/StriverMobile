import {
    Map,
    fromJS
} from 'immutable';
import * as HomeState from '../Home/HomeState';
import { AsyncStorage } from 'react-native';

//initial state
const initialState = Map({
    isLoggedIn: false,
    currentUser: null,
    authenticationToken: null
});

//actions
const USER_LOGIN_SUCCESS = 'AuthState/USER_LOGIN_SUCCESS';
const USER_LOGIN_ERROR = 'AuthState/USER_LOGIN_ERROR';
const SET_WRONG_TOKEN = 'AuthState/SET_WRONG_TOKEN'; //for old token debugging

export function onUserLoginSuccess(profile, token) {
  return (dispatch) => {
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: {
        profile: fromJS(profile),
        token: fromJS(token)
      }
    });
    AsyncStorage.setItem('currentToken', JSON.stringify(fromJS(token)));
    dispatch(HomeState.getWorkoutTree());
  };
}

export function onUserLoginError(error) {
    return {
        type: USER_LOGIN_ERROR,
        payload: error,
        error: true
    }
}

//This function is for old token debugging
export function setWrongToken() {
    return {
        type: SET_WRONG_TOKEN,
    }
}

//reducer
export default function AuthStateReducer(state = initialState, action = {}) {
    switch (action.type) {
        case USER_LOGIN_SUCCESS:
            return state
                .set('isLoggedIn', true)
                .set('currentUser', action.payload.profile)
                .set('authenticationToken', action.payload.token);
        case USER_LOGIN_ERROR:
            return initialState;
        // This reducer is for old token debugging
        case SET_WRONG_TOKEN:
            return state
                .set('authenticationToken', {'tokenType': 'bearer', 'accessToken': 'x4FiU4nZWCp9GCs3', 'idToken': 'oldTokenSimulation'}); // instead of 'oldTokenSimulation' was 'test2'
        default:
            return state;
    }
}
