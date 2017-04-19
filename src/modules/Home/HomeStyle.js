import { StyleSheet, Dimensions } from 'react-native';
import { regular, bold, medium} from 'AppFonts';

const displayWidth = Dimensions.get('window').width;
const fontColor = 'rgb(110,110,110)';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  workoutInfo: {
    borderWidth: 0,
    borderRadius: 2,
    width: displayWidth - 30,
    alignSelf: 'center',
    marginTop: 3,
    shadowOffset: {
      width: 0,
      height: 1
    },
    elevation: 2,
  },
  title: {
    paddingVertical: 25,
    paddingHorizontal: 40,
    backgroundColor: 'white',
    borderTopRightRadius: 2,
    borderTopLeftRadius: 2,
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
    paddingVertical: 14,
    backgroundColor: 'rgb(231,231,231)',
    borderBottomRightRadius: 2,
    borderBottomLeftRadius: 2,
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
  buttonText: {
    color: 'white',
    fontFamily: bold,
    fontSize: 14
  },
  liveWorkoutButton: {
    paddingHorizontal: 16,
    marginTop: 25,
    height: 36,
    elevation: 2,
  },
});

export default styles;
