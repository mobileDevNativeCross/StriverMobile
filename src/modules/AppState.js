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
    // AsyncStorage.getItem('currentToken')
    //   .then(token => {
    //     console.warn('token in reducer: ', token);
    //     if (token) {
          dispatch({
            type: SET_CURRENT_TOKEN_TO_REDUX,
            setToken: token,
          })
      //   }
      // })
      // .catch(e => {console.warn('error in getItem(\'newToken\') in reducer', e)})
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
// import {Map} from 'immutable';
// import {setLength} from '../LiveWorkout/LiveWorkoutState';
// import * as auth0 from '../../services/auth0';
// import { AsyncStorage } from 'react-native';
//
// // Initial state
// const initialState = Map({
//   checkEnter: true,
//   nextWorkoutTree: {},
//   loading: false,
//   timerValue: 0,
//   timerId: 'liveWorkoutTimer'
// });
//
// // Actions
// const TIMER_INCREMENT = 'HomeState/TIMER_INCREMENT';
// const TIMER_RESET = 'HomeState/TIMER_RESET';
// const GET_WORKOUT_TREE = 'HomeState/GET_WORKOUT_TREE';
// const CHECK_ENTER = 'HomeState/CHECK_ENTER';
//
// // Action creators
// export const getWorkoutTree = () => (dispatch, getState) => {
//   const token = getState().getIn(['auth', 'authenticationToken', 'idToken'])
//   fetch('https://strivermobile-api.herokuapp.com/api/nextworkout',{
//     method: 'GET',
//     headers: {
//       'Authorization': 'Bearer ' + token
//     }
//   })
//   .then((response) => {
//     if ((response.status == 401) && (response.ok == false)  && (response._bodyText === 'Unauthorized', '\\n')) {
//       auth0.showLogin()
//         .catch(e => console.log('error in showLogin()', e))
//     }
//     return response.json();
//   })
//   .then((responseJson) => {// chnge to setWorkoutTree action
//     dispatch(({
//       type: GET_WORKOUT_TREE,
//       response: responseJson,
//     }))
//     AsyncStorage.setItem('workoutTree', JSON.stringify(responseJson));
//     dispatch(setLength(responseJson.liveWorkoutComponents.length));
//   })
//   .catch((e) => {
//     console.log('error in getWorkoutTree(): ', e);
//   });
// }
//
// export function setWorkoutTree(workoutTree) {
//   return {
//     type: GET_WORKOUT_TREE,
//     response: workoutTree,
//   }
// }
//
// export function checkEnter(checkEnter) {
//   return {
//     type: CHECK_ENTER,
//     checkEnter: checkEnter,
//   };
// }
//
// // Reducer
// export default function HomeStateReducer(state = initialState, action = {}) {
//   switch (action.type) {
//
//     case GET_WORKOUT_TREE: {
//       return state
//         .set('nextWorkoutTree', action.response);
//     }
//
//     case CHECK_ENTER: {
//       return state
//         .set('checkEnter', action.checkEnter);
//     }
//
//     default:
//       return state;
//   }
// }
