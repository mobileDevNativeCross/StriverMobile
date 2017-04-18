import 'es6-symbol/implement';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import AppViewContainer from './src/modules/AppViewContainer';
import React from 'react';
import {AppRegistry, BackAndroid} from 'react-native';
import * as NavigationStateActions from './src/modules/navigation/NavigationState';
import * as LiveWorkoutState from './src/modules/LiveWorkout/LiveWorkoutState';
import * as HomeState from './src/modules/Home/HomeState';

const StriverMobile = React.createClass({

  componentWillMount() {
    BackAndroid.addEventListener('hardwareBackPress', this.navigateBack);
  },

  navigateBack() {
    const navigationState = store.getState().get('navigationState');
    const tabs = navigationState.get('tabs');
    const tabKey = tabs.getIn(['routes', tabs.get('index')]).get('key');
    const currentTab = navigationState.get(tabKey);

    const checkEnter = store.getState().get('home').get('checkEnter');

    const currentTabIndex = currentTab.get('index');
    const currentTabKeyName = currentTab.getIn(['routes', currentTabIndex]).get('key');

    switch (currentTabKeyName) {
      case 'home':
        return false;
      case 'liveWorkout':
        return true;
      case 'history':
        store.dispatch(NavigationStateActions.firstPageRoute());
        break;
      default:

    }
    return true;
  },

  render() {
    return (
      <Provider store={store}>
        <AppViewContainer />
      </Provider>
    );
  }
});

AppRegistry.registerComponent('StriverMobile', () => StriverMobile);
