import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Dimensions,
  Image,
  Platform,
  Animated,
} from 'react-native';
import Display from 'react-native-display';
import Icon from 'react-native-vector-icons/Entypo';
import * as MK from 'react-native-material-kit';
import { regular, bold, medium} from 'AppFonts';

const displayWidth = Dimensions.get('window').width;
const displayHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  transform: {
    transform: [
      {rotate: '45deg'},
    ],
  },
  transformNull: {
    transform: [
      {rotate: '0deg'},
    ],
  },
  navMenuButtonContainer:{
    position: 'absolute',
    bottom: 35,
    right: 27,
    height: 56,
    width: 56,
  },
  button: {

    height: 70,
    width: 70,
    position: 'absolute',
    right: 0,
    justifyContent:  'center',
    alignItems: 'center',
    borderRadius: Platform.OS === 'android' ? 70 : 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navMenuBackground:{
    backgroundColor: 'rgba(255,255,255,0.55)',
    height: displayHeight,
    width: displayWidth,
  },
  navMenu: {
    position: 'absolute',
    bottom: 20,
    right: 10,
    height: 153,
    width: 180,
    backgroundColor: 'rgb(167, 167, 167)',
    paddingTop: 15,
    paddingRight: 10,
  },
  navMenuText: {
    color: 'white',
    fontSize: 18,
    fontFamily: bold,
  },
  navButton: {
    height: displayWidth <= 460 ? 40 : 56,
    width: displayWidth <= 460 ? 40 : 56,
  },
  viewFlexDirection: {
    flexDirection: 'row',
  },
  viewHome: {
    marginTop: 7,
    marginLeft: 10,
    paddingTop: 5,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 20,
    borderBottomWidth: 1,
    borderColor: 'white',
  },
  viewHistory: {
    marginTop: 5,
    marginLeft: 10,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
  },
});

const {
 MKButton,
 MKColor,
} = MK;
const ColoredFab = MKButton.coloredFab()
  .withBackgroundColor(MKColor.Blue)
  .withStyle(styles.navButton)
  .build();


class NavButton extends Component {

  state = {
    navMenuShow: false,
    spinValue: new Animated.Value(0),
  };

  navMenuButtonPress = () => {
    let toggle = !this.state.navMenuShow;
    this.setState({navMenuShow: toggle});

    this.spin(toggle ? 1 : 0);
  }

  backgroundNavMenuPress = () => {
    this.setState({navMenuShow: false});

    this.spin(0);
  }

  spin (toValue) {
  	Animated.timing(
    	this.state.spinValue,
      {
      	toValue,
        duration: 300,
      }
    ).start()
  }


  render() {
    const spin = this.state.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '45deg']
    })
    return (
      <View style={styles.navMenuButtonContainer}>
        <Display
          enable = {this.state.navMenuShow}
          enterDuration = {500}
          exitDuration = {250}
          exit = "fadeOut"
          enter = "fadeIn"
          style={{
            height: displayHeight,
            width: displayWidth,
            bottom: displayHeight-56-35,
            right: displayWidth-56-27,
          }}
        >
          <View style={styles.navMenuBackground}>
            <TouchableOpacity
              style={{height: displayHeight, width: displayWidth}}
              onPress={() => this.backgroundNavMenuPress()}
            >
            </TouchableOpacity>
            <View style={styles.navMenu}>
              <TouchableOpacity onPress={() => {this.props.onPressHome()}} style={styles.touchOpacityMenuHome}>
                <View style={styles.viewFlexDirection}>
                  <View style={styles.viewHome}>
                    <Text
                      style={styles.navMenuText}
                      >
                      {this.props.titleHome ? this.props.titleHome : 'Home'}
                    </Text>
                  </View>
                  <View style={{flex: 1}}></View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.touchOpacityMenuHistory}>
                <View style={styles.viewHistory}>
                  <Text style={styles.navMenuText}>
                    History
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Display>
        <Animated.View
          style={[
            styles.button
          ]}
        >
          <ColoredFab
            onPress={() => this.navMenuButtonPress()}
          >
            <Animated.Image
              style={{ transform: [{rotate: spin}] }}
              pointerEvents="none"
              source={require('../assets/plus_white.png')}
            />
          </ColoredFab>
        </Animated.View>
      </View>
    )
  }
}

NavButton.propTypes = {
  titleHome: PropTypes.string,
  onPressHome: PropTypes.func,
}

NavButton.defaultProps = {
  onPressHome: () => {},
}

export default NavButton;
