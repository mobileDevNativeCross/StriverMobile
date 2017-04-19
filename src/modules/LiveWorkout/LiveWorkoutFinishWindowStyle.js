import { StyleSheet, Dimensions, Platform } from 'react-native';
import { regular, bold, medium} from 'AppFonts';
import {
  MKColor,
} from 'react-native-material-kit';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  viewFinishWindow: {
    position: 'absolute',
    width,
  },
  container: {
    width,
    height,
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, .3)',
    alignItems: 'center',
  },
  viewFinish: {
    borderRadius: 2,
    width: width - 30,
    backgroundColor: 'white',
    alignSelf: 'center',
    marginVertical: 10,
    ...Platform.select({
      ios: {
        shadowOffset: {
          width: 0,
          height: 1,
        },
      },
      android: {
        elevation: 2,
      },
    }),
  },
  keyboardAvoidingViewFinish: {
    paddingTop: 0,
    backgroundColor: 'white',
  },
  viewPadding: {
    padding: 16,
  },
  viewIntensityScore: {
    width: (width - 60),
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  viewFocusScore: {
    width: (width - 60),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  fieldTitle: {
    color: '#7b7b7b',
    fontSize: 18,
    fontFamily: bold,
  },
  viewFocusScoreText: {
    width: (width - 120),
    justifyContent: 'center',
  },
  viewIntensityScoreText: {
    width: (width - 120),
    justifyContent: 'center',
  },
  inputIntencityScore: {
    height: 30,
    width: 60,
  },
  inputTextComments: {
    marginTop: 5,
    height: 39,
  },
  viewTime: {
    marginTop: 10,
  },
  buttonText: {
    color: MKColor.Blue,
    fontFamily: bold,
    fontSize: 14,
    backgroundColor: 'transparent',
  },
  viewFinishButton: {
   flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
    borderStyle: 'solid',
    borderTopColor: 'rgba(0,0,0,0.1)',
    borderTopWidth: 1,
  },
  viewInputScore: {
    justifyContent: 'center',
  },
  viewError: {
    width: (width - 60),
    marginTop: 3,
    height: 18,
    alignItems: 'flex-end'
  },
  textError: {
    fontSize: 16,
    color: 'red',
    fontWeight: '600',
    fontFamily: medium,
  },

  button: {
    paddingHorizontal: 18,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8,
    marginLeft: 0,
  },

  viewComments: {
    width: (width - 60),
  },
  viewFinishWindowMargin: {
    ...Platform.select({
      ios: {
        paddingTop: 25,
      },
      android: {},
    })
  },
  textInputScore: {
    flex: 1,
    backgroundColor: 'white',
    color: '#7b7b7b',
    fontFamily: medium,
    fontSize: 16,
    textAlign: 'center',
  },
  textInputComments: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: -5,
    fontFamily: medium,
    color: '#7b7b7b',
    fontSize: 16,
    textAlignVertical: 'bottom',
  },
});

export default styles;
