import * as CounterState from './CounterState';
import * as NavigationState from '../../modules/navigation/NavigationState';
import React, {PropTypes} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  View
} from 'react-native';

const CounterView = React.createClass({
  propTypes: {
    /*counter: PropTypes.number.isRequired,*/
    /*userName: PropTypes.string,*/
    /*userProfilePhoto: PropTypes.string,*/
    dispatch: PropTypes.func.isRequired
  },

  bored() {
    this.props.dispatch(NavigationState.pushRoute({
      key: 'Color',
      title: 'Color Screen'
    }));
  },
/*
  renderUserInfo() {
    if (!this.props.userName) {
      return null;
    }

    return (
      <View style={styles.userContainer}>
        <Image
          style={styles.userProfilePhoto}
          source={{
            uri: this.props.userProfilePhoto,
            width: 80,
            height: 80
          }}
        />
        <Text style={styles.linkButton}>
          Welcome, {this.props.userName}!
        </Text>
      </View>
    );
  },
*/
  render() {

    return (
      <View style={styles.container}>

        <TouchableOpacity onPress={this.bored} accessible={true}>
          <Text style={styles.linkButton}>
            {'I\'m bored!'}
          </Text>
        </TouchableOpacity>

      </View>
    );
  }
});

const circle = {
  borderWidth: 0,
  borderRadius: 40,
  width: 80,
  height: 80
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgreen'
  },
/*
  userContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
*//*
  userProfilePhoto: {
    ...circle,
    alignSelf: 'center'
  },
*/
  welcome: {
    textAlign: 'center',
    color: 'black',
    marginBottom: 5,
    padding: 5
  },
  linkButton: {
    textAlign: 'center',
    color: '#CCCCCC',
    marginBottom: 10,
    padding: 5
  }
});

export default CounterView;
