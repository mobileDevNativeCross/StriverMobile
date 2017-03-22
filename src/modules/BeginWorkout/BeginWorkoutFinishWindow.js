
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
  ScrollView,
  AsyncStorage,
} from 'react-native';
import Display from 'react-native-display';
import NavButton from '../../components/NavButton';
import moment from 'moment';
import BackgroundTimer from 'react-native-background-timer';
import * as CounterState from '../counter/CounterState';

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

  handleFinishPress = () => {
    let gotEndWorkoutTime = moment().format("YYYY-DD-MM[T]HH:mm:ss");
    this.setState({windowFinishVisible : !this.state.windowFinishVisible});
    BackgroundTimer.clearInterval(this.liveWorkoutTimer);
    let resultObject = JSON.stringify({
      "athleteId": this.props.nextWorkoutTree.athleteId, //athlete user ID  (guid)
      "athleteWorkoutId": this.props.nextWorkoutTree.athleteWorkoutId, //grab from workout
      "athleteProgramId": this.props.nextWorkoutTree.athleteProgramId, //grab from workout
      "PerceivedIntensityScore": this.state.intensityScoreText, //scaled 1-10
      "PerceivedFocusScore": this.state.focusScoreText, //scaled 1-10
      "Notes": this.state.comments, //string
      "StartTime": this.props.beginWorkoutTime, //start of timer
      "EndTime": gotEndWorkoutTime, //end of timer
    });
    console.log('sending next object: ', JSON.parse(resultObject));
      fetch('https://strivermobile-api.herokuapp.com/api/workoutcomplete',{
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + this.props.nextWorkoutToken + 1,
          'Content-Type': 'application/json',
        },
        body: resultObject
      })
      .then((response) => {
        if (response.status === 200 && response.ok === true) {
          this.props.popToStartScreen('RequestFine')
        } else {
          AsyncStorage.setItem('resultObject', resultObject); // FINISH Error way (second request try and AsyncStorage saving)
          console.log('There is something wrong. Server response: ', response);
          AsyncStorage.getItem('resultObject') //*** NOT NESCESSARY LINE OF CODE (just for checking 'resultObject' key in AsyncStorage)
            .then((value) => { //*** NOT NESCESSARY, for checking
              console.log('Cashing workout next result object in AsyncStorage: ', JSON.parse(value)) //*** NOT NESCESSARY, for checking
              console.log('POST request reattempt');
              fetch('https://strivermobile-api.herokuapp.com/api/workoutcomplete',{
                method: 'POST',
                headers: {
                  'Authorization': 'Bearer ' + this.props.nextWorkoutToken,
                  'Content-Type': 'application/json',
                },
                body: resultObject
              })
              .then((secondResponse) => {
                if (secondResponse.status === 200 && secondResponse.ok === true) {
                  this.props.popToStartScreen('RequestFine')
                } else {
                  console.log('Reattempt failed. Second server response: ', secondResponse);
                }
              })
              .catch(error => console.log('error in reattempt POST request: ', error));
            }) //*** NOT NESCESSARY, for checking
            .catch(error => console.log('error AsyncStorage.getItem(\'resultObject\'): ', error)); //*** NOT NESCESSARY, for checking

        }
      })
      .catch((e) => {
        AsyncStorage.setItem('resultObject', resultObject);
        console.log('error in first POST request: ', e);
      });
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
              <View style={styles.viewInputScore}>
                <TextInput
                  style={styles.inputTextScore}
                  onChangeText={(text) => this.setState({intensityScoreText: text})}
                  value={this.state.intensityScoreText}
                  maxLength={2}
                  keyboardType="numeric"
                  underlineColorAndroid="transparent"
                />
              </View>
            </View>
            <View style={styles.viewFocusScore}>
              <View style={styles.viewTextScore}>
                <Text style={styles.textIntensityScore}>
                  Perceived Focus Score:
                </Text>
              </View>
              <View style={styles.viewInputScore}>
                <TextInput
                  style={styles.inputTextScore}
                  onChangeText={(text) => this.setState({focusScoreText: text})}
                  value={this.state.focusScoreText}
                  maxLength={2}
                  keyboardType="numeric"
                  underlineColorAndroid="transparent"
                />
              </View>
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
                underlineColorAndroid="transparent"
              />
            </View>
            <View style={styles.viewTime}>
              <Text style={styles.textIntensityScore}>
                Time: {this.getCurrentTimerValue()}
              </Text>
            </View>
            <View style={styles.viewFinishButton}>
              <TouchableOpacity style={styles.touchOpacityFinish} onPress={() => {this.handleFinishPress()}}>
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
    width: (width - 120),
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
  viewInputScore: {
    justifyContent: 'center',
  },
});

export default BeginWorkoutFinishWindow;
