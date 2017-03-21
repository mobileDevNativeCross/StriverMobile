
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

  getCurrentTimerValue = () => {
    let currentTimerValue = this.props.currentTimerValue;
    const sec = (currentTimerValue % 60);
    let min = (currentTimerValue - sec) / 60;
    if (min<=0) {
      const showTime = `${sec} seconds`;
      return showTime;
    }
    if (min>=60) {
      min_left = (min % 60);
      const hour = ((min - min_left) / 60);
      const showTime = `${hour} hour ${min_left} minutes ${sec} seconds`;
      return showTime;
    }
    const showTime = `${min} minutes ${sec} seconds`;
    return showTime;
  }

  getHeight = () => {
    if (this.props.windowFinishVisible) {
      return height;
    }
    return 0;
  }
  render() {
    const { windowFinishVisible, setWindowFinishVisible, currentTimerValue } = this.props;
    return (
      <View style={{ position: 'absolute', width, height: this.getHeight()  }}>
        <Display
          enable = {windowFinishVisible}
          enterDuration = {500}
          exitDuration = {250}
          exit = "fadeOut"
          enter = "fadeIn"
        >
        <View style={styles.container} />
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
            <View style={styles.viewComments}>
              <View>
                <Text style={styles.textIntensityScore}>
                  Comments:
                </Text>
              </View>
              <TextInput
                style={styles.inputTextComments}
                onChangeText={(text) => this.setState({comments: text})}
                value={this.state.comments}
                multiline
              />
            </View>
            <View style={styles.viewTime}>
              <Text style={styles.textIntensityScore}>
                Time: {this.getCurrentTimerValue()}
              </Text>
            </View>
            <View style={styles.viewFinishButton}>
              <TouchableOpacity style={styles.touchOpacityFinish}>
                <Text style={styles.textFinish}>
                  Finish
                </Text>
              </TouchableOpacity>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  viewFocusScore: {
    width: (width - 60),
    marginTop: 10,
    marginLeft: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textIntensityScore: {
    color: '#ececec',
    fontSize: 18,
    fontWeight: '700',
  },
  viewTextScore: {
    justifyContent: 'center',
  },
  inputTextScore: {
    height: 30,
    fontSize: 19,
    width: 60,
    textAlign: 'center',
    backgroundColor: '#ededed',
    borderColor: '#696969',
    borderWidth: 3,
  },
  viewComments: {
    flexDirection: 'row',
    width: (width - 60),
    marginTop: 10,
    marginLeft: 30,
  },
  inputTextComments: {
    marginLeft: 10,
    paddingLeft: 5,
    backgroundColor: '#ededed',
    borderColor: '#696969',
    borderWidth: 3,
    flex: 1,
    height: 120,
    fontSize: 19,
  },
  viewTime: {
    marginTop: 10,
    marginLeft: 30,
  },
  touchOpacityFinish: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    borderRadius: 2,
  },
  textFinish: {
    color: '#5d5d5d',
    fontSize: 15,
    fontWeight: '600',
    backgroundColor: 'transparent',
  },
  viewFinishButton: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
  },
});

export default BeginWorkoutFinishWindow;
