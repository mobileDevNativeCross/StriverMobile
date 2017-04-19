import * as HomeState from './HomeState';
import * as AppState from '.././AppState';
import * as NavigationState from '../navigation/NavigationState';
import React, { Component, PropTypes } from 'react';
import {
  Text,
  View,
  ScrollView,
  Platform,
  ActivityIndicator,
  AsyncStorage,
} from 'react-native';
import styles from './HomeStyle';
import Icon from 'react-native-vector-icons/Entypo';
import moment from 'moment';
import * as MK from 'react-native-material-kit';
import * as auth0 from '../../services/auth0';

const {
  MKButton,
  MKColor,
  getTheme
} = MK;
const BeginWorkout = MKButton.coloredButton()
  .withBackgroundColor(MKColor.Blue)
  .withStyle(styles.liveWorkoutButton)
  .build();

const theme = getTheme();

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
    this.props.dispatch(NavigationState.pushRoute({
      key: 'liveWorkout',
    }));
    let beginWorkoutTime = moment().format();
    AsyncStorage.setItem('beginWorkoutTime', beginWorkoutTime);
  }

  renderItem(item) {
    return (
      <View key={item._id} style={styles.exerciseItem}>
        <Icon
          name="dot-single"
          size={20}
          color={styles.fontColor}
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
        <ScrollView>
          <View style={[theme.cardStyle, styles.workoutInfo]}>
            <View style={styles.title}>
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
            <View style={styles.exercises}>
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
                style={styles.buttonText}
              >
                Begin Workout
              </Text>
            </BeginWorkout>
          </View>
        </ScrollView>
      </View>
    );
  }
};

HomeView.propTypes = {
  reduxCurrentToken: PropTypes.shape({
    tokenType: PropTypes.string,
    accessToken: PropTypes.string,
    idToken: PropTypes.string,
  }),
  nextWorkoutTree: PropTypes.object.isRequired,
};

export default HomeView;
