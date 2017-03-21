
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
  state={
      intensityScoreText: '',
      focusScoreText: '',
      comments: '',
  }

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
              <View style={styles.viewTextScore}>
                <Text style={styles.textIntensityScore}>
                  Perceived Intensity Score/PRE:
                </Text>
              </View>
              <TextInput
                style={styles.inputTextScore}
                onChangeText={(text) => this.setState({intensityScoreText: text})}
                value={this.state.intensityScoreText}
                maxLength={2}
                keyboardType="numeric"
              />
            </View>
            <View style={styles.viewFocusScore}>
              <View style={styles.viewTextScore}>
                <Text style={styles.textIntensityScore}>
                  Perceived Focus Score:
                </Text>
              </View>
              <TextInput
                style={styles.inputTextScore}
                onChangeText={(text) => this.setState({focusScoreText: text})}
                value={this.state.focusScoreText}
                maxLength={2}
                keyboardType="numeric"
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
  viewIntensityScore: {
    width: (width - 60),
    marginTop: 30,
    marginLeft: 30,
    // paddingHorizontal: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  viewFocusScore: {
    width: (width - 60),
    marginTop: 30,
    marginLeft: 30,
    // paddingHorizontal: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textIntensityScore: {
    color: 'white',
    fontSize: 19,
    fontWeight: '600',
  },
  viewTextScore: {
    justifyContent: 'center',
  },
  inputTextScore: {
    height: 30,
    width: 60,
    textAlign: 'center',
    backgroundColor: '#ededed',
    borderColor: '#696969',
    borderWidth: 3,
  },
});

export default BeginWorkoutFinishWindow;
