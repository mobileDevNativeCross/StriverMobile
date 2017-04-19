import { StyleSheet, Dimensions, Platform } from 'react-native';
import { regular, bold, medium} from 'AppFonts';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    width,
  },
  container: {
    paddingTop: Platform.OS === 'android' ? 0 : 25,
    backgroundColor: 'white',
  },
  activityIndicator: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewHead: {
    paddingHorizontal: 40,
  },
  viewHeadItem: {
    height: 48,
    justifyContent: 'center',
  },
  textTop: {
    color: '#7b7b7b',
    fontSize: 20,
    fontFamily: bold,
  },
  viewTouchOpacityComplete: {
    width,
    alignItems: 'center',
  },
  completeWorkoutButton: {
    paddingHorizontal: 16,
    marginTop: 25,
    height: 36,
  },
  textComplete: {
    fontSize: 15,
    color: '#7b7b7b',
    fontWeight: '600',
  },
  touchableItem: {
    paddingVertical: 10,
  },
  viewRow: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: (width - 30),
    alignItems: 'center',
  },
  viewItems: {
    marginTop: 30,
  },
  viewItem: {
    justifyContent: 'center',
    width: (width),
  },
  textExercizeName: {
    color: '#7b7b7b',
    fontSize: 17,
    width: (width / 1.4),
    fontFamily: bold
  },
  viewSetsFlex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: (width / 1.5),
  },
  viewSets: {
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 5,
  },
  textSets: {
    color: '#7b7b7b',
    fontSize: 16,
    fontFamily: bold
  },
  viewSetHead: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
  },
  viewFlexDirectionSet: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: (width / 1.5),
  },
  viewSetsArray: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 5,
  },
  viewSetParam: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    marginTop: 5,
  },
  textSetParam: {
    color: '#7b7b7b',
    fontSize: 16,
  },
  textCompleteButton: {
    fontFamily: bold,
    fontSize: 14,
  },
  checkBox: {
    width: 24,
    height: 24,
  },
  textStyleUnActiveButton: {
    color: 'rgba(0,0,0,0.26)',
    shadowRadius: 0,
    elevation: 0,
  },
  textStyleActiveButton: {
    color: 'white',
  },
  unActiveButtonStyle: {
    shadowRadius: 0,
    elevation: 0,
  },
});

export default styles;
