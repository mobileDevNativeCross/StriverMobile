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
import * as CounterState from '../counter/CounterState';
import * as BeginWorkoutState from './BeginWorkoutState';

const { width, height } = Dimensions.get('window');
const pencil = require('../../assets/pencil.png');

class BeginWorkout extends Component {
  state={
    check: [],
    disable: false,
  }

  componentDidMount() {
    this.props.dispatch(CounterState.getWorkoutTree());
    // this.props.dispatch(BeginWorkoutState.setLength(this.props.nextWorkoutTree.liveWorkoutComponents.length));
  }

  pop() {
    this.props.dispatch(NavigationState.popRoute());
  }

  checkExsercise = (index) => {
    // checkMas = this.state.check;
    // checkMas[index] = !this.state.check[index];
    // this.setState({check: checkMas});
    this.props.dispatch(BeginWorkoutState.setCheck(index));
  }

  clearCheck = () => {
    this.props.dispatch(BeginWorkoutState.clearCheck());
    // this.setState({check: this.props.check});
  }

  renderItem = (item, index) => {
    return (
      <TouchableOpacity onPress={() => {this.clearCheck()}} style={[styles.touchableItem, { backgroundColor: index%2===0 ? '#e7e7e7' : 'white' }]}>
        <View style={styles.viewItem}>
          <View style={styles.viewRow}>
            <Text style={styles.textExercizeName}>
              {item.Exercise.name}
            </Text>
            <CheckBox
              checkboxStyle={styles.checkboxStyle}
              underlayColor={'transparent'}
              label={''}
              checked={this.props.check.get(index)}
              onChange={() => { this.checkExsercise(index) }}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    // console.warn('state is: ', this.props.state);
    // console.warn('PROPSCHECK', this.props.check);
    // console.warn('SOME', this.props.some);
    const { workOut, PRE, timeDate, focus, nextWorkoutTree } = this.props;
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
            // console.warn('LOL', nextWorkoutTree)
            Array.isArray(nextWorkoutTree.liveWorkoutComponents) &&
            nextWorkoutTree.liveWorkoutComponents.map((item, index) => {
              return(this.renderItem(item, index));
            })
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
  viewRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  viewItems: {
    marginTop: 30,
  },
  viewItem: {
    justifyContent: 'center',
    marginLeft: 20,
    width: (width / 1.2),
  },
  textExercizeName: {
    color: '#7b7b7b',
    fontWeight: '700',
    fontSize: 17,
    width: (width / 1.4),
  },
  checkboxStyle: {
    tintColor: '#979797',
    borderWidth: 2.8,
    borderColor: '#979797',
    backgroundColor: '#ededed',
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
