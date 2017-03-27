import React, {PropTypes} from 'react';
import {
  NavigationExperimental,
  View,
  StyleSheet,
  Dimensions,
  Image,
  Text,
} from 'react-native';
const {
  CardStack: NavigationCardStack,
  Header: NavigationHeader,
  PropTypes: NavigationPropTypes
} = NavigationExperimental;
import AppRouter from '../AppRouter';

const logo = require('../../assets/logo.png');
const { width, height } = Dimensions.get('window');

const NavigationView = React.createClass({
  propTypes: {
    onNavigateBack: PropTypes.func.isRequired,
    navigationState: PropTypes.shape({
      tabs: PropTypes.shape({
        routes: PropTypes.arrayOf(PropTypes.shape({
          key: PropTypes.string.isRequired,
          title: PropTypes.string.isRequired
        })).isRequired
      }).isRequired,
      HomeTab: NavigationPropTypes.navigationState.isRequired,
      BeginWorkout: NavigationPropTypes.navigationState.isRequired,
    }),
    pushRoute: PropTypes.func.isRequired
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
  renderScene(sceneProps) {
    // render scene and apply padding to cover
    // for app bar and navigation bar
    return (
      <View style={styles.sceneContainer}>
        {AppRouter(sceneProps)}
      </View>
    );
  },
  render() {
    const {tabs} = this.props.navigationState;
    const tabKey = tabs.routes[tabs.index].key;
    const scenes = this.props.navigationState[tabKey];
    return (
      <View style={styles.container}>
        <NavigationCardStack
          key={'stack_' + tabKey}
          onNavigateBack={this.props.onNavigateBack}
          navigationState={scenes}
          renderHeader={this.renderHeader}
          renderScene={this.renderScene}
        />
      </View>
    );
  }
});

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
 },
});

export default NavigationView;
