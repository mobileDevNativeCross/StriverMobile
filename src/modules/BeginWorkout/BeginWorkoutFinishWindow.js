
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Dimensions,
  TouchableOpacity,
  Platform,
  TextInput,
} from 'react-native';

const { width, height } = Dimensions.get('window');

class BeginWorkoutFinishWindow extends Component {
  render() {
    const { modalFinishVisible, setModalFinishVisible } = this.props;
    return (
      <Modal
        animationType="fade"
        visible={modalFinishVisible}
        transparent={true}
      >
        <TouchableOpacity onPress={() => {setModalFinishVisible()}} style={styles.container}>
        </TouchableOpacity>
        <View style={styles.viewFinish}>
          <View style={styles.viewIntensityScore}>
            <Text>
              Perceived Intensity Score/PRE:
            </Text>
            <TextInput
              // style={}
            />
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width,
    height,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  viewFinish: {
    paddingTop: Platform.OS === 'android' ? 0 : 25,
    backgroundColor: '#a3a3a3',
  },
});

export default BeginWorkoutFinishWindow;
