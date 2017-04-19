import React, { PropTypes } from 'react';
import {
  NavigationExperimental,
  View,
  StyleSheet,
  Dimensions,
  Image,
  Text,
  Alert,
  AsyncStorage,
  StatusBar,
} from 'react-native';
import { bold, medium } from 'AppFonts';
import * as NavigationState from '../navigation/NavigationState';

const {
  CardStack: NavigationCardStack,
  Header: NavigationHeader,
  PropTypes: NavigationPropTypes
} = NavigationExperimental;
import AppRouter from '../AppRouter';
import {
  MKColor,
  MKButton,
} from 'react-native-material-kit';

const logo = require('../../assets/logo.png');
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sceneContainer: {
    flex: 1,
  },
  viewLogo: {
    backgroundColor: 'white',
    width,
    paddingTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textLogo: {
    marginLeft: 2,
    fontWeight: '600',
    fontSize: 23,
  },
  imageLogo: {
    width: 30,
    height: 50,
    tintColor: MKColor.LightBlue,
  },
  footerButtons: {
    width: (width / 2),
    borderRadius: 0,
    height: 45,
    shadowRadius: 0,
    elevation: 0,
  },
  textFooterButtons: {
    color: 'white',
    fontFamily: medium,
    fontSize: 20,
  },
  viewFooter: {
    width,
    height: 45,
    flexDirection: 'row',
  },
});

const ButtonGoHome = MKButton.coloredButton()
  .withBackgroundColor(MKColor.Blue)
  .withStyle(styles.footerButtons)
  .build();
const ButtonGoToHistory = MKButton.coloredButton()
  .withBackgroundColor(MKColor.Blue)
  .withStyle(styles.footerButtons)
  .build();

const NavigationView = React.createClass({
  propTypes: {
    navigationState: PropTypes.shape({
      tabs: PropTypes.shape({
        routes: PropTypes.arrayOf(PropTypes.shape({
          key: PropTypes.string.isRequired,
          title: PropTypes.string.isRequired
        })).isRequired
      }).isRequired,
      HomeTab: NavigationPropTypes.navigationState.isRequired,
      LiveWorkout: NavigationPropTypes.navigationState.isRequired,
      History: NavigationPropTypes.navigationState.isRequired,
    }),
    checkEnter: PropTypes.bool.isRequired,
    pushRoute: PropTypes.func.isRequired,
    onNavigateBack: PropTypes.func.isRequired,
    containerGetPrevNavigationState: PropTypes.func.isRequired,
    getWindowFinishVisible: PropTypes.func.isRequired,
    backToFirstPage: PropTypes.func.isRequired,
    exit_backToHomeFromLiveWorkout: PropTypes.func.isRequired,
    pause_backToHomeFromLiveWorkout: PropTypes.func.isRequired,
  },

  // NavigationHeader accepts a prop style
  // NavigationHeader.title accepts a prop textStyle
  renderHeader(sceneProps) {
    return (
      <View style={styles.viewLogo}>
        <Image resizeMode="contain" style={styles.imageLogo} source={logo} />
        <Text style={styles.textLogo}>
          striver
        </Text>
      </View>
    );
  },

  // fixing a bug with not saving current Scene
  // componentWillMount(){
  //   this.props.containerGetPrevNavigationState();
  // },

  componentWillMount() {
    this.props.getWindowFinishVisible();
    StatusBar.setBackgroundColor('white', true);
  },

  renderScene(sceneProps) {
    // render scene and apply padding to cover
    // for app bar and navigation bar
    return (
      <View style={styles.sceneContainer}>
        {AppRouter(sceneProps)}
      </View>
    );
  },

  saveWoroutTime() {
    let endWorkoutTime = moment().format();
    AsyncStorage.getItem('beginWorkoutTime')
      .then((asyncStartWorkoutTime) => {
        startWorkoutTime = asyncStartWorkoutTime;
        AsyncStorage.getItem('savedWorkoutTime')
          .then((savedWorkoutTime) => {
            savedWorkoutTime = JSON.parse(savedWorkoutTime)
            let totalWorkoutDuration = moment(endWorkoutTime).diff(moment(startWorkoutTime)) + savedWorkoutTime;
            AsyncStorage.setItem('savedWorkoutTime', JSON.stringify(totalWorkoutDuration));
          })
          .catch(error => console.warn('err. in getItem(\'savedWorkoutTime\') - Nav View', error));
      })
      .catch(error => console.warn('err. in getItem(\'beginWorkoutTime\') - Nav View', error));
  },

  goHomeFromLiveWorkout() {
    return (
      Alert.alert(
        'Warning',
        'Are you sure you want to exit workout?',
        [
          {text: 'Cancel', onPress: () => {}},
          {text: 'Pause', onPress: ()=> {
            this.saveWoroutTime();
            this.props.pause_backToHomeFromLiveWorkout()
          }},
          {text: 'Exit', onPress: ()=> {
            AsyncStorage.setItem('savedWorkoutTime', '0');
            this.props.exit_backToHomeFromLiveWorkout()}
          },
        ]
      )
    );
  },

  goHistoryFromLiveWorkout() {
    Alert.alert(
      'Warning',
      'The workout will be paused. To continue workout after, press “Home” and “Begin Workout”',
      [
        {text: 'Cancel', onPress: () => {}},
        {text: 'OK', onPress: () => {
          this.saveWoroutTime();
          AsyncStorage.setItem('beginWorkoutTime', '');
          AsyncStorage.setItem('endWorkoutTime', '');
          this.props.pushRoute({ key: 'history' });
        }},
      ],
      { cancelable: true }
    )
  },

  goHome(sceneName) {
    switch (sceneName) {
      case 'home':
        break;
      case 'liveWorkout':
        this.goHomeFromLiveWorkout();
        break;
      case 'history':
        this.props.backToFirstPage();
        break;
      default:
        break;
    }
  },

  goHisroty(sceneName) {
    switch (sceneName) {
      case 'home':
        this.props.pushRoute({ key: 'history' });
      case 'history':
        break;
      case 'liveWorkout':
        this.goHistoryFromLiveWorkout()
      default:
        break;
    }
  },

  renderFooter(sceneName) {
    return (
      <View style={styles.viewFooter}>
        <ButtonGoHome
          onPress={() => {this.goHome(sceneName)}}
        >
          <Text
            pointerEvents="none"
            style={styles.textFooterButtons}
          >
            Home
          </Text>
        </ButtonGoHome>
        <ButtonGoToHistory
          onPress={() => {this.goHisroty(sceneName)}}
        >
          <Text
            pointerEvents="none"
            style={styles.textFooterButtons}
          >
            History
          </Text>
        </ButtonGoToHistory>
      </View>
    );
  },

  render() {
    const {tabs} = this.props.navigationState; // put to AsyncStorage
    const tabKey = tabs.routes[tabs.index].key;
    const scenes = this.props.navigationState[tabKey];
    const indexScene = scenes.index;
    return (
      <View style={styles.container}>
        <NavigationCardStack
          key={'stack_' + tabKey}
          onNavigateBack={this.props.onNavigateBack}
          navigationState={scenes}
          renderHeader={this.renderHeader}
          renderScene={this.renderScene}
        />
        {this.renderFooter(scenes.routes[indexScene].key)}
      </View>
    );
  }
});

export default NavigationView;
