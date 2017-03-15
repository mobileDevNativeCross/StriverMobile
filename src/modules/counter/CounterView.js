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
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo'

const fontColor = 'rgb(110,110,110)';
const displayWidth = Dimensions.get('window').width;
const displayHeight = Dimensions.get('window').height;
class CounterView extends Component{
  componentDidMount(){
    console.log('Trying read token from state(.get): ', this.props.currentState);
  }

  propTypes: {
    dispatch: PropTypes.func.isRequired
  }
  constructor() {
    super();
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      chack: false,
      dataSource: [
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
      ],
    }
  }

  renderItem = (rowData, sectionId, rowId) => {
    return (
      <View style={styles.exerciseItem}>
        <Icon name="dot-single"
          size={20}
          color={fontColor}
        />
        <Text style={{fontSize: 18,
        color: fontColor,
        fontWeight: '700',fontWeight: '600', marginLeft: 10}}>
          {rowData}
        </Text>
      </View>
    );
  }
  renderItemTwo = (item) => {
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

  render() {
    // const { name } - this.props;
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
            {this.state.dataSource.map(item => { return(this.renderItemTwo(item)); })}
          </ScrollView>
        </View>
        <TouchableOpacity style={styles.beginWorkoutButton}>
          <Text style={{fontSize: 16, color: fontColor, fontWeight: '700'}}>Begin Workout</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

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
