import * as CounterState from './CounterState';
import * as NavigationState from '../../modules/navigation/NavigationState';
import React, {PropTypes, Component} from 'react';
import {
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  View,
  ScrollView,
  ListView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import store from '../../redux/store';
import moment from 'moment';
import BackgroundTimer from 'react-native-background-timer';
import NavButton from '../../components/NavButton'

const displayWidth = Dimensions.get('window').width;
const displayHeight = Dimensions.get('window').height;
const fontColor = 'rgb(110,110,110)';

class CounterView extends Component{
  state = {
    isLoaded: false,
  }

  componentDidMount() {
    this.props.dispatch(CounterState.getWorkoutTree());
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.nextWorkoutToken && !this.state.isLoaded) {
      this.setState({ isLoaded: true });
      this.props.dispatch(CounterState.getWorkoutTree());
    }
  }

  goToLiveWorkout() {
    this.props.dispatch(NavigationState.pushRoute({
      key: 'beginWorkout',
    }));
  }

  renderItem(item) {
    return (
      <View style={styles.exerciseItem}>
      <Icon name="dot-single"
      size={20}
      color={fontColor}
      />
      <Text style={{fontSize: 18,
        color: fontColor,
        fontWeight: '700',fontWeight: '600', marginLeft: 10}}>
        {item.Exercise.name}
      </Text>
        </View>
      );
    }

  render() {
    const workoutTree = JSON.stringify(this.props.nextWorkoutTree, null, 3);
    const workoutName = this.props.nextWorkoutTree.workoutName;
    const intensityScore = this.props.nextWorkoutTree.intensityScore;
    const Focus = this.props.nextWorkoutTree.goal;
    const rawWorkoutDate = (this.props.nextWorkoutTree.workoutDate == undefined) ? "" : this.props.nextWorkoutTree.workoutDate;
    const workoutDate = moment(rawWorkoutDate).format('L');
    const exercisesArr = this.props.nextWorkoutTree.liveWorkoutComponents;

    return (
      <View style={styles.container}>
        <ScrollView>
          <View>
            <View style={styles.title}>
              {
                // <Text style={styles.titleText}>
                //   {(workoutName !== undefined) ? workoutName : "*Server didn't send workoutName*" }
                // </Text>
              }
              <Text style={styles.titleText}>
                {
                  workoutDate == 'Invalid date'
                    ? 'Loading...'
                    : workoutDate
                }
              </Text>
              <Text style={styles.titleText}>
                Intensity Score: {intensityScore}
              </Text>
              <Text style={styles.titleText}>
               Focus: {Focus}
              </Text>
            </View>
            <View style={styles.exercises}>
              <Text style={styles.exText}>
                Exercises:
              </Text>
              <View >
                {
                  (Array.isArray(exercisesArr))
                  ?
                    exercisesArr.map(item => { return(this.renderItem(item)); })
                  :
                    <View style={styles.exercisesLoading}>
                      <ActivityIndicator color={'#7b7b7b'} size={Platform.OS === 'android' ? 15 : "small"} />
                    </View>
                }
              </View>
            </View>
          </View>
          <View style={styles.beginWorkoutButtonBox}>
            <TouchableOpacity onPress={() => {this.goToLiveWorkout()}} style={styles.beginWorkoutButton}>
              <Text style={{fontSize: 16, color: fontColor, fontWeight: '700', backgroundColor: 'transparent'}}>Begin Workout</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <NavButton />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  title: {
    width: displayWidth,
    paddingVertical: 25,
    paddingHorizontal: 40,
    backgroundColor: 'white',
  },
  titleText: {
    fontSize: 20,
    color: fontColor,
    fontWeight: '700',
    marginVertical: 5,
    backgroundColor: 'white',
  },
  exListMarker:{
    height: 10,
    width: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  exercises: {
    width: displayWidth,
    paddingVertical: 14,
    paddingHorizontal: 40,
    backgroundColor: 'rgb(231,231,231)',
  },
  exercisesLoading: {
    height: 200,
    width: displayWidth,
    justifyContent: 'center',
    marginLeft: -40,
    alignItems: 'center',
  },
  exerciseItem: {
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: 4,
    marginVertical: 6,
  },
  exText: {
    fontSize: 18,
    color: 'rgb(110,110,110)',
    fontWeight: '700',
    marginBottom: 17,
  },
  beginWorkoutButtonBox: {
    width: displayWidth,
    alignItems: 'center',
    paddingBottom: 55
  },
  beginWorkoutButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 2,
    borderColor: 'rgb(130,130,130)',
    marginTop: 25,
  },
});

export default CounterView;
