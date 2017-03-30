import * as HomeState from './HomeState';
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
  AsyncStorage,
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import store from '../../redux/store';
import moment from 'moment';
import NavButton from '../../components/NavButton'
import * as MK from 'react-native-material-kit';
import { regular, bold, medium} from 'AppFonts';

const displayWidth = Dimensions.get('window').width;
const displayHeight = Dimensions.get('window').height;
const fontColor = 'rgb(110,110,110)';

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
  titleBox:{
    height: 48,
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 20,
    color: fontColor,
    backgroundColor: 'white',
    fontFamily: bold
  },
  exListMarker:{
    height: 10,
    width: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  exercises: {
    width: displayWidth,
    paddingVertical: 14,
    backgroundColor: 'rgb(231,231,231)',
  },
  exercisesLoading: {
    height: 200,
    width: displayWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
  exerciseItem: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginVertical: 6,
  },
  exText: {
    fontSize: 18,
    color: 'rgb(110,110,110)',
    fontWeight: '700',
    marginBottom: 17,
    paddingLeft: 16,
    fontFamily: bold,
  },
  exerciseItemText: {
    fontSize: 18,
    color: fontColor,
    fontFamily: regular,
    marginLeft: 10
  },
  liveWorkoutButtonBox: {
    width: displayWidth,
    alignItems: 'center',
    paddingBottom: 55
  },
  liveWorkoutButton: {
    paddingHorizontal: 16,
    marginTop: 25,
  },
});

const {
  MKButton,
  MKColor,
} = MK;
const BeginWorkout = MKButton.coloredButton()
  .withBackgroundColor(MKColor.Blue)
  .withStyle([styles.liveWorkoutButton, {height: 36,}])
  .build();


class HomeView extends Component{
  state = {
    isLoaded: false,
    checkEnter: true,
  }

  componentWillMount() {
    AsyncStorage.getItem('workoutTree').then(result => {
      if (result) {
        this.props.dispatch(HomeState.setWorkoutTree(JSON.parse(result)));
      }
    });
    this.props.dispatch(HomeState.checkEnter(true));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.nextWorkoutToken && !this.state.isLoaded) {
      this.setState({ isLoaded: true });
    }
  }

  goToLiveWorkout() {
    if (this.props.checkEnter) {
      this.props.dispatch(NavigationState.pushRoute({
        key: 'liveWorkout',
      }));
    }
  }

  renderItem(item) {
    return (
      <View key={item._id} style={styles.exerciseItem}>
        <Icon
          name="dot-single"
          size={20}
          color={fontColor}
        />
        <Text style={styles.exerciseItemText}>
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
    // const exercisesArr = this.props.nextWorkoutTree.liveWorkoutComponents;

    return (
      <View style={styles.container}>
        <ScrollView>
          <View>
            <View style={styles.title}>
              {
                // <View style={styles.titleBox}>
                //   <Text style={styles.titleText}>
                //     {(workoutName !== undefined) ? workoutName : "*Server didn't send workoutName*" }
                //   </Text>
                // </View>
              }
              <View style={styles.titleBox}>
                <Text style={styles.titleText}>
                  {
                    workoutDate == 'Invalid date'
                      ? 'Loading...'
                      : workoutDate
                  }
                </Text>
              </View>
              <View style={styles.titleBox}>
                <Text style={styles.titleText}>
                  Intensity Score: {intensityScore}
                </Text>
              </View>
              <View style={styles.titleBox}>
                <Text style={styles.titleText}>
                 Focus: {Focus}
                </Text>
              </View>
            </View>
            <View style={styles.exercises}>
              <Text style={styles.exText}>
                Exercises:
              </Text>
              <View >
                {
                  this.props.nextWorkoutTree.liveWorkoutComponents &&
                  Array.isArray(this.props.nextWorkoutTree.liveWorkoutComponents) &&
                  this.props.nextWorkoutTree.liveWorkoutComponents.length > 0
                  ?
                    this.props.nextWorkoutTree.liveWorkoutComponents.map(item => { return(this.renderItem(item)); })
                  :
                    <View style={styles.exercisesLoading}>
                      <ActivityIndicator color={'#7b7b7b'} size={Platform.OS === 'android' ? 15 : "small"} />
                    </View>
                }
              </View>
            </View>
          </View>
          <View style={styles.liveWorkoutButtonBox}>
            <BeginWorkout onPress={() => {this.goToLiveWorkout()}}>
              <Text
                pointerEvents="none"
                style={{color: 'white', fontFamily: bold, fontSize: 14}}
              >
                Begin Workout
              </Text>
            </BeginWorkout>
          </View>
        </ScrollView>
        <NavButton />
      </View>
    );
  }
};

export default HomeView;
