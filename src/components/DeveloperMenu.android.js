import React from 'react';
import * as auth0 from '../services/auth0';
import store from '../redux/store';//for old token debugging
import * as AppStateActions from '../modules/AppState';//for old token debugging

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

/**
 * Simple developer menu, which allows e.g. to clear the app state.
 * It can be accessed through a tiny button in the bottom right corner of the screen.
 * ONLY FOR DEVELOPMENT MODE!
 */
const DeveloperMenu = React.createClass({
  displayName: 'DeveloperMenu',

  getInitialState() {
    return {visible: false};
  },
  showDeveloperMenu() {
    this.setState({isVisible: true});
  },
  async showLogin() {
    await auth0.showLogin();
    this.closeMenu();
  },
  async setWrongToken() {//for old token debugging
    store.dispatch(AppStateActions.setWrongToken());//for old token debugging
    this.closeMenu();//for old token debugging
  },//for old token debugging
  closeMenu() {
    this.setState({isVisible: false});
  },

  renderMenuItem(text, onPress) {
    return (
      <TouchableOpacity
        key={text}
        onPress={onPress}
        style={styles.menuItem}
        >
        <Text style={styles.menuItemText}>{text}</Text>
      </TouchableOpacity>
    );
  },

  render() {
    if (!__DEV__) {
      return null;
    }

    if (!this.state.isVisible) {
      return (
        <TouchableOpacity
        style={styles.circle}
        onPress={this.showDeveloperMenu}
        />
      );
    }

    const buttons = [
      this.renderMenuItem('Show login', this.showLogin),
      this.renderMenuItem('Set wrong token ', this.setWrongToken),//for old token debugging
      this.renderMenuItem('Cancel', this.closeMenu)
    ];

    return (
      <View style={styles.menu}>
        {buttons}
      </View>
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
  },
  menu: {
    backgroundColor: 'white',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0
  },
  menuItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    padding: 10,
    height: 60
  },
  menuItemText: {
    fontSize: 20
  }
});

export default DeveloperMenu;
