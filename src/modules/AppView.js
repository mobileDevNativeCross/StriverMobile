import React, {PropTypes} from 'react';
import {View, StyleSheet, ActivityIndicator, StatusBar, AsyncStorage} from 'react-native';

import NavigationViewContainer from './navigation/NavigationViewContainer';
import * as auth0 from '../services/auth0';
import * as snapshotUtil from '../utils/snapshot';
import * as SessionStateActions from '../modules/session/SessionState';
import store from '../redux/store';
import DeveloperMenu from '../components/DeveloperMenu';

const AppView = React.createClass({
  propTypes: {
    isReady: PropTypes.bool.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
  },
  componentDidMount() {
    const {dispatch} = this.props;
    AsyncStorage.getItem('currentToken')
    .then(token => {
      // console.warn(token);
      if (!token) {
        auth0.showLogin();
        // dispatch(SessionStateActions.initializeSessionState());
      } else {
        console.log('checking old token');
      }
    })
    .catch(e => {console.warn('error in getItem(\'newToken\')',e)})
    // snapshotUtil.resetSnapshot()
    //   .then(snapshot => {
    //     const {dispatch} = this.props;
    //     console.warn('snapshot',snapshot);
    //     if (snapshot) {
    //       dispatch(SessionStateActions.resetSessionStateFromSnapshot(snapshot));
    //     } else {
    //       dispatch(SessionStateActions.initializeSessionState());
    //     }
    //     store.subscribe(() => {
    //       snapshotUtil.saveSnapshot(store.getState());
    //     });
    //   })
    //   .catch(error => console.warn('snapshotUtil.resetSnapshot() error', error));
  },

  // componentWillReceiveProps({isReady, isLoggedIn}){
  //   if (!this.props.isReady) {
  //     if (isReady && !isLoggedIn) {
  //       auth0.showLogin();
  //     }
  //   }
  // },


  render() {
    // if (!this.props.isReady) {
    //   return (
    //     <View style={{flex: 1}}>
    //       <ActivityIndicator style={styles.centered}/>
    //     </View>
    //   );
    // }

    return (
      <View style={{flex: 1}}>
        <StatusBar
          barStyle="light-content"
          // backgroundColor={'red'}
          translucent={true}
        />
        <NavigationViewContainer />
        {__DEV__ && <DeveloperMenu />}
      </View>
    );
  }
});

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignSelf: 'center'
  }
});

export default AppView;
