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
export function pushRoute(route) {
  return {
    type: PUSH_ROUTE,
    payload: route
  };
}

export function popRoute() {
  return {type: POP_ROUTE};
}

export const getPrevNavigationState = () => dispatch => {
  // fixing a bug with not saving current Scene
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
      // Push a route into the scenes stack.
      const route = action.payload;
      const tabs = state.get('tabs');
      const tabKey = tabs.getIn(['routes', tabs.get('index')]).get('key');
      const scenes = state.get(tabKey).toJS();
      let nextScenes;
      // fixes issue #52
      // the try/catch block prevents throwing an error when the route's key pushed
      // was already present. This happens when the same route is pushed more than once.
      try {
        nextScenes = NavigationStateUtils.push(scenes, route);
      } catch (e) {
        nextScenes = scenes;
      }
      // // fixing a bug with not saving current Scene
      if (scenes !== nextScenes) {
        setNewState = state.set(tabKey, fromJS(nextScenes));
        AsyncStorage.setItem('storageNavigationState', JSON.stringify(nextScenes))
          .catch(e => {console.warn('error in NavigationReducer - PUSH_ROUTE: ', e);})
        return setNewState;
      }
      return state;
    }

    case POP_ROUTE: {
      // Pops a route from the scenes stack.
      const tabs = state.get('tabs');
      const tabKey = tabs.getIn(['routes', tabs.get('index')]).get('key');
      const scenes = state.get(tabKey).toJS();
      const nextScenes = NavigationStateUtils.pop(scenes);
      if (scenes !== nextScenes) {
        setNewState = state.set(tabKey, fromJS(nextScenes));
        AsyncStorage.setItem('storageNavigationState', JSON.stringify(nextScenes))
          .catch(e => {console.warn('error in NavigationReducer - POP_ROUTE: ', e);})
        return setNewState;
      }
      return state;
    }

    case GET_PREV_NAVIGAION_STATE: {
      // fixing a bug with not saving current Scene
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
