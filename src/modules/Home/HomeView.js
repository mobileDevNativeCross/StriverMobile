import * as HomeState from './HomeState';
import * as AppState from '.././AppState';
import * as NavigationState from '../navigation/NavigationState';
import React, {Component} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Platform,
  ActivityIndicator,
  AsyncStorage,
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import moment from 'moment';
import NavButton from '../../components/NavButton'
import * as MK from 'react-native-material-kit';
import * as auth0 from '../../services/auth0';
import { regular, bold, medium} from 'AppFonts';


const displayWidth = Dimensions.get('window').width;
// const displayHeight = Dimensions.get('window').height;
const fontColor = 'rgb(110,110,110)';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  title: {
    // width: displayWidth,
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
  exercises: {
    // width: displayWidth,
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
    // paddingRight: 10,
    paddingLeft: 8,
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
    marginLeft: 10,
    flex: 1,
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
  getTheme
} = MK;
const BeginWorkout = MKButton.coloredButton()
  .withBackgroundColor(MKColor.Blue)
  .withStyle([styles.liveWorkoutButton, {height: 36, elevation: 2}])
  .build();

const theme = getTheme();
// let a = false;

class HomeView extends Component{

  state = {
    isLoaded: false,
    checkEnter: true,
  }

  componentWillMount() {
    AsyncStorage.getItem('currentToken')
      .then(token => {
        if (token) {
          this.props.dispatch(AppState.setTokenToRedux(JSON.parse(token)));
        }
      })
      .then(() => {
        const { reduxCurrentToken, state } = this.props;
        const currentToken = reduxCurrentToken.idToken;
        if (currentToken) {
          fetch('https://strivermobile-api.herokuapp.com/api/private',{
            method: 'GET',
            headers: {
              'Authorization': 'Bearer ' + currentToken
            }
          })
          .then((response) => {
            if ((response.status == 401) && (response.ok == false) && (response._bodyText === 'Unauthorized', '\\n')) {
              console.warn('Unauthorized');
              auth0.showLogin()
                .catch(e => console.log('error in showLogin()', e))
            }
            return response.json();
          })
          .catch((e) => {
            console.log('error in getWorkoutTree(): ', e);
          });
        }
      })
      .catch(e => {console.log('error in getItem(\'newToken\') in reducer', e)})
    AsyncStorage.getItem('workoutTree').then(result => {
      if (result) {
        this.props.dispatch(HomeState.setWorkoutTree(JSON.parse(result)));
      }
    })
    .catch (e => {console.warn(e)});
  }

  goToLiveWorkout() {
    if (this.props.checkEnter) {
      let beginWorkoutTime = moment().format();
      AsyncStorage.setItem('beginWorkoutTime', beginWorkoutTime);
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
    const workoutName = this.props.nextWorkoutTree.workoutName;
    const intensityScore = this.props.nextWorkoutTree.intensityScore;
    const focus = this.props.nextWorkoutTree.goal;
    const rawWorkoutDate = (this.props.nextWorkoutTree.workoutDate == undefined) ? "" : this.props.nextWorkoutTree.workoutDate;
    const workoutDate = moment(rawWorkoutDate).format('L');
    const { nextWorkoutTree, state} = this.props;
    return (
      <View style={styles.container}>
        <ScrollView >
          <View style={[theme.cardStyle, {borderWidth: 0, borderRadius: 2, width: displayWidth - 30, alignSelf: 'center', marginTop: 3, shadowOffset: {width: 0, height: 1}, elevation: 2}]}>
            <View style={[styles.title, {borderTopRightRadius: 2, borderTopLeftRadius: 2,}]}>
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
                  Intensity: {intensityScore}
                </Text>
              </View>
              <View style={styles.titleBox}>
                <Text style={styles.titleText}>
                 Focus: {focus}
                </Text>
              </View>
            </View>
            <View style={[styles.exercises, {borderBottomRightRadius: 2, borderBottomLeftRadius: 2,}]}>
              <Text style={styles.exText}>
                Exercises:
              </Text>
              <View  >
                {

                  nextWorkoutTree.liveWorkoutComponents &&
                  Array.isArray(nextWorkoutTree.liveWorkoutComponents) &&
                  nextWorkoutTree.liveWorkoutComponents.length > 0
                  ?
                    nextWorkoutTree.liveWorkoutComponents.map(item => { return(this.renderItem(item)); })
                  :
                    <View style={styles.exercisesLoading}>
                      <ActivityIndicator
                        color={'#7b7b7b'}
                        size={Platform.OS === 'android' ? 15 : "small"}
                      />
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
        {/* <NavButton /> */}
      </View>
    );
  }
};

export default HomeView;
