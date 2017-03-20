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
} from 'react-native';
import CheckBox from 'react-native-checkbox';
import * as NavigationState from '../../modules/navigation/NavigationState';

import * as CounterState from '../counter/CounterState';
import * as BeginWorkoutState from './BeginWorkoutState';
import BackgroundTimer from 'react-native-background-timer';

const { width, height } = Dimensions.get('window');
const pencil = require('../../assets/pencil.png');
const liveWorkoutTimer = null;

const liveWorkoutComponents = [
  {
    sets: [
      {
        weight: 25,
        repetitions: 5,
        intervalTime: 35,
      },
      {
        weight: 30,
        repetitions: 4,
        intervalTime: 40,
      },
      {
        weight: 30,
        repetitions: 5,
        intervalTime: 50,
      },
    ],
  },
  {
    sets: [
      {
        weight: 4,
        repetitions: 15,
        intervalTime: 55,
      },
      {
        weight: 10,
        repetitions: 10,
        intervalTime: 50,
      },
      {
        weight: 15,
        repetitions: 5,
        intervalTime: 25,
      },
    ],
  },
  {
    sets: [
      {
        weight: 55,
        repetitions: 2,
        intervalTime: 10,
      },
      {
        weight: 70,
        repetitions: 1,
        intervalTime: 5,
      },
      {
        weight: 70,
        repetitions: 1,
        intervalTime: 5,
      },
    ],
  },
];

class BeginWorkout extends Component {
  componentDidMount(){
    //starting timer
    this.props.dispatch(CounterState.getWorkoutTree());
    liveWorkoutTimer = BackgroundTimer.setInterval(() => {
      this.props.dispatch(CounterState.timerIncrement());
    }, 1000);
  }
  componentWillReceiveProps() {
    this.props.nextWorkoutTree.liveWorkoutComponents && this.setState({len: this.props.nextWorkoutTree.liveWorkoutComponents.length});
  }

  state={
    check: [],
    disable: true,
    len: 0,
  }

  pop() {
    //stopping timer
    BackgroundTimer.clearInterval(liveWorkoutTimer);
    this.props.dispatch(CounterState.timerReset());
    // console.warn('You finish workout for: ' + this.props.currentTimerValue + ' seconds');
    this.props.dispatch(NavigationState.popRoute());
  }

  check = () => {
    let count = 0;
    for (let i=0; i<=this.state.len; i++) {
      if (this.props.check.get(i) !== undefined && this.props.check.get(i) === true) {
        count += 1;
      }
    }
    if (count === this.state.len) {
      return false;
    } else return true;
  }

  checkExsercise = (index) => {
    this.props.dispatch(BeginWorkoutState.setCheck(index));
  }

  clearCheck = () => {
    this.props.dispatch(BeginWorkoutState.clearCheck());
  }

  renderRow = (set) => {
    // console.warn('checkmas',this.state.check);

    // console.warn('set',set);
    return (
      <View style={styles.viewFlexDirectionSet}>
        <View style={styles.viewSetParam}>
          <Text style={styles.textSetParam}>
            {set.weight}
          </Text>
        </View>
        <View style={styles.viewSetParam}>
          <Text style={styles.textSetParam}>
            {set.repetitions}
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
    return (
      <View onPress={() => {/* this.clearCheck() */}} style={[styles.touchableItem, { backgroundColor: index%2===0 ? '#e7e7e7' : 'white' }]}>
        <View style={styles.viewItem}>
          <View style={styles.viewRow}>
            <Text style={styles.textExercizeName}>
              {`${index + 1}. ${item.Exercise.name}`}
            </Text>
            <CheckBox
              checkboxStyle={styles.checkboxStyle}
              underlayColor={'transparent'}
              label={''}
              checked={this.props.check.get(index)}
              onChange={() => { this.checkExsercise(index) }}
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
            {/* {item.sets.map(set => {this.renderRow(set)})} */}
            {liveWorkoutComponents[index].sets
              .map(set => { return(this.renderRow(set)); })}
          </View>
        </View>
      </View>
    );
  }

  render() {
    const { workOut, PRE, timeDate, focus, nextWorkoutTree } = this.props;
    return (
      <ScrollView style={styles.container}>
        <View style={styles.viewFlexDirection}>
          <Text style={styles.textTop}>
            {workOut ? workOut : 'Workout'}
          </Text>
          <Text style={styles.textTop}>
            {PRE ? PRE : 'PRE'}
          </Text>
          <Text style={styles.textTop}>
            {timeDate ? timeDate : 'Date'}
          </Text>
          <Image style={styles.imagePencil} source={pencil}/>
        </View>
        <View style={styles.viewFocus}>
          <Text style={styles.textFocus}>
            Focus: {nextWorkoutTree.goal}
          </Text>
        </View>
        <View style={styles.viewTouchOpacityComplete}>
          <TouchableOpacity
            onPress={() => {this.pop()}}
            disabled={this.check()}
            style={styles.touchOpacityComplete}
          >
            <Text style={styles.textComplete}>
              Complete Workout
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.viewItems}>
          {
            nextWorkoutTree.liveWorkoutComponents
            ?
              Array.isArray(nextWorkoutTree.liveWorkoutComponents) &&
              nextWorkoutTree.liveWorkoutComponents.map((item, index) => {
                return(this.renderItem(item, index));
              })
            :
              <View style={styles.activityIndicator}>
                <ActivityIndicator color={'#7b7b7b'} size={Platform.OS === 'android' ? 25 : "large"} />
              </View>
          }
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'android' ? 0 : 25,
    backgroundColor: 'white',
  },
  activityIndicator: {
    height: (height / 1.7),
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewFlexDirection: {
    paddingHorizontal: 20,
    width,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  viewLogo: {
    width,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 30,
  },
  textLogo: {
    marginLeft: 2,
    fontWeight: '600',
    fontSize: 23,
  },
  imageLogo: {
    width: 30,
    height: 50,
  },
  imagePencil: {
    marginTop: 2,
    width: 18,
    height: 18,
  },
  textTop: {
    color: '#7b7b7b',
    fontSize: 18,
    fontWeight: '700',
  },
  viewFocus: {
    marginTop: 15,
    paddingHorizontal: (width / 9.2),  // need test on otheid devices
  },
  textFocus: {
    color: '#7b7b7b',
    fontSize: 18,
    fontWeight: '700',
  },
  viewTouchOpacityComplete: {
    marginTop: 25,
    width,
    alignItems: 'center',
  },
  touchOpacityComplete: {
    width: 200,
    alignItems: 'center',
    paddingBottom: 10,
    paddingTop: 15,
    borderWidth: 2,
    borderRadius: 3,
    borderColor: '#7b7b7b',
  },
  textComplete: {
    fontSize: 15,
    color: '#7b7b7b',
    fontWeight: '600',
  },
  touchableItem: {
    paddingVertical: 20,
  },
  viewRow: {
    marginLeft: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  viewItems: {
    marginTop: 30,
  },
  viewItem: {
    justifyContent: 'center',
    width: (width / 1.4),
  },
  textExercizeName: {
    color: '#7b7b7b',
    fontWeight: '700',
    fontSize: 17,
    width: (width / 1.7),
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
    width: ( width / 1.7 ),
  },
  viewSets: {
    marginTop: 10,
    width: ( width - 45 ),
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 5,
  },
  textSets: {
    color: '#7b7b7b',
    fontSize: 16,
    fontWeight: '600',
  },
  viewSetHead: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
  },
  viewFlexDirectionSet: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: ( width / 1.7 ),
  },
  viewSetsArray: {
    width: ( width - 45 ),
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 5,
  },
  viewSetParam: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    marginTop: 5,
  },
  textSetParam: {
    color: '#7b7b7b',
    fontSize: 16,
  },
});

BeginWorkout.propTypes = {
  workOut: PropTypes.string,
  PRE: PropTypes.string,
  timeDate: PropTypes.string,
  focus: PropTypes.number,
  nextWorkoutTree: PropTypes.object,
};

export default BeginWorkout;
