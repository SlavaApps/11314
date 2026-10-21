import React, {useEffect, useRef, useMemo} from 'react';
import {View, StyleSheet, Animated, Easing} from 'react-native';

const ORBIT_RADIUS = 34;
const ORBIT_DOT_SIZE = 10;
const ORBIT_COUNT = 3;
const ORBIT_DURATION = 1600;

const CORE_SIZE = 18;
const CORE_DURATION = 900;

const GOLD = '#D9AB32';
const BLUE = '#196CA7';

function createSpin(anim) {
  return Animated.loop(
    Animated.timing(anim, {
      toValue: 1,
      duration: ORBIT_DURATION,
      easing: Easing.linear,
      useNativeDriver: true,
    }),
  );
}

function createPulse(anim) {
  return Animated.loop(
    Animated.sequence([
      Animated.timing(anim, {
        toValue: 1,
        duration: CORE_DURATION,
        easing: Easing.inOut(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(anim, {
        toValue: 0,
        duration: CORE_DURATION,
        easing: Easing.inOut(Easing.quad),
        useNativeDriver: true,
      }),
    ]),
  );
}

const OrbitDot = React.memo(({spin, index, color}) => {
  const rotate = spin.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const baseAngle = (360 / ORBIT_COUNT) * index;

  return (
    <Animated.View
      style={[
        styles.orbitPivot,
        {
          transform: [
            {rotate: `${baseAngle}deg`},
            {rotate},
            {translateY: -ORBIT_RADIUS},
          ],
        },
      ]}>
      <View style={[styles.orbitDot, {backgroundColor: color}]} />
    </Animated.View>
  );
});

const BounceIndicator = ({containerStyle}) => {
  const spin = useRef(new Animated.Value(0)).current;
  const pulse = useRef(new Animated.Value(0)).current;

  const dotColors = useMemo(
    () => Array.from({length: ORBIT_COUNT}, (_, i) => (i % 2 === 0 ? GOLD : BLUE)),
    [],
  );

  useEffect(() => {
    const spinAnim = createSpin(spin);
    const pulseAnim = createPulse(pulse);
    spinAnim.start();
    pulseAnim.start();
    return () => {
      spinAnim.stop();
      pulseAnim.stop();
    };
  }, [spin, pulse]);

  const coreScale = pulse.interpolate({
    inputRange: [0, 1],
    outputRange: [0.85, 1.15],
  });
  const coreOpacity = pulse.interpolate({
    inputRange: [0, 1],
    outputRange: [0.5, 1],
  });

  return (
    <View
      accessible
      accessibilityRole="progressbar"
      accessibilityLabel="Loading"
      style={[styles.container, containerStyle]}>
      <View style={styles.orbitWrap}>
        {dotColors.map((color, i) => (
          <OrbitDot key={i} spin={spin} index={i} color={color} />
        ))}
        <Animated.View
          style={[
            styles.core,
            {transform: [{scale: coreScale}], opacity: coreOpacity},
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000',
  },
  orbitWrap: {
    width: ORBIT_RADIUS * 2,
    height: ORBIT_RADIUS * 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  orbitPivot: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  orbitDot: {
    width: ORBIT_DOT_SIZE,
    height: ORBIT_DOT_SIZE,
    borderRadius: ORBIT_DOT_SIZE / 2,
  },
  core: {
    width: CORE_SIZE,
    height: CORE_SIZE,
    borderRadius: CORE_SIZE / 2,
    backgroundColor: '#D9AB32',
  },
});

export default React.memo(BounceIndicator);
