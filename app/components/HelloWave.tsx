import React from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

export const HelloWave = () => {
  const rotation = useSharedValue(0);

 
  React.useEffect(() => {
    rotation.value = withRepeat(withTiming(20, { duration: 300 }), -1, true);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotateZ: `${rotation.value}deg` }],
  }));

  return <Animated.Text style={[styles.wave, animatedStyle]}>👋</Animated.Text>;
};

const styles = StyleSheet.create({
  wave: {
    fontSize: 50,
    alignSelf: 'center',
    marginVertical: 20,
  },
});
export default HelloWave;