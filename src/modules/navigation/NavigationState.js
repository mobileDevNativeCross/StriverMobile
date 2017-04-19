import {fromJS} from 'immutable';

import { NavigationExperimental, AsyncStorage } from 'react-native';

const {StateUtils: NavigationStateUtils} = NavigationExperimental;

// Actions
const PUSH_ROUTE = 'NavigationState/PUSH_ROUTE';
const POP_ROUTE = 'NavigationState/POP_ROUTE';
const GET_PREV_NAVIGAION_STATE = 'NavigationState/GET_PREV_NAVIGAION_STATE';
const FIRSTPAGE_ROUTE = 'NavigationState/FIRSTPAGE_ROUTE';
const CHECK_ISREADY = 'NavigationState/CHECK_ISREADY';

// reducers for tabs and scenes are separate
const initialState = fromJS({
  tabs: {
    index: 0,
    routes: [
      {key: 'HomeTab', title: 'HOME'},
      {key: 'LiveWorkout', title: 'WORKOUT'},
      {key: 'History', title: 'HISTORY'},
    ],
  },
  // Scenes for the `HomeTab` tab.
  HomeTab: {
    index: 0,
    routes: [{key: 'home', title: 'Home Screen'}],
  },
  LiveWorkout: {
    index: 0,
    routes: [{key: 'liveWorkout', title: 'LiveWorkout Screen'}],
  },
  History: {
    index: 0,
    routes: [{key: 'history', title: 'History Screen'}],
  },
  isReady: false,
});

// Action creators
export const pushRoute = (route) => (dispatch, getState) => {
  const state = getState().get('navigationState');
  const tabs = state.get('tabs');
  const tabKey = tabs.getIn(['routes', tabs.get('index')]).get('key');
  const scenes = state.get(tabKey).toJS();
  let nextScenes;
  try {
    nextScenes = NavigationStateUtils.push(scenes, route);
  } catch (e) {
    nextScenes = scenes;
  }
  if (scenes !== nextScenes) {
    AsyncStorage.setItem('storageNavigationState', JSON.stringify(nextScenes))
      .catch(e => {console.warn('error in NavigationReducer - PUSH_ROUTE: ', e);})
    dispatch({
      type: PUSH_ROUTE,
      tabKey,
      nextScenes,
    });
  }
}

export const popRoute = () => (dispatch, getState) => {
  // Pops a route from the scenes stack.
  const state = getState().get('navigationState');
  const tabs = state.get('tabs');
  const tabKey = tabs.getIn(['routes', tabs.get('index')]).get('key');
  const scenes = state.get(tabKey).toJS();
  const nextScenes = NavigationStateUtils.pop(scenes);
  if (scenes !== nextScenes) {
    AsyncStorage.setItem('storageNavigationState', JSON.stringify(nextScenes))
      .catch(e => {console.warn('error in NavigationReducer - POP_ROUTE: ', e);})
    dispatch({
      type: POP_ROUTE,
      tabKey,
      nextScenes,
    });
  }
}

export const getPrevNavigationState = () => dispatch => {
  AsyncStorage.getItem('storageNavigationState')
    .then(prevState => {
      if (prevState) {
        parsedState = JSON.parse(prevState);
        dispatch ({
          type: GET_PREV_NAVIGAION_STATE,
          prevState: parsedState,
        });
      }
      dispatch({
        type: CHECK_ISREADY,
      })
    })
    .catch(e => {console.warn('error in NavigationReducer - GET_PREV_NAVIGAION_STATE: ', e);})
}

export function firstPageRoute() {
  return {type: FIRSTPAGE_ROUTE};
}

export default function NavigationReducer(state = initialState, action) {
  switch (action.type) {
    case PUSH_ROUTE: {
      return state.set(action.tabKey, fromJS(action.nextScenes));
    }

    case POP_ROUTE: {
      console.warn('POP_ROUTE');
      return state.set(action.tabKey, fromJS(action.nextScenes));
    }

    case GET_PREV_NAVIGAION_STATE: {
      return state
        .set('HomeTab', fromJS(action.prevState));
    }

    case CHECK_ISREADY: {
      return state.set('isReady', true);
    }

    case FIRSTPAGE_ROUTE: {
      const initState = initialState.get('HomeTab');
      AsyncStorage.setItem('storageNavigationState', JSON.stringify(initState))
        .catch(e => {console.warn('error in NavigationReducer - FIRST_PAGE_ROUTE: ', e);})
      return state.set('HomeTab', initState);
    }

    default:
      return state;
  }
}
