import React, {PropTypes} from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  StatusBar,
  Platform,
  AsyncStorage,
  Dimensions
} from 'react-native';

import NavigationViewContainer from './navigation/NavigationViewContainer';
import * as auth0 from '../services/auth0';
import * as NavigationState from './navigation/NavigationState';
import store from '../redux/store';
import DeveloperMenu from '../components/DeveloperMenu';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const AppView = React.createClass({
  propTypes: {
    isReady: PropTypes.bool.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    containerGetPrevNavigationState: PropTypes.func.isRequired,
  },

  componentDidMount() {
    this.props.containerGetPrevNavigationState();
    const {dispatch} = this.props;
    AsyncStorage.getItem('currentToken')
    .then(token => {
      if (!token) {
        auth0.showLogin();
      } else {
        console.log('checking old token');
      }
    })
    .catch(e => {console.warn('error in getItem(\'newToken\')',e)})
  },

  render() {
    return (
      <View style={styles.container}>
        {
          this.props.isReady
          ?
            <View style={styles.container}>
              <StatusBar
                barStyle="dark-content"
                backgroundColor={'white'}
                translucent={true}
              />
              <NavigationViewContainer />
              {__DEV__ && <DeveloperMenu />}
            </View>
          :
            <View style={styles.centered}>
              <ActivityIndicator size={Platform.OS === 'android' ? 25 : "large"}/>
            </View>
        }
      </View>
    );
  }
});

const styles = StyleSheet.create({
  centered: {
    width,
    height,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    width,
    height,
  },
});

export default AppView;
