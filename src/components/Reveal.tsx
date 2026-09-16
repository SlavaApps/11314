import React, { useEffect, useRef } from 'react';
import {
  AccessibilityInfo,
  Animated,
  Easing,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';

export function Reveal({
  children,
  active = true,
  replayKey,
  style,
}: {
  children: React.ReactNode;
  active?: boolean;
  replayKey?: string | number;
  style?: StyleProp<ViewStyle>;
}) {
  const progress = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    let cancelled = false;
    let animation: Animated.CompositeAnimation | undefined;
    const show = (reduceMotion: boolean) => {
      if (cancelled) {
        return;
      }
      animation?.stop();
      if (!active || reduceMotion) {
        progress.setValue(1);
        return;
      }
      progress.setValue(0);
      animation = Animated.timing(progress, {
        toValue: 1,
        duration: 280,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      });
      animation.start();
    };
    AccessibilityInfo.isReduceMotionEnabled()
      .then(show)
      .catch(() => show(true));
    const listener = AccessibilityInfo.addEventListener(
      'reduceMotionChanged',
      show,
    );
    return () => {
      cancelled = true;
      animation?.stop();
      listener.remove();
    };
  }, [active, replayKey, progress]);
  return (
    <Animated.View
      style={[
        style,
        {
          opacity: progress,
          transform: [
            {
              translateY: progress.interpolate({
                inputRange: [0, 1],
                outputRange: [10, 0],
              }),
            },
          ],
        },
      ]}
    >
      {children}
    </Animated.View>
  );
}
export function ScreenReveal({ children }: { children: React.ReactNode }) {
  const focused = useIsFocused();
  return (
    <Reveal active={focused} style={{ flex: 1 }}>
      {children}
    </Reveal>
  );
}
