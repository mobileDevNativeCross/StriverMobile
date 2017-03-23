
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
} from 'react-native';
import Display from 'react-native-display';
import BackgroundTimer from 'react-native-background-timer';
import moment from 'moment';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import {
  MKTextField,
  MKColor,
  MKButton,
  mdl,
} from 'react-native-material-kit';

import NavButton from '../../components/NavButton';
import * as CounterState from '../counter/CounterState';
import { regular, bold, medium} from 'AppFonts';

const { width, height } = Dimensions.get('window');

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
  // inputTextScore: {
  //   height: 30,
  //   fontSize: 19,
  //   width: 60,
  //   textAlign: 'center',
  //   backgroundColor: '#ededed',
  //   borderColor: '#696969',
  //   borderWidth: 3,
  //   // ...Platform.select({
  //   //   ios: {},
  //   //   android: {
  //   //     paddingTop: 0,
  //   //     paddingBottom: 0,
  //   //   },
  //   // }),
  // },
  inputIntencityScore: {
    height: 30,
    width: 60,
    // ...Platform.select({
    //   ios: {},
    //   android: {
    //     paddingTop: 0,
    //     paddingBottom: 0,
    //   },
    // }),
  },
  viewComments: {
    flexDirection: 'row',
    width: (width - 60),
    marginTop: 10,
    marginLeft: 30,
  },
  inputTextComments: {
    marginLeft: 10,
    flex: 1,
    height: 120,
    // ...Platform.select({
    //   ios: {},
    //   android: {
    //     textAlignVertical: 'top',
    //     paddingTop: 0,
    //     paddingBottom: 0,
    //   },
    // }),
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
    fontSize: 14,
    fontWeight: '600',
    backgroundColor: 'transparent',
    fontFamily: medium,
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
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowRadius: 3,
        shadowOffset: {
          height: 4,
          width: 0,
        },
        shadowOpacity: 0.2,
      },
      android: {
        elevation: 6,
      },
    }),
  },
});

const TextfieldScore = MKTextField.textfield()
  .withStyle(styles.inputIntencityScore)
  .withTextInputStyle({flex: 1, backgroundColor: '#a3a3a3', color: '#ececec', fontFamily: medium, fontSize: 16, textAlign: 'center'})
  .withTintColor('#ececec')
  .withHighlightColor('#409ac9')
  .build();

const TextfieldComment = MKTextField.textfield()
  .withStyle(styles.inputTextComments)
  .withTextInputStyle({flex: 1, backgroundColor: '#a3a3a3', paddingTop: -5, fontFamily: medium, color: '#ececec', fontSize: 16, textAlignVertical: 'top'})
  .withTintColor('#ececec')
  .withHighlightColor('#409ac9')
  .build();

const CustomButton = MKButton.button()
  .withBackgroundColor('#ececec')
  .withStyle(styles.button)
  .withTextStyle(styles.textFinish)
  .withText('Finish')
  .build();

class BeginWorkoutFinishWindow extends Component {

  state={
      intensityScoreText: '',
      focusScoreText: '',
      comments: '',
      errorIntensityScore: '',
      errorFocusScore: '',
      errorComents: '',
      scroll: false,
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
    let gotEndWorkoutTime = moment().format("YYYY-DD-MM[T]HH:mm:ss");
    this.setState({windowFinishVisible : !this.state.windowFinishVisible});
    BackgroundTimer.clearInterval(this.liveWorkoutTimer);
    this.props.clearCheck();
    let resultObject = JSON.stringify({
      "athleteId": this.props.nextWorkoutTree.athleteId, //athlete user ID  (guid)
      "athleteWorkoutId": this.props.nextWorkoutTree.athleteWorkoutId, //grab from workout
      "athleteProgramId": this.props.nextWorkoutTree.athleteProgramId, //grab from workout
      "PerceivedIntensityScore": Number(this.state.intensityScoreText), //scaled 1-10
      "PerceivedFocusScore": Number(this.state.focusScoreText), //scaled 1-10
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
          AsyncStorage.setItem('resultObject', resultObject);
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
              <View style={styles.viewComments}>
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
                  Time: {this.getCurrentTimerValue()}
                </Text>
              </View>
              <View style={styles.viewFinishButton}>
                <CustomButton
                  onPress={() => {this.onFinish()}}
                />
              </View>
            </KeyboardAvoidingView>
            <KeyboardSpacer topSpacing={Platform.OS === 'android' ? 80 : 20} />
          </ScrollView>
        </Display>
      </View>
    );
  }
}

export default BeginWorkoutFinishWindow;
