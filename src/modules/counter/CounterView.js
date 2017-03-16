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
  // bored() {
  //   this.props.dispatch(NavigationState.pushRoute({
  //     key: 'Color',
  //     title: 'Color Screen'
  //   }));
  // },

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
          {item.exercise.name}
        </Text>
      </View>
    );
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
  render() {
    // const loadingStyle = this.props.loading
    //   ? {backgroundColor: '#eee'}
    //   : null;
    return (
      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={styles.titleText}>
            Name of workout
          </Text>
          <Text style={styles.titleText}>
            Date
          </Text>
          <Text style={styles.titleText}>
            PRE Score
          </Text>
          <Text style={styles.titleText}>
           Focus: XXXXXX
          </Text>
        </View>
        <View style={styles.exercises}>
          <Text style={styles.exText}>
            Exercises:
          </Text>
          <ScrollView>
            {dataSource.map(item => { return(this.renderItem(item)); })}
          </ScrollView>
        </View>
        <TouchableOpacity style={styles.beginWorkoutButton}>
          <Text style={{fontSize: 16, color: fontColor, fontWeight: '700'}}>Begin Workout</Text>
        </TouchableOpacity>
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
  beginWorkoutButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 25,
    borderWidth: 2,
    borderColor: 'rgb(130,130,130)',
  },
});

export default CounterView;
