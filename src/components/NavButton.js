import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Dimensions,
  Image
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
          style={{
            height: displayHeight,
            width: displayWidth,
            bottom: displayHeight-52-35,
            right: displayWidth-46-27,
          }}
        >
          <View style={styles.navMenuBackground}>
            <TouchableOpacity
              style={{height: displayHeight, width: displayWidth}}
              onPress={() => this.navMenuButtonPress()}
            >
            </TouchableOpacity>
            <View style={styles.navMenu}>
              <TouchableOpacity>
                <Text style={styles.navMenuText}>
                  Home
                </Text>
              </TouchableOpacity>
              <View style={{backgroundColor: 'white', height: 1, width: 90,}}></View>
              <TouchableOpacity>
                <Text style={styles.navMenuText}>
                  History
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Display>
        <TouchableOpacity
          style={this.state.navMenuShow
            ? styles.buttonCross
            : styles.button}
          onPress={() => this.navMenuButtonPress()}
        >
          <View style={this.state.navMenuShow ? styles.transform : styles.transformNull}>
            <Image
              source={require('../assets/plus.png')}
              style={{
                width: 25,
                height: 25,
                tintColor: '#FFFFFF'
              }}
            />
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

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
    height: 46,
    width: 46,
  },
  button: {
    position: 'absolute',
    right: 0,
    justifyContent:  'center',
    alignItems: 'center',
    height: 46,
    width: 46,
    borderRadius: 23,
    backgroundColor: 'rgb(129,129,129)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonCross: {
    right: 0,
    position: 'absolute',
    justifyContent:  'center',
    alignItems: 'center',
    height: 46,
    width: 46,
    borderRadius: 23,
    backgroundColor: 'rgb(129,129,129)',
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
