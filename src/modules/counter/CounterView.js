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
  Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import store from '../../redux/store';
import moment from 'moment';

const displayWidth = Dimensions.get('window').width;
const displayHeight = Dimensions.get('window').height;
const fontColor = 'rgb(110,110,110)';

const dataSource = [
  {
    exercise: {
      name: 'Ex 1',
    },
  },
  {
    exercise: {
      name: 'Ex 2',
    },
  },
  {
    exercise: {
      name: 'Ex 3',
    },
  },
  {
    exercise: {
      name: 'Ex 4',
    },
  },
  {
    exercise: {
      name: 'Ex 5',
    },
  },
  {
    exercise: {
      name: 'Ex 6',
    },
  },
];

class CounterView extends Component{
// const CounterView = React.createClass({
  constructor(props) {
    super(props);
    this.props.dispatch(CounterState.getWorkoutTree());
  }

/*
  // propTypes: {
  ///  //   counter: PropTypes.arrayOf(PropTypes.object),
  //   action: PropTypes.shape({
    //   onClose: PropTypes.func,
    //   onOpen: PropTypes.func,
  //   })
*/
  //   counter: PropTypes.number.isRequired,
  //   userName: PropTypes.string,
  //   userProfilePhoto: PropTypes.string,
  //   loading: PropTypes.bool.isRequired,
  //   dispatch: PropTypes.func.isRequired
  // },
  // increment() {
  //   this.props.dispatch(CounterState.increment());
  // },
  // reset() {
  //   this.props.dispatch(CounterState.reset());
  // },
  // random() {
  //   this.props.dispatch(CounterState.random());
  // },
  goToLiveWorkout() {
    this.props.dispatch(NavigationState.pushRoute({
      key: 'beginWorkout',
    }));
  }


  // renderUserInfo() {
  //   if (!this.props.userName) {
  //     return null;
  //   }
  //
  //   return (
  //     <View style={styles.userContainer}>
  //       <Image
  //         style={styles.userProfilePhoto}
  //         source={{
  //           uri: this.props.userProfilePhoto,
  //           width: 80,
  //           height: 80
  //         }}
  //       />
  //       <Text style={styles.linkButton}>
  //         Welcome, {this.props.userName}!
  //       </Text>
  //     </View>
  //   );
  // },

  renderItem(item) {
    // let strItem = JSON.stringify(item);
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
    // const loadingStyle = this.props.loading
    //   ? {backgroundColor: '#eee'}
    //   : null;
    const workoutTree = JSON.stringify(this.props.nextWorkoutTree, null, 3);

    const workoutName = this.props.nextWorkoutTree.workoutName;
    const intensityScore = this.props.nextWorkoutTree.intensityScore;
    const Focus = this.props.nextWorkoutTree.goal;
    const rawWorkoutDate = this.props.nextWorkoutTree.workoutDate;
    const workoutDate = moment(rawWorkoutDate).format('LLL');
    const exercisesArr = this.props.nextWorkoutTree.liveWorkoutComponents;

    return (
      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={styles.titleText}>
            {(workoutName !== undefined) ? workoutName : "*Server didn't send workoutName*" }
          </Text>
          <Text style={styles.titleText}>
            {workoutDate}
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
          <ScrollView >
            {
              (Array.isArray(exercisesArr)) ?
              exercisesArr.map(item => { return(this.renderItem(item)); }) :
                <View />
            }
          </ScrollView>
        </View>
        <View style={styles.beginWorkoutButtonBox}>
          <TouchableOpacity onPress={() => {this.goToLiveWorkout()}} style={styles.beginWorkoutButton}>
            <Text style={{fontSize: 16, color: fontColor, fontWeight: '700'}}>Begin Workout</Text>
          </TouchableOpacity>
        </View>
        {
        // <Text>
        //   {workoutTree}
        // </Text>
      }
      </View>
    );
  }
};

// const circle = {
//   borderWidth: 0,
//   borderRadius: 40,
//   width: 80,
//   height: 80
// };

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
    height: 200,
    width: displayWidth,
    paddingVertical: 14,
    paddingHorizontal: 40,
    backgroundColor: 'rgb(231,231,231)',
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
    position: 'absolute',
    bottom: 55, width: displayWidth,
    alignItems: 'center',
  },
  beginWorkoutButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 2,
    borderColor: 'rgb(130,130,130)',
  },
});

export default CounterView;
