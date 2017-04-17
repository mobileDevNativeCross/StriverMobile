import {fromJS} from 'immutable';

import { NavigationExperimental, AsyncStorage } from 'react-native';

const {StateUtils: NavigationStateUtils} = NavigationExperimental;

// Actions
const PUSH_ROUTE = 'NavigationState/PUSH_ROUTE';
const POP_ROUTE = 'NavigationState/POP_ROUTE';
const GET_PREV_NAVIGAION_STATE = 'NavigationState/GET_PREV_NAVIGAION_STATE';
const FIRSTPAGE_ROUTE = 'NavigationState/FIRSTPAGE_ROUTE';

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
  // console.warn('getting previous state from storage');
  // fixing a bug with not saving current Scene
  // AsyncStorage.getItem('storageNavigationState')
  //   .then(prevState => {
  //     // console.warn('got prevState: ' +  JSON.stringify(JSON.parse(prevState), null, 2));
  //     if (prevState) {
  //       dispatch ({
  //         type: GET_PREV_NAVIGAION_STATE,
  //         prevState,
  //       });
  //     }
  //   })
  //   .catch(e => {console.warn('error in NavigationReducer - GET_PREV_NAVIGAION_STATE: ', e);})
}

export function firstPageRoute() {
  return {
    type: FIRSTPAGE_ROUTE,
    initialState,
  };
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
      // console.warn('\n\nroute: ', route, '\n\ntabs: ', tabs, '\n\ntabKey: ', tabKey, '\n\nscenes', scenes, '\n\nnextScenes: ', nextScenes );
      if (scenes !== nextScenes) {
        setNewState = state.set(tabKey, fromJS(nextScenes));
        AsyncStorage.setItem('storageNavigationState', JSON.stringify(setNewState))
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
        return state.set(tabKey, fromJS(nextScenes));
      }
      return state;
    }

    case GET_PREV_NAVIGAION_STATE: {
      // fixing a bug with not saving current Scene
      // console.warn('action.prevState', action.prevState);
          return state
            .set('tabs', action.prevState.tabs)
            .set('HomeTab', action.prevState.HomeTab)
            .set('LiveWorkout', action.prevState.LiveWorkout)
            .set('History', action.prevState.History);

      // return initialState;
    }

    case FIRSTPAGE_ROUTE: {
      return initialState;
    }

    default:
      return state;
  }
}
