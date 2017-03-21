import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Dimensions
} from 'react-native';
import Display from 'react-native-display';
import Icon from 'react-native-vector-icons/Entypo';

const displayWidth = Dimensions.get('window').width;
const displayHeight = Dimensions.get('window').height;

class NavButton extends Component {
  state = {
    navMenuShow: false,
  };

  navMenuButtonPress = () => {
    let toggle = !this.state.navMenuShow;
    this.setState({navMenuShow: toggle})
  }

  render() {
    return (
      <View style={styles.navMenuButtonContainer}>
      <Display
      enable = {this.state.navMenuShow}
      enterDuration = {500}
      exitDuration = {250}
      exit = "fadeOut"
      enter = "fadeIn"
      >
        <View style={styles.navMenuBackground}>
          <TouchableOpacity
            style={{height: displayHeight, width: displayWidth}}
            onPress={() => this.navMenuButtonPress()}
          >
          </TouchableOpacity>
          <View style={styles.navMenu}>
            <Text style={styles.navMenuText}>
              Home
            </Text>
            <View style={{backgroundColor: 'white', height: 1, width: 90,}}></View>
            <Text style={styles.navMenuText}>
              History
            </Text>
          </View>
        </View>
      </Display>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.navMenuButtonPress()}
        >
        <Icon name="circle-with-plus"
        size={52}
        color="rgb(129,129,129)"
        />
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  navMenuButtonContainer:{
    position: 'absolute',
    bottom: 30,
    right: 30,
    height: 48,
    width: 48,
  },
  button: {
    position: 'absolute',
    backgroundColor: 'transparent',
    // width: 46,
    // height: 46,
    // borderRadius: 23,
    justifyContent:  'center',
    alignItems: 'center',
  },
  navMenuBackground:{
    bottom: displayHeight-46-30, //displayHeight - buttonWidth - navMenuButtonContainer->bottom
    right: displayWidth-46-30, //displayWidth - buttonWidth - navMenuButtonContainer->right
    backgroundColor: 'rgba(255,255,255,0.55)',
    height: displayHeight,
    width: displayWidth,
    // backgroundColor: 'green',
  },
  navMenu: {
    position: 'absolute',
    bottom: 20,
    right: 10,
    height: 153,
    width: 180,
    backgroundColor: 'rgb(167, 167, 167)',
    padding: 15,
  },
  navMenuText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
    margin: 10,
  },
});

export default NavButton;
