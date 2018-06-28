import React, { Component } from 'react';
import { Text, View, StyleSheet, SafeAreaView, Button, StatusBar, Platform, Animated, Easing, I18nManager} from 'react-native';
import { StackNavigator, TabNavigator, createStackNavigator } from 'react-navigation';
import StackViewStyleInterpolator from 'react-navigation/src/views/StackView/StackViewStyleInterpolator'

const isAndroid = Platform.OS === 'android';

const Screen1 = ({ navigation }) => (
  <SafeAreaView style={[styles.container, { backgroundColor: '#222222' }]}>
    <StatusBar
      translucent
      barStyle="light-content"
      backgroundColor="transparent"
    />
    <Text style={[styles.paragraph, { color: '#fff' }]}>
      Light Screen
    </Text>
    <Button
      title="Next screen"
      onPress={() => navigation.navigate('Screen2')}
      color={isAndroid ? "blue" : "#fff"}
    />
    {/* <Button
      title="Toggle Drawer"
      onPress={() => navigation.navigate('DrawerToggle')}
      color={isAndroid ? "blue" : "#fff"}
    /> */}
  </SafeAreaView>
);

const Screen2 = ({ navigation }) => (
  <SafeAreaView style={[styles.container, { backgroundColor: '#222222' }]}>
    <StatusBar
      translucent
      barStyle="light-content"
      backgroundColor="transparent"
    />
    <Text style={styles.paragraph}>
      Dark Screen
    </Text>
    <Button
      title="Next screen"
      onPress={() => navigation.navigate('Screen1')}
    />
    {/* <Button
      title="Toggle Drawer"
      onPress={() => navigation.navigate('DrawerToggle')}
    /> */}
  </SafeAreaView>
);

// export default StackNavigator({
//   Screen1: {
//     screen: Screen1,
//   },
//   Screen2: {
//     screen: Screen2,
//   },
// }, {
//   headerMode: 'none',
// });

export default createStackNavigator({
  Screen1: {
    screen: Screen1,
    navigationOptions: {
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: '#222222',
      },
    },
  },
  Screen2: {
    screen: Screen2,
    navigationOptions: {
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: '#222222',
      },
    },
  },
},{
  headerMode: 'screen',
  mode: 'card',
  
  transitionConfig: () => ({
    transitionSpec: {
      duration: 400,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
      useNativeDriver: true,
    },
    screenInterpolator: sceneProps => {
      const { position, layout, scene, index, scenes } = sceneProps
      const toIndex = index
      const thisSceneIndex = scene.index
      const height = layout.initHeight
      const width = layout.initWidth

      const opacity = position.interpolate({
        inputRange: [thisSceneIndex - 2, thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1, thisSceneIndex + 2],
        //default: outputRange: [1, 1, 0.3],
        outputRange: [0, 1, 1, 0.9, 0],
    });

      /* const translateX = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
        outputRange: [width, 0, -(width/2)]
      }) */

      const translateX = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
        outputRange: I18nManager.isRTL
          ? [-width, 0, width * 0.075]
          : [width, 0, width * -0.075],
      });

      const slideFromRight = { opacity, transform: [{ translateX }]}

      return slideFromRight
    },
  }),
});

/*  const { first, last } = interpolate;
  const index = scene.index;
  const opacity = position.interpolate({
    inputRange: [first, first + 0.01, index, last - 0.01, last],
    outputRange: [0, 1, 1, 0.85, 0],
  }); */

// export default TabNavigator({
//   Screen1: {
//     screen: Screen1,
//     navigationOptions: {
//       tabBarOnPress: ({ previousScene, scene, jumpToIndex }) => {
//         // TODO: This doesn't handle the initial render because the second screen renders last. What to do?
//         StatusBar.setBarStyle('light-content');
//         isAndroid && StatusBar.setBackgroundColor('#6a51ae');
//         jumpToIndex(scene.index);
//       },
//     },
//   },
//   Screen2: {
//     screen: Screen2,
//     navigationOptions: {
//       tabBarOnPress: ({ previousScene, scene, jumpToIndex }) => {
//         StatusBar.setBarStyle('dark-content');
//         isAndroid && StatusBar.setBackgroundColor('#ecf0f1');
//         jumpToIndex(scene.index);
//       },
//     },
//   },
// });

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paragraph: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
});