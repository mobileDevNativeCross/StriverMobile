import React, {Component} from 'react';
import {
  View,
  Text,
} from 'react-native';

import HistoryState from './HistoryState';
import styles from './HistoryStyle';

class History extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>
          History Page
        </Text>
      </View>
    );
  }
}

export default History;
