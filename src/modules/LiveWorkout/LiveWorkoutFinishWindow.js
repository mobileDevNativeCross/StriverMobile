import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Platform,
  ScrollView,
  AsyncStorage,
  KeyboardAvoidingView,
  NetInfo,
  Alert,
  ActivityIndicator,
  Modal,
  TouchableHighlight,
  StatusBar,
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
  getTheme,
} from 'react-native-material-kit';
import * as auth0 from '../../services/auth0';
import { regular, bold, medium} from 'AppFonts';
import styles from './LiveWorkoutFinishWindowStyle';

const { width, height } = Dimensions.get('window');
const theme = getTheme();
const testConnectionListenerWorking = false;
var endWorkoutTime = "";
var startWorkoutTime = "";

const TextfieldScore = MKTextField.textfield()
  .withStyle(styles.inputIntencityScore)
  .withTextInputStyle(styles.textInputScore)
  .withTintColor('#ececec')
  .withHighlightColor(MKColor.Blue)
  .build();

const TextfieldComment = MKTextField.textfield()
  .withStyle(styles.inputTextComments)
  .withTextInputStyle(styles.textInputComments)
  .withTintColor('#ececec')
  .withHighlightColor(MKColor.Blue)
  .build();

class LiveWorkoutFinishWindow extends Component {
  componentWillReceiveProps(nextProps){
    if (nextProps.windowFinishVisible) {
      AsyncStorage.getItem('endWorkoutTime')
        .then((asyncEndWorkoutTime) => {
          endWorkoutTime = asyncEndWorkoutTime;
        })
        .catch(error => console.warn('error in AsyncStorage.getItem(\'endWorkoutTime\'): ', error));
      AsyncStorage.getItem('beginWorkoutTime')
        .then((asyncStartWorkoutTime) => {
          startWorkoutTime = asyncStartWorkoutTime;
          AsyncStorage.getItem('savedWorkoutTime')
            .then((savedWorkoutTime) => {
              savedWorkoutTime = JSON.parse(savedWorkoutTime);

              let totalWorkoutDuration = moment(endWorkoutTime).diff(moment(startWorkoutTime)) + savedWorkoutTime;
              let humanizeDurationHours = moment.duration(totalWorkoutDuration).asHours();
              humanizeDurationHours -= humanizeDurationHours % 1;
              humanizeDurationHours = (humanizeDurationHours === 0) ? '' :  humanizeDurationHours + ' hour(s), ';
              let humanizeDurationMinutes = moment.duration(totalWorkoutDuration).minutes();
              humanizeDurationMinutes = (humanizeDurationMinutes === 0) ? '' :  humanizeDurationMinutes + ' minute(s), ';
              let humanizeDurationSeconds = moment.duration(totalWorkoutDuration).seconds();
              humanizeDurationSeconds = (humanizeDurationSeconds === 0) ? '' :  humanizeDurationSeconds + ' second(s)';
              let totalWorkoutDurationString = humanizeDurationHours + humanizeDurationMinutes + humanizeDurationSeconds;

              this.setState({totalWorkoutDuration: totalWorkoutDurationString})
            })
            .catch(error => console.warn('err. in getItem(\'savedWorkoutTime\')', error));
        })
        .catch(error => console.warn('err. in getItem(\'beginWorkoutTime\')', error));
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
    totalWorkoutDuration: null,
    loadResult: false,
  }

  setModalVisible(visible){
   this.props.closeWindowFinish()
   StatusBar.setBackgroundColor('white', true);
  }

  getHeight = () => {
    if (this.props.windowFinishVisible) {
      return height;
    }
    return 0;
  }

  onFinish = () => {
    const {intensityScoreText, focusScoreText, comments, errorIntensityScore, errorFocusScore, errorComents} = this.state;
    if (errorIntensityScore.length === 0 && errorFocusScore.length === 0 && errorComents.length === 0) {
      this.handleFinishPress();
    }
  }

  handleFinishPress = () => {
    this.setState({
      loadResult: true
    });
    if (Platform.OS === 'ios') {
      NetInfo.isConnected.addEventListener('change', this.handleIOSConnectivityChange);
    } else {
      NetInfo.isConnected.fetch().then((reach_bool) => { //checking Internet connection
        this.afterInternetConnectionChecking(reach_bool);
      });
    }
  }

  afterInternetConnectionChecking = (reach_bool) => {
    const { nextWorkoutTree } = this.props;
    let sendStartTime = moment(startWorkoutTime).format("YYYY-DD-MM[T]HH:mm:ss");
    let sendEndTime = moment(endWorkoutTime).format("YYYY-DD-MM[T]HH:mm:ss");
    var resultObject = JSON.stringify({
      "athleteId": nextWorkoutTree.athleteId, //athlete user ID  (guid)
      "athleteWorkoutId": nextWorkoutTree.athleteWorkoutId, //grab from workout
      "athleteProgramId": nextWorkoutTree.athleteProgramId, //grab from workout
      "PerceivedIntensityScore": Number(this.state.intensityScoreText), //scaled 1-10
      "PerceivedFocusScore": Number(this.state.focusScoreText), //scaled 1-10
      "Notes": this.state.comments, //string
      "StartTime": sendStartTime, //start of timer
      "EndTime": sendEndTime, //end of timer
    });
    if (reach_bool === true) { // if  device connected to Internet send Workout result to server
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
            console.log('Internet connection checking');
          }, 1000);
      };
      Alert.alert(
        'No Internet Connection',
        'Unable to send workout result. Please check your Internet connection. Don\'t start next workout before StriverMobile will send previous one after getting connection.',
        [
          {text: 'OK', onPress: () => {}},
        ],
        { cancelable: false }
      )
    }
  };


  handleIOSConnectivityChange = (reach) => {
    NetInfo.isConnected.removeEventListener( //turning off connection listener
      'change',
      this.handleIOSConnectivityChange
    );
    this.afterInternetConnectionChecking(reach);

  };

  handleConnectivityChange = (reach) => {
    const isConnected = ((reach.toLowerCase() !== 'none') && (reach.toLowerCase() !== 'unknown'));
    if (isConnected) {
      AsyncStorage.getItem('resultObject')
        .then((savedResultObject) => {
          AsyncStorage.removeItem('resultObject')
          .catch(error => console.warn('error AsyncStorage.removeItem(\'resultObject\'): ', error));
          this.sendingWorkoutResult(savedResultObject);
        })
        .catch(error => console.warn('error AsyncStorage.getItem(\'resultObject\'): ', error));
      testConnectionListenerWorking = false;
      NetInfo.removeEventListener( //turning off connection listener
        'change',
        this.handleConnectivityChange
      );
      BackgroundTimer.clearInterval(checkListener);
    }
  };

  sendingWorkoutResult = (resultObject) => {
    this.setState({
      loadResult: true
    });
    AsyncStorage.getItem('currentToken')
      .then(token => {
        if (token) {
          this.props.dispatchTokenToRedux(token);
        }
      })
      .then(() => {
        const { reduxCurrentToken } = this.props;
        const currentToken = reduxCurrentToken.idToken;
        if (currentToken) {
          fetch('https://strivermobile-api.herokuapp.com/api/workoutcomplete',{
            method: 'POST',
            headers: {
              'Authorization': 'Bearer ' + currentToken,
              'Content-Type': 'application/json',
            },
            body: resultObject
          })
          .then((response) => {
            if ((response.status == 401) && (response.ok == false)  && (response._bodyText === 'Unauthorized', '\\n')) {
              console.warn('Unauthorized');
              this.setState({
                loadResult: false
              });
              auth0.showLogin()
                .catch(e => console.warn('error in showLogin()', e));
            } else if (response.status === 200 && response.ok === true) { //checking server response on failing
              Alert.alert(
                'Send Success',
                'Workout result was sent successfully.',
                [
                  {text: 'OK', onPress: () => {
                    this.props.popToStartScreen();
                    this.props.clearCheck();
                  }},
                ],
                { cancelable: true }
              )
              AsyncStorage.setItem('savedWorkoutTime', '0');
              this.setState({
                loadResult: false,
              });
            } else { // in case of "not ok" server response, saving Workout result to AsyncStorage and trying to attempt
              AsyncStorage.setItem('resultObject', resultObject);
              Alert.alert(
                'Bad server respond',
                'Unable to Save Workout At This Time.',
                [
                  {text: 'OK', onPress: () => {}},
                ],
                { cancelable: false }
              )
              console.warn('There is something wrong. Server response: ', response);
            }
          })
          .catch((e) => {
            AsyncStorage.setItem('resultObject', resultObject);
            console.warn('error in first POST request: ', e);
          });
        }
      })
      .catch(e => {console.warn('error in getItem(\'newToken\') in reducer', e)});
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

  checkEnableFinishButton = () => {
    const {
      intensityScoreText,
      focusScoreText,
      comments,
      errorIntensityScore,
      errorFocusScore,
      errorComents
    } = this.state;
    if (intensityScoreText.length > 0 && focusScoreText.length > 0 && comments.length > 0 && errorIntensityScore.length <= 0 && errorFocusScore.length <= 0 && errorComents.length <= 0) {
      return false;
    }
    return true;
  }

  render() {
    const { windowFinishVisible } = this.props;
    return (
      <View style={styles.viewFinishWindow}>
        <Modal
          animationType={"slide"}
          transparent={true}
          visible={windowFinishVisible}
          onRequestClose={() => {
            this.setModalVisible(false);
          }}
        >
          <View style={styles.viewFinishWindowMargin}>
            <View style={styles.container} />
            <ScrollView scrollEnabled={this.state.scroll ? true : false }>
              <View style={[theme.cardStyle, styles.viewFinish]}>
                <KeyboardAvoidingView
                  behavior={'padding'}
                  style={styles.keyboardAvoidingViewFinish}
                >
                  <View style={styles.viewPadding}>
                    <View style={styles.viewIntensityScore}>
                      <View style={styles.viewIntensityScoreText}>
                        <Text style={styles.fieldTitle}>
                          Intensity Score (1-10):
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
                        <Text style={styles.fieldTitle}>
                          Focus Score (1-10):
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
                      <Text style={styles.fieldTitle}>
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
                      <Text style={styles.fieldTitle}>
                        Time: {this.state.totalWorkoutDuration}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.viewFinishButton}>
                    <MKButton
                      backgroundColor={'transparent'}
                      rippleColor='rgba(0,0,0,.3)'
                      style={styles.button}
                      onPress={() => {
                        this.setModalVisible(false);
                      }}
                    >
                      <Text style={styles.buttonText}>
                      CANCEL
                      </Text>
                    </MKButton>
                    <MKButton
                      backgroundColor={'transparent'}
                      rippleColor={this.state.loadResult ? 'transparent' : 'rgba(0,0,0,.3)'}
                      disabled={this.checkEnableFinishButton() || this.state.loadResult}
                      style={styles.button}
                      onPress={() => {this.onFinish()}}
                    >
                      {
                        this.state.loadResult
                        ?
                          <ActivityIndicator size={Platform.OS === 'android' ? 20 : "small"} color={'#b7b7b7'} />
                        :
                          <Text
                            style={[
                              styles.buttonText,
                              this.checkEnableFinishButton()
                                ? {color: 'rgba(0,0,0,0.26)'}
                                : styles.buttonText
                            ]}
                          >
                            FINISH
                          </Text>
                      }
                    </MKButton>
                  </View>
                </KeyboardAvoidingView>
                {Platform.OS === 'android' && <KeyboardSpacer topSpacing={80} style={{ height: 0 }} />}
              </View>
              {Platform.OS === 'ios' && <KeyboardSpacer topSpacing={20} />}
            </ScrollView>
          </View>
        </Modal>
      </View>
    );
  }
}

LiveWorkoutFinishWindow.propTypes = {
  closeWindowFinish: PropTypes.func.isRequired,
  windowFinishVisible: PropTypes.bool.isRequired,
  setWindowFinishVisible: PropTypes.func.isRequired,
  nextWorkoutTree: PropTypes.object.isRequired,
  popToStartScreen: PropTypes.func.isRequired,
  clearCheck: PropTypes.func.isRequired,
  reduxCurrentToken: PropTypes.shape({
    tokenType: PropTypes.string,
    accessToken: PropTypes.string,
    idToken: PropTypes.string,
  }),
  dispatchTokenToRedux: PropTypes.func.isRequired,
}

export default LiveWorkoutFinishWindow;
