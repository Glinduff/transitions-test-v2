import React, {Component} from 'react';
import transitionConfig from "./transitions";
import { Text, StyleSheet, SafeAreaView, Button, StatusBar, Platform, TouchableHighlight, Image, View} from 'react-native';
import { createStackNavigator, Header } from 'react-navigation'

const isAndroid = Platform.OS === 'android';

const Screen1 = ({ navigation }) => {
  return(
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
        onPress={() => navigation.push('Screen2')}
        color={isAndroid ? "blue" : "#fff"}
      />
    </SafeAreaView>
  )
};

class Screen2 extends Component{
  render(){
    const { navigation } = this.props
    return(
      <SafeAreaView style={[styles.container, { backgroundColor: '#222222' }]}>
        <StatusBar
          translucent
          barStyle="light-content"
        />
        <Text style={styles.paragraph}>
          Dark Screen
        </Text>
        <Button
          title="Next screen"
          onPress={() => navigation.push('Screen3')}
        />
      </SafeAreaView>
    )
  }
}

class Screen3 extends Component{

  static navigationOptions = ({ navigation }) => ({
    headerTintColor: '#fff',
    headerStyle: {
      backgroundColor: 'transparent',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      borderBottomWidth: 0,
      zIndex: 10000
      },
  });

  render(){
    const { navigation } = this.props

    
    return(
      <View style={{ flex: 1, justifyContent: 'flex-start', backgroundColor: '#222222' }}>
        <StatusBar
          translucent={true}
          barStyle="light-content"
        />
        <Image 
          source={{uri: 'https://i.kinja-img.com/gawker-media/image/upload/s--vrEA_8Oq--/c_scale,f_auto,fl_progressive,q_80,w_800/draz0ljtrdpullajogd4.jpg'}}
          resizeMode={Image.resizeMode.cover} 
          style={{
            height: 200
          }}
        />
        <Text style={styles.paragraph}>
          Dark Screen
        </Text>
        <Button
          title="Next screen"
          onPress={() => navigation.popToTop()}
        />
      </View>
    )
  }
}


export default createStackNavigator({
  Screen1: {
    screen: Screen1,
    navigationOptions: {
      headerTintColor: '#fff',
      title: `A`,
      headerStyle: {
        backgroundColor: '#222222',
      },
      headerBackTitle: null
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
  Screen3: {
    screen: Screen3
  },
},{
  headerMode: 'screen',
  mode: 'card',
  cardStyle: {
    backgroundColor: '#000000',
  },
  transitionConfig: transitionConfig
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