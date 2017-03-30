import React, { Component, PropTypes } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Platform,
  Dimensions,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  ActivityIndicator,
  AsyncStorage,
} from 'react-native';
import CheckBox from 'react-native-checkbox';
import moment from 'moment';
import * as NavigationState from '../../modules/navigation/NavigationState';

import * as HomeState from '../Home/HomeState';
import * as LiveWorkoutState from './LiveWorkoutState';
import LiveWorkoutFinishWindow from './LiveWorkoutFinishWindow';
import NavButton from '../../components/NavButton';
import * as MK from 'react-native-material-kit';
import { regular, bold, medium} from 'AppFonts';
import store from '../../redux/store';

const { width, height } = Dimensions.get('window');
const pencil = require('../../assets/pencil.png');
const liveWorkoutTimer = 'workOutTimer';
const {
  MKButton,
  MKColor,
  MKCheckbox,
} = MK;

const styles = StyleSheet.create({
  viewContainer: {
    height: Platform.OS === 'android' ? (height - 105) : (height - 80),
    width,
  },
  container: {
    paddingTop: Platform.OS === 'android' ? 0 : 25,
    backgroundColor: 'white',
  },
  activityIndicator: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewHead: {
    paddingHorizontal: 40,
  },
  viewHeadItem: {
    height: 48,
    justifyContent: 'center',
  },
  textTop: {
    color: '#7b7b7b',
    fontSize: 20,
    fontFamily: bold,
  },
  viewTouchOpacityComplete: {
    width,
    alignItems: 'center',
  },
  completeWorkoutButton: {
    paddingHorizontal: 16,
    marginTop: 25,
  },
  textComplete: {
    fontSize: 15,
    color: '#7b7b7b',
    fontWeight: '600',
  },
  touchableItem: {
    paddingVertical: 10,
  },
  viewRow: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: (width - 30),
    alignItems: 'center',
  },
  viewItems: {
    marginTop: 30,
  },
  viewItem: {
    justifyContent: 'center',

    width: (width),
  },
  textExercizeName: {
    color: '#7b7b7b',
    fontSize: 17,
    width: (width / 1.4),
    fontFamily: bold
  },
  checkboxStyle: {
    tintColor: '#979797',
    borderWidth: 2.8,
    borderColor: '#979797',
    backgroundColor: '#ededed',
  },
  viewSetsFlex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: (width / 1.5),
  },
  viewSets: {
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 5,
  },
  textSets: {
    color: '#7b7b7b',
    fontSize: 16,
    fontFamily: bold
  },
  viewSetHead: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
  },
  viewFlexDirectionSet: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: (width / 1.5),
  },
  viewSetsArray: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 5,
  },
  viewSetParam: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    marginTop: 5,
  },
  textSetParam: {
    color: '#7b7b7b',
    fontSize: 16,
  },
  textCompleteButton: {
    fontFamily: bold,
    fontSize: 14,
  },
});

class LiveWorkout extends Component {

  componentWillMount() {
    this.props.dispatch(HomeState.checkEnter(false));
    AsyncStorage.getItem('checked').then(result => {
      const res = JSON.parse(result);
      this.props.dispatch(LiveWorkoutState.setCheckArray(res));
    })
  }

  componentWillReceiveProps(nextProps) {
    this.props.nextWorkoutTree.liveWorkoutComponents && this.setState({len: this.props.nextWorkoutTree.liveWorkoutComponents.length});
  }

  state={
    check: [],
    disable: true,
    len: 0,
    windowFinishVisible: false,
    beginWorkoutTime: null,
  }

  renderComleteWorkoutButton = () => {
    const CompleteWorkout = MKButton.coloredButton()
      .withBackgroundColor(this.check() ? 'rgba(0,0,0,0.12)' : MKColor.Blue)
      .withStyle([styles.completeWorkoutButton, {height: 36,}])
      .withShadowAniEnabled(this.check())
      .withTextStyle([styles.textCompleteButton, this.check() ? {color: 'rgba(0,0,0,0.26)', shadowRadius: 0, elevation: 0} : {color: 'white'}])
      .withText('Complete Workout')
      .build();
      return (
        <CompleteWorkout
          onPress={() => {this.setWindowFinishVisible(true)}}

          disabled={this.check()}
        />
      );
  }

  pop = () => {
    this.props.dispatch(NavigationState.popRoute());
    this.props.dispatch(HomeState.checkEnter(true));
    AsyncStorage.setItem('beginWorkoutTime', '');
    AsyncStorage.setItem('endWorkoutTime', '');
  }

  check = () => {
    let count = 0;
    for (let i=0; i<=this.state.len; i++) {
      if (this.props.check[i] !== undefined && this.props.check[i] === true) {
        count += 1;
      }
    }

    if (this.state.len > 0 && count === this.state.len) {
      return false;
    }
    return true;
    // return !(this.state.len > 0 && count === this.state.len);
  }

  setWindowFinishVisible = (visible) => {
    this.props.dispatch(LiveWorkoutState.showWindowFinish(visible));
    let endWorkoutTime = moment().format();
    AsyncStorage.setItem('endWorkoutTime', endWorkoutTime);
  }

  closeWindowFinish = () => {
    this.props.dispatch(LiveWorkoutState.showWindowFinish(false));
  }

  checkExsercise = (index) => {
    this.props.dispatch(LiveWorkoutState.setCheck(index));
  }

  clearCheck = () => {
    this.props.dispatch(LiveWorkoutState.clearCheck());
  }

  backToHome = () => {
    this.clearCheck();
    this.closeWindowFinish();
    this.pop();
  }

  renderRow = (set) => {
    return (
      <View key={set.orderId} style={styles.viewFlexDirectionSet}>
        <View style={styles.viewSetParam}>
          <Text style={styles.textSetParam}>
            {set.weight}
          </Text>
        </View>
        <View style={styles.viewSetParam}>
          <Text style={styles.textSetParam}>
            { set.intervalTime > 0 && set.intervalTime !== null ? set.intervalTime : set.repetitions}
          </Text>
        </View>
        <View style={styles.viewSetParam}>
          <Text style={styles.textSetParam}>
            {set.intervalTime}
          </Text>
        </View>
      </View>
    );
  }

  renderItem = (item, index) => {
    const {nextWorkoutTree} = this.props;
    const liveWorkoutComponents = nextWorkoutTree.liveWorkoutComponents;
    return (
      <View key={index} style={[styles.touchableItem, { backgroundColor: index%2===0 ? '#e7e7e7' : 'white' }]}>
        <View style={styles.viewItem}>
          <View style={styles.viewRow}>
            <Text style={styles.textExercizeName}>
              {liveWorkoutComponents[index].Exercise.name}
            </Text>
            <MKCheckbox
              style={{width: 24, height: 24}}
              borderOffColor={'rgba(0,0,0,.54)'}
              fillColor={MKColor.Blue}
              borderOnColor={MKColor.Blue}
              checked={item}
              onCheckedChange={() => { this.checkExsercise(index) }}
            />
          </View>
          <View style={styles.viewSets}>
            <View style={styles.viewSetsFlex}>
              <View style={styles.viewSetHead}>
                <Text style={styles.textSets}>
                  Weight
                </Text>
              </View>
              <View style={styles.viewSetHead}>
                <Text style={styles.textSets}>
                  Reps
                </Text>
              </View>
              <View style={styles.viewSetHead}>
                <Text style={styles.textSets}>
                  Time
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.viewSetsArray}>
            {liveWorkoutComponents[index].sets.map(set => {return(this.renderRow(set));})}
          </View>
        </View>
      </View>
    );
  }

  render() {
    const { workOut, PRE, timeDate, focus, nextWorkoutTree, currentTimerValue, check } = this.props;
    const workoutName = this.props.nextWorkoutTree.workoutName;
    const intensityScore = this.props.nextWorkoutTree.intensityScore;
    const workoutDate = moment(this.props.nextWorkoutTree.workoutDate).format('MM/DD/YYYY');
    return (
      <View style={styles.viewContainer}>
        <ScrollView style={styles.container}>
          <View style={styles.viewHead}>
          {
            // <View style={styles.viewHeadItem}>
            //   <Text style={styles.textTop}>
            //     Workout Name:
            //   </Text>
            // </View>
          }
            <View style={styles.viewHeadItem}>
              <Text style={styles.textTop}>
                Date: {workoutDate}
              </Text>
            </View>
            <View style={styles.viewHeadItem}>
              <Text style={styles.textTop}>
                Intensity Score: {intensityScore}
              </Text>
            </View>
            <View style={styles.viewHeadItem}>
              <Text style={styles.textTop}>
                Focus: {nextWorkoutTree.goal}
              </Text>
            </View>
          </View>
          <View style={styles.viewTouchOpacityComplete}>
          {this.renderComleteWorkoutButton()}
          </View>
          <View style={styles.viewItems}>
            {
              nextWorkoutTree.liveWorkoutComponents &&
              Array.isArray(nextWorkoutTree.liveWorkoutComponents) &&
              nextWorkoutTree.liveWorkoutComponents.length > 0 &&
              check &&
              Array.isArray(check) &&
              check.length > 0
              ?
                check.map((item, index) => {
                  return(this.renderItem(item, index))
                })
              :
                <View style={styles.activityIndicator}>
                  <ActivityIndicator color={'#7b7b7b'} size={Platform.OS === 'android' ? 25 : "large"} />
                </View>
            }
          </View>
        </ScrollView>
        <LiveWorkoutFinishWindow
          currentTimerValue={currentTimerValue}
          closeWindowFinish={() => {this.closeWindowFinish()}}
          windowFinishVisible={this.props.showWindowFinish}
          setWindowFinishVisible={(visible) => {this.setWindowFinishVisible(visible)}}
          beginWorkoutTime={this.state.beginWorkoutTime}
          athleteId={this.props.athleteId}
          nextWorkoutTree={this.props.nextWorkoutTree}
          nextWorkoutToken={this.props.nextWorkoutToken}
          popToStartScreen={() => {this.pop()}}
          clearCheck={() => {this.clearCheck()}}
        />
        <NavButton titleHome={'Back to Home'} onPressHome={() => {this.backToHome()}}/>
      </View>
    );
  }
}

LiveWorkout.propTypes = {
  workOut: PropTypes.string,
  PRE: PropTypes.string,
  timeDate: PropTypes.string,
  focus: PropTypes.number,
  nextWorkoutTree: PropTypes.object,
};

export default LiveWorkout;
