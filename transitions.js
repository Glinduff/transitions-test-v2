import {Animated, Easing, I18nManager} from 'react-native';
import StackViewStyleInterpolator from 'react-navigation/src/views/StackView/StackViewStyleInterpolator'

export default transitionConfig = () => ({
    transitionSpec: {
      duration: 400,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
      useNativeDriver: true,
    },
    containerStyle: {
      backgroundColor: '#000000',
    },
    screenInterpolator: sceneProps => {
      return StackViewStyleInterpolator.forHorizontal(sceneProps);
    }
    /* screenInterpolator: sceneProps => {
      
      const { position, layout, scene, index, scenes } = sceneProps
      const toIndex = index
      const thisSceneIndex = scene.index
      const height = layout.initHeight
      const width = layout.initWidth

      const opacity = position.interpolate({
        inputRange: [thisSceneIndex - 2, thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1, thisSceneIndex + 2],
        outputRange: [1, 0.33, 1, 0.33, 1],
      })
      const translateX = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
        outputRange: I18nManager.isRTL
          ? [-width, 0, width * 0.075]
          : [width, 0, width * -0.075],
      })

      const slideFromRight = { opacity, transform: [{ translateX }]}
      return slideFromRight
    }, */
  })