import {Map} from 'immutable';
import {loop, Effects} from 'redux-loop';
// import {generateRandomNumber} from '../../services/randomNumberService';
import {setLength} from '../BeginWorkout/BeginWorkoutState';
import * as auth0 from '../../services/auth0';

// Initial state
const initialState = Map({
  nextWorkoutTree: {
  "_id": "",
  "athleteId": "",
  "athleteProgramId": null,
  "athleteWorkoutId": null,
  "workoutDate": "",
  "intensityScore": null,
  "goal": "",
  "description": "",
  "isComplete": null,
  "completedDateTime": null,
  "isRestDay": null,
  "sentForCompletion": null,
  "workoutResult": null,
  "liveWorkoutComponents": [
    {
      "_id": null,
      "WorkoutId": null,
      "Exercise": {
        "_id": null,
        "name": "",
        "mainMuscle": "",
        "otherMuscles": null,
        "Force": null,
        "ExperienceLevel": null,
        "MechanicsType": null,
        "Equipment": null,
        "Sport": null,
        "Type": null,
        "VideoUrl": null,
        "IsCustom": null,
        "CustomTenant": null,
        "Guide": null
      },
      "notes": "",
      "superSetParent": null,
      "completedSet": [],
      "completedSets": [],
      "sets": null
    },
  ]
},
  loading: false,
  timerValue: 0,
  timerId: 'liveWorkoutTimer'
});

// Actions
const TIMER_INCREMENT = 'CounterState/TIMER_INCREMENT';
const TIMER_RESET = 'CounterState/TIMER_RESET';
const GET_WORKOUT_TREE = 'CounterState/GET_WORKOUT_TREE';

// Action creators
export const getWorkoutTree = () => (dispatch, getState) => {
  const token = getState().getIn(['auth', 'authenticationToken', 'idToken'])
  fetch('https://strivermobile-api.herokuapp.com/api/nextworkout',{
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + token
    }
  })
  .then((response) => {
    if ((response.status == 401) && (response.ok == false)  && (response._bodyText === 'Unauthorized', '\\n')) {
      auth0.showLogin()
        .catch(e => console.log('error in showLogin()', e))
    }
    return response.json();
  })
  .then((responseJson) => {
    dispatch(({
      type: GET_WORKOUT_TREE,
      response: responseJson,
    }))
    dispatch(setLength(responseJson.liveWorkoutComponents.length))
  })
  .catch((e) => {
    console.log('error in getWorkoutTree(): ', e);
  });



}

export function timerIncrement() {
  return {type: TIMER_INCREMENT};
}

export function timerReset() {
  return {type: TIMER_RESET};
}

// Reducer
export default function CounterStateReducer(state = initialState, action = {}) {
  switch (action.type) {
    case TIMER_INCREMENT:
      return state.update('timerValue', timerValue => timerValue + 1);

    case TIMER_RESET:
      return state.update('timerValue', timerValue => 0);

    case GET_WORKOUT_TREE: {
          return state
            .set('nextWorkoutTree', action.response);
    }

    default:
      return state;
  }
}
