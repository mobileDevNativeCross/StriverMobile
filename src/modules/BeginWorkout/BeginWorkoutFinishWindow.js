
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
} from 'react-native';

class BeginWorkoutFinishWindow extends Component {
  render() {
    const { modalFinishVisible, setModalFinishVisible } = this.props;
    return (
      <Modal
        animationType="fade"
        visible={modalFinishVisible}
        style={styles.modal}
        bacgroundColor={'rgba(0,0,0,0.3)'}
        // transparent={true}
      >
        <View style={styles.container}>
          <Text onPress={() => {setModalFinishVisible()}}>
            Welcome to React Native!
          </Text>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
});

export default BeginWorkoutFinishWindow;
