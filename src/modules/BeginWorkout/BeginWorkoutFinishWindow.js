
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
import Display from 'react-native-display';
import NavButton from '../../components/NavButton';


const { width, height } = Dimensions.get('window');

class BeginWorkoutFinishWindow extends Component {
  getHeight = () => {
    if (this.props.modalFinishVisible) {
      return height;
    }
    return 0;
  }
  render() {
    const { modalFinishVisible, setModalFinishVisible } = this.props;
    return (
      <View style={{ position: 'absolute', width, height: this.getHeight()  }}>
        <Display
          enable = {this.props.modalFinishVisible}
          enterDuration = {500}
          exitDuration = {250}
          exit = "fadeOut"
          enter = "fadeIn"
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
        </Display>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width,
    height,
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  viewFinish: {
    paddingTop: Platform.OS === 'android' ? 0 : 25,
    backgroundColor: '#a3a3a3',
  },
});

export default BeginWorkoutFinishWindow;
