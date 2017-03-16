import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

class BeginWorkout extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>
          Welcome to React Native!
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BeginWorkout;
