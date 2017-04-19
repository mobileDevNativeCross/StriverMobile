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
        default:
            return state;
    }
}
