import React from 'react';
import * as snapshot from '../utils/snapshot';
import * as auth0 from '../services/auth0';
import store from '../redux/store';//for old token debugging
import * as AuthStateActions from '../modules/auth/AuthState';//for old token debugging


import {
  TouchableOpacity,
  ActionSheetIOS,
  StyleSheet
} from 'react-native';

/**
 * Simple developer menu, which allows e.g. to clear the app state.
 * It can be accessed through a tiny button in the bottom right corner of the screen.
 * ONLY FOR DEVELOPMENT MODE!
 */
const DeveloperMenu = React.createClass({
  displayName: 'DeveloperMenu',

  showDeveloperMenu() {
    const options = {
      clearState: 0,
      showLogin: 1,
      setWrongToken: 2, //for old token debugging
      cancel: 3 //put 2 insted of 3 when token debugging finish
    };

    const callback = async index => {
      if (index === options.clearState) {
        await snapshot.clearSnapshot();
        console.warn('(╯°□°）╯︵ ┻━┻ \nState cleared, Cmd+R to reload the application now');
      }
      else if (index === options.showLogin) {
        await auth0.showLogin();
      }
      else if (index === options.setWrongToken) { //for old token debugging
        store.dispatch(AuthStateActions.setWrongToken());//for old token debugging
      } //for old token debugging
    };

    ActionSheetIOS.showActionSheetWithOptions({
      options: [
        'Clear state',
        'Show login',
        'Set wrong token', //for old token debugging
        'Cancel'
      ],
      cancelButtonIndex: options.cancel
    }, callback);
  },

  render() {
    if (!__DEV__) {
      return null;
    }

    return (
      <TouchableOpacity
        style={styles.circle}
        onPress={this.showDeveloperMenu}
        />
    );
  }
});

const styles = StyleSheet.create({
  circle: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#fff'
  }
});

export default DeveloperMenu;
