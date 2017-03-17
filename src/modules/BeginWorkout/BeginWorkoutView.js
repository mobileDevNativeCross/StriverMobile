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
} from 'react-native';
import CheckBox from 'react-native-checkbox';
import * as NavigationState from '../../modules/navigation/NavigationState';
import BackgroundTimer from 'react-native-background-timer';
import * as CounterState from '../counter/CounterState';

const { width, height } = Dimensions.get('window');
const pencil = require('../../assets/pencil.png');

class BeginWorkout extends Component {
  componentDidMount(){
    //starting timer
    liveWorkoutTimer = BackgroundTimer.setInterval(() => {
      this.props.dispatch(CounterState.timerIncrement());
    }, 1000);
  }

  state={
    check: false,
    disable: false,
  }

  pop() {
    //stopping timer
    BackgroundTimer.clearInterval(liveWorkoutTimer);
    this.props.dispatch(CounterState.timerReset());
    console.warn('You finish workout for: ' + this.props.currentTimerValue + ' seconds');
    this.props.dispatch(NavigationState.popRoute());
  }

  renderItem = (item, index) => {
    return (
      <TouchableHighlight style={[styles.touchableItem, { backgroundColor: index%2===0 ? '#e7e7e7' : 'white' }]}>
        <View style={styles.viewItem}>
          <View style={styles.viewRow}>
            <Text>
              {item.Exercise.name}
            </Text>
            <CheckBox
              label={''}
              checked={this.state.check}
              onChange={(checked) => { this.setState({check: !this.state.check}) }}
            />
          </View>
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    const { workOut, PRE, timeDate, focus, liveWorkoutComponents } = this.props;
    return (
      <ScrollView style={styles.container}>
        <View style={styles.viewFlexDirection}>
          <Text style={styles.textTop}>
            {workOut ? workOut : 'Work Out'}
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
            Focus: {focus}
          </Text>
        </View>
        <View style={styles.viewTouchOpacityComplete}>
          <TouchableOpacity
            onPress={() => {this.pop()}}
            disabled={this.state.disable ? true : false}
            style={styles.touchOpacityComplete}
          >
            <Text style={styles.textComplete}>
              Complete Workout
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.viewItems}>
          {
            // liveWorkoutComponents.map((item, index) => { return(this.renderItem(item, index)); })
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
  // instructions: {
  //   textAlign: 'center',
  //   color: '#333333',
  //   marginBottom: 5,
  // },
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
    paddingVertical: 10,
    borderWidth: 2,
    borderRadius: 5,
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
  viewItem: {
    marginLeft: 20,
    width: (width / 1.3),
    backgroundColor: 'red',
  },
  viewRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  viewItems: {
    marginTop: 30,
  },
});

BeginWorkout.propTypes = {
  workOut: PropTypes.string,
  PRE: PropTypes.string,
  timeDate: PropTypes.string,
  focus: PropTypes.number,
  // liveWorkoutComponents: PropTypes.arrayOf(PropTypes.object),
};

export default BeginWorkout;
