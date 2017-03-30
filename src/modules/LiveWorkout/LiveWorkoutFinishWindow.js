
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
  KeyboardAvoidingView,
  NetInfo,
  Alert,
} from 'react-native';
import Display from 'react-native-display';
import BackgroundTimer from 'react-native-background-timer';
import moment from 'moment';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import preciseDiff from 'moment-precise-range-plugin';
import {
  MKTextField,
  MKColor,
  MKButton,
  mdl,
} from 'react-native-material-kit';

import NavButton from '../../components/NavButton';
import * as HomeState from '../Home/HomeState';
import { regular, bold, medium} from 'AppFonts';

const { width, height } = Dimensions.get('window');
const testConnectionListenerWorking = false;
var endWorkoutTime = "";
var startWorkoutTime = "";

const styles = StyleSheet.create({
  container: {
    width,
    height,
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  display: {

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
    fontFamily: bold,
  },
  viewFocusScoreText: {
    width: (width - 120),
    justifyContent: 'center',
  },
  viewIntensityScoreText: {
    width: (width - 120),
    justifyContent: 'center',
  },
  inputIntencityScore: {
    height: 30,
    width: 60,
  },
  inputTextComments: {
    marginTop: 5,
    flex: 1,
    height: 39,
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
    color: 'white',
    fontFamily: bold,
    fontSize: 14,
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
  viewError: {
    width: (width - 60),
    marginTop: 3,
    marginLeft: 30,
    alignItems: 'flex-end'
  },
  textError: {
    fontSize: 16,
    color: 'red',
    fontWeight: '600',
    fontFamily: medium,
  },
  button: {
    paddingHorizontal: 16,
    height: 36,
  },
  viewComments: {
    marginLeft: 30,
    width: (width - 60),
    marginTop: 20,
  }
});

const TextfieldScore = MKTextField.textfield()
  .withStyle(styles.inputIntencityScore)
  .withTextInputStyle({flex: 1, backgroundColor: '#a3a3a3', color: '#ececec', fontFamily: medium, fontSize: 16, textAlign: 'center'})
  .withTintColor('#ececec')
  .withHighlightColor('#409ac9')
  .build();

const TextfieldComment = MKTextField.textfield()
  .withStyle(styles.inputTextComments)
  .withTextInputStyle({flex: 1, backgroundColor: '#a3a3a3', paddingTop: -5, fontFamily: medium, color: '#ececec', fontSize: 16, textAlignVertical: 'bottom'})
  .withTintColor('#ececec')
  .withHighlightColor('#409ac9')
  .build();

const CustomButton = MKButton.button()
  .withBackgroundColor(MKColor.Blue)
  .withStyle(styles.button)
  .withTextStyle(styles.textFinish)
  .withText('Finish')
  .build();

class LiveWorkoutFinishWindow extends Component {

componentWillReceiveProps(nextProps)
{
  if (nextProps.windowFinishVisible) {
    AsyncStorage.getItem('endWorkoutTime')
      .then((asyncEndWorkoutTime) => {
        endWorkoutTime = asyncEndWorkoutTime;
      })
      .catch(error => console.log('error in AsyncStorage.getItem(\'endWorkoutTime\'): ', error));
    AsyncStorage.getItem('beginWorkoutTime')
      .then((asyncStartWorkoutTime) => {
        startWorkoutTime = asyncStartWorkoutTime;
        let getWorkoutDuration = moment(startWorkoutTime).preciseDiff(endWorkoutTime);
        this.setState({workoutDuration: getWorkoutDuration})
      })
      .catch(error => console.log('error in AsyncStorage.getItem(\'startWorkoutTime\'): ', error));
  }
}
  state={
      intensityScoreText: '',
      focusScoreText: '',
      comments: '',
      errorIntensityScore: '',
      errorFocusScore: '',
      errorComents: '',
      scroll: false,
      finishButtonPressed: false,
      workoutDuration: null,
  }

  getHeight = () => {
    if (this.props.windowFinishVisible) {
      return height;
    }
    return 0;
  }

  onFinish = () => {
    const {intensityScoreText, focusScoreText, comments, errorIntensityScore, errorFocusScore, errorComents} = this.state;
    if (intensityScoreText.length === 0 || focusScoreText.length === 0 || comments.length === 0) {
      if (intensityScoreText.length === 0) {
        this.setState({errorIntensityScore: 'Enter this score.'});
      }
      if (focusScoreText.length === 0) {
        this.setState({errorFocusScore: 'Enter this score.'});
      }
      if (comments.length === 0) {
        this.setState({errorComents: 'Enter comments.'});
      }
    } else if (errorIntensityScore.length === 0 && errorFocusScore.length === 0 && errorComents.length === 0) {
      this.handleFinishPress();
    }
  }

  handleFinishPress = () => {
    let sendStartTime = moment(startWorkoutTime).format("YYYY-DD-MM[T]HH:mm:ss");
    let sendEndTime = moment(endWorkoutTime).format("YYYY-DD-MM[T]HH:mm:ss");
    this.setState({finishButtonPressed: true});
    this.props.closeWindowFinish();
    this.props.clearCheck();
    var resultObject = JSON.stringify({
      "athleteId": this.props.nextWorkoutTree.athleteId, //athlete user ID  (guid)
      "athleteWorkoutId": this.props.nextWorkoutTree.athleteWorkoutId, //grab from workout
      "athleteProgramId": this.props.nextWorkoutTree.athleteProgramId, //grab from workout
      "PerceivedIntensityScore": Number(this.state.intensityScoreText), //scaled 1-10
      "PerceivedFocusScore": Number(this.state.focusScoreText), //scaled 1-10
      "Notes": this.state.comments, //string
      "StartTime": sendStartTime, //start of timer
      "EndTime": sendEndTime, //end of timer
    });

    NetInfo.isConnected.fetch().done((reach_bool) => { //checking Internet connection
      if (reach_bool == true) { // if  device connected to Internet send Workout result to server
        this.setState({finishButtonPressed: false});
        this.sendingWorkoutResult(resultObject);
     } else { //if there is no Internet connection, save Workout result to AsyncStorage
        AsyncStorage.setItem('resultObject', resultObject);
        if (!testConnectionListenerWorking) {
          testConnectionListenerWorking = true;
            NetInfo.addEventListener( // creating listener on connection changing
              'change',
              this.handleConnectivityChange
            );
            checkListener = BackgroundTimer.setInterval(() => {
              console.warn('Internet connection checking');
            }, 1000);
        };
          Alert.alert(
            'No Internet Connection',
            'Unable to send workout result. Please check your Internet connection. Don\'t start next workout before StriverMobile will send previous one after getting connection.',
            [
              {text: 'OK', onPress: () => this.props.popToStartScreen()},
            ],
            { cancelable: false }
          )
      }
   });
  }

  handleConnectivityChange = (reach) => {
    const isConnected = ((reach.toLowerCase() !== 'none') && (reach.toLowerCase() !== 'unknown'));
    if (isConnected) {
      AsyncStorage.getItem('resultObject')
        .then((savedResultObject) => {
          this.sendingWorkoutResult(savedResultObject);
          console.warn('deleteResultObject', deleteResultObject);
        })
        .catch(error => console.log('error AsyncStorage.getItem(\'resultObject\'): ', error));
      testConnectionListenerWorking = false;
      NetInfo.removeEventListener( //turning off connection listener
        'change',
        this.handleConnectivityChange
      );
      BackgroundTimer.clearInterval(checkListener);
    }
  };

  sendingWorkoutResult = (resultObject) => {
    console.warn('sendingWorkoutResult working, sending this: ', resultObject);
    fetch('https://strivermobile-api.herokuapp.com/api/workoutcomplete',{
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + this.props.nextWorkoutToken,
        'Content-Type': 'application/json',
      },
      body: resultObject
    })
    .then((response) => {
      if (response.status === 200 && response.ok === true) { //checking server response on failing
        console.warn('POST request passed fine');
        this.props.popToStartScreen();
      } else { // in case of "not ok" server response, saving Workout result to AsyncStorage and trying to attempt
        AsyncStorage.setItem('resultObject', resultObject);
        Alert.alert(
          'Bad server respond',
          'Unable to Save Workout At This Time.',
          [
            {text: 'OK', onPress: () => this.props.popToStartScreen()},
          ],
          { cancelable: false }
        )
        console.warn('There is something wrong. Server response: ', response);
      }
    })
    .catch((e) => {
      AsyncStorage.setItem('resultObject', resultObject);
      console.log('error in first POST request: ', e);
    });
  }

  setIntensityScore = (text) => {
    this.setState({intensityScoreText: text});
    if (text.length > 0) {
      if (Number(text) > 0 && Number(text) < 11) {
        this.setState({errorIntensityScore: ''});
      } else {
        this.setState({errorIntensityScore: 'Must be from 1 to 10.'});
      }
    } else {
      this.setState({errorIntensityScore: ''});
    }
  }

  setFocusScore = (text) => {
    this.setState({focusScoreText: text});
    if (text.length > 0) {
      if (Number(text) > 0 && Number(text) < 11) {
        this.setState({errorFocusScore: ''});
      } else {
        this.setState({errorFocusScore: 'Must be from 1 to 10.'});
      }
    } else {
      this.setState({errorFocusScore: ''});
    }
  }

  setComments = (text) => {
    this.setState({
      comments: text,
      errorComents: '',
    });
  }

  render() {
    const { windowFinishVisible, setWindowFinishVisible, currentTimerValue } = this.props;
    return (
      <View style={{ position: 'absolute', width, height: this.getHeight() }}>
        <Display
          enable = {windowFinishVisible}
          enterDuration = {500}
          exitDuration = {250}
          exit = "fadeOut"
          enter = "fadeIn"
          style= {{ width, height, bottom: 0,}}
        >
          <View style={styles.container} />
          <ScrollView scrollEnabled={this.state.scroll ? true : false }>
            <KeyboardAvoidingView behavior={'padding'} style={styles.viewFinish}>
              <View style={styles.viewIntensityScore}>
                <View style={styles.viewIntensityScoreText}>
                  <Text style={styles.textIntensityScore}>
                    Perceived Intensity Score/PRE:
                  </Text>
                </View>
                <View style={styles.viewInputScore}>
                  <TextfieldScore
                    onChangeText={this.setIntensityScore}
                    value={this.state.intensityScoreText}
                    maxLength={2}
                    selectionColor={'#409ac9'}
                    keyboardType="numeric"
                    underlineSize={3}
                    underlineColorAndroid="transparent"
                    onFocus={() => {this.setState({scroll: true})}}
                    onBlur={() => {this.setState({scroll: false})}}
                  />
                </View>
              </View>
              <View style={styles.viewError}>
                {
                  this.state.errorIntensityScore !== '' &&

                  <Text style={styles.textError}>
                    {this.state.errorIntensityScore}
                  </Text>
                }
              </View>
              <View style={styles.viewFocusScore}>
                <View style={styles.viewFocusScoreText}>
                  <Text style={styles.textIntensityScore}>
                    Perceived Focus Score:
                  </Text>
                </View>
                <View style={styles.viewInputScore}>
                  <TextfieldScore
                    onChangeText={this.setFocusScore}
                    value={this.state.focusScoreText}
                    maxLength={2}
                    keyboardType="numeric"
                    underlineSize={3}
                    selectionColor={'#409ac9'}
                    underlineColorAndroid="transparent"
                    onFocus={() => {this.setState({scroll: true})}}
                    onBlur={() => {this.setState({scroll: false})}}
                  />
                </View>
              </View>
              <View style={styles.viewError}>
                {
                  this.state.errorFocusScore !== '' &&

                  <Text style={styles.textError}>
                    {this.state.errorFocusScore}
                  </Text>
                }
              </View>
              {/* <View style={styles.viewComments}>
                <View>
                  <Text style={styles.textIntensityScore}>
                    Comments:
                  </Text>
                </View>
                <TextfieldComment
                  onChangeText={this.setComments}
                  value={this.state.comments}
                  multiline
                  underlineSize={3}
                  autoCorrect={false}
                  selectionColor={'#409ac9'}
                  underlineColorAndroid="transparent"
                  onFocus={() => {this.setState({scroll: true})}}
                  onBlur={() => {this.setState({scroll: false})}}
                />
              </View> */}
              <View style={styles.viewComments}>
                <Text style={styles.textIntensityScore}>
                  Comments:
                </Text>
                <View>
                  <TextfieldComment
                    onChangeText={this.setComments}
                    value={this.state.comments}
                    multiline
                    underlineSize={3}
                    autoCorrect={false}
                    selectionColor={'#409ac9'}
                    underlineColorAndroid="transparent"
                    onFocus={() => {this.setState({scroll: true})}}
                    onBlur={() => {this.setState({scroll: false})}}
                  />
                </View>
              </View>
              <View style={styles.viewError}>
                {
                  this.state.errorComents !== '' &&

                  <Text style={styles.textError}>
                    {this.state.errorComents}
                  </Text>
                }
              </View>
              <View style={styles.viewTime}>
                <Text style={styles.textIntensityScore}>
                  Time: {this.state.workoutDuration}
                </Text>
              </View>
              <View style={styles.viewFinishButton}>
                <CustomButton enabled={!this.state.finishButtonPressed} onPress={() => {this.onFinish()}} />
              </View>
            </KeyboardAvoidingView>
            <KeyboardSpacer topSpacing={Platform.OS === 'android' ? 80 : 20} />
          </ScrollView>
        </Display>
      </View>
    );
  }
}

export default LiveWorkoutFinishWindow;
