import {
    Map,
    fromJS
} from 'immutable';

//initial state
const initialState = Map({
    isLoggedIn: false,
    currentUser: null,
    authenticationToken: null
});

//actions

const USER_LOGIN_SUCCESS = 'AppState/USER_LOGIN_SUCCESS';
const USER_LOGIN_ERROR = 'AppState/USER_LOGIN_ERROR';


export function onUserLoginSuccess(profile, token) {
  console.log("token_from_authstate",JSON.stringify(token, null, 2)); //Login token is here!!
  console.log("token_from_authstate123123123",token)
    return {
        type: USER_LOGIN_SUCCESS,
        payload: {
            profile: fromJS(profile),
            token: fromJS(token)
        }
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
