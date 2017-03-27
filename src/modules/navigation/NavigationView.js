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
// import TabBar from '../../components/TabBar';

// Customize bottom tab bar height here if desired
// const TAB_BAR_HEIGHT = 50;

const logo = require('../../assets/logo.png');
const { width, height } = Dimensions.get('window');

const NavigationView = React.createClass({
  propTypes: {
    onNavigateBack: PropTypes.func.isRequired,
    // onNavigateCompleted: PropTypes.func.isRequired,
    navigationState: PropTypes.shape({
      tabs: PropTypes.shape({
        routes: PropTypes.arrayOf(PropTypes.shape({
          key: PropTypes.string.isRequired,
          title: PropTypes.string.isRequired
        })).isRequired
      }).isRequired,
      HomeTab: NavigationPropTypes.navigationState.isRequired,
      BeginWorkout: NavigationPropTypes.navigationState.isRequired,
      // ProfileTab: NavigationPropTypes.navigationState.isRequired
    }),
    // switchTab: PropTypes.func.isRequired,
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
      // <NavigationHeader
      //   {...sceneProps}
      //   onNavigateBack={this.props.onNavigateBack}
      //   renderTitleComponent={() => {
      //     return (
      //       // <NavigationHeader.Title>
      //
      //       // {sceneProps.scene.route.title}
      //
      //       // </NavigationHeader.Title>
      //     );
      //   }}
      // />
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
        {
          // <TabBar
          // height={TAB_BAR_HEIGHT}
          // tabs={tabs}
          // currentTabIndex={tabs.index}
          // switchTab={this.props.switchTab}
          // />
        }
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
    // marginBottom: TAB_BAR_HEIGHT,
  },
  viewLogo: {
    backgroundColor: 'white',
   width,
   paddingTop: 30,
   flexDirection: 'row',
   alignItems: 'center',
   justifyContent: 'center',
   alignItems: 'center',
  //  paddingBottom: 20,
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
