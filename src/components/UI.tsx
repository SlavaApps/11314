import React, { useState } from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Svg, { Path, Circle, Rect } from 'react-native-svg';
import { colors, styles as s } from '../theme';
export function Icon({
  name,
  color = colors.text,
  size = 23,
  filled = false,
}: {
  name: string;
  color?: string;
  size?: number;
  filled?: boolean;
}) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {name === 'bookmark' ? (
        <Path d="M6 3h12v18l-6-4-6 4z" fill={filled ? color : 'none'} />
      ) : name === 'clock' ? (
        <>
          <Circle cx="12" cy="12" r="9" />
          <Path d="M12 6v6l4 2" />
        </>
      ) : name === 'quiz' ? (
        <>
          <Circle cx="12" cy="12" r="9" />
          <Path d="M9 9a3 3 0 1 1 4 3c-1 0-1 1-1 2m0 3h.01" />
        </>
      ) : name === 'finder' ? (
        <>
          <Circle cx="10" cy="10" r="7" />
          <Path d="m15 15 6 6M7 10h6m-3-3v6" />
        </>
      ) : name === 'timeline' ? (
        <>
          <Rect x="3" y="4" width="16" height="16" rx="2" />
          <Path d="M7 2v5m8-5v5M3 9h16M7 13h3m-3 3h2" />
          <Circle cx="17" cy="17" r="5" />
          <Path d="M17 14v3l2 1" />
        </>
      ) : name === 'back' ? (
        <Path d="m10 5-7 7 7 7M3 12h18" />
      ) : name === 'share' ? (
        <>
          <Circle cx="5" cy="12" r="2" />
          <Circle cx="18" cy="5" r="2" />
          <Circle cx="18" cy="19" r="2" />
          <Path d="m7 11 9-5m-9 7 9 5" />
        </>
      ) : (
        <>
          <Path d="M5 3h14v18H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Zm0 14h14M7 7h7m-7 4h7" />
        </>
      )}
    </Svg>
  );
}
export function Button({
  title,
  onPress,
  disabled = false,
  gold = false,
}: {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  gold?: boolean;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        local.button,
        { opacity: disabled ? 0.4 : pressed ? 0.75 : 1 },
      ]}
    >
      <LinearGradient
        pointerEvents="none"
        colors={gold ? ['#E4BB4D', '#CEA02B'] : ['#1B70AD', '#165E98']}
        style={StyleSheet.absoluteFill}
      />
      <Text
        style={[
          local.buttonText,
          { color: gold ? colors.background : colors.text },
        ]}
      >
        {title.toUpperCase()}
      </Text>
    </Pressable>
  );
}
export function Header({
  title,
  caption,
}: {
  title: string;
  caption?: string;
}) {
  return (
    <View style={local.header}>
      <Text style={[s.title, { flex: 1 }]}>{title}</Text>
      {caption && <Text style={s.label}>{caption}</Text>}
    </View>
  );
}
export function Select({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${label}: ${value || 'not selected'}`}
        onPress={() => setOpen(true)}
        style={s.field}
      >
        <Text style={s.label}>{label}</Text>
        <Text
          style={{ color: value ? colors.text : colors.muted, fontSize: 14 }}
        >
          {value || `Select ${label.toLowerCase()}`}　⌄
        </Text>
      </Pressable>
      <Modal
        visible={open}
        transparent
        animationType="fade"
        onRequestClose={() => setOpen(false)}
      >
        <View style={local.overlay}>
          <View style={local.sheet}>
            <Text style={s.title}>{label}</Text>
            <ScrollView>
              {options.map(option => (
                <Pressable
                  key={option}
                  accessibilityRole="radio"
                  accessibilityState={{ checked: option === value }}
                  onPress={() => {
                    onChange(option);
                    setOpen(false);
                  }}
                  style={local.option}
                >
                  <Text
                    style={[
                      s.body,
                      { color: option === value ? colors.gold : colors.text },
                    ]}
                  >
                    {option}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
            <Button title="Cancel" onPress={() => setOpen(false)} />
          </View>
        </View>
      </Modal>
    </>
  );
}
const local = StyleSheet.create({
  button: {
    borderWidth: 1,
    borderColor: colors.gold,
    borderRadius: 6,
    minHeight: 49,
    flexShrink: 0,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  buttonText: {
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '700',
    letterSpacing: 1,
    textAlign: 'center',
  },
  header: {
    minHeight: 72,
    paddingHorizontal: 20,
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderColor: colors.line,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  overlay: {
    flex: 1,
    backgroundColor: '#0009',
    justifyContent: 'center',
    padding: 24,
  },
  sheet: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.gold,
    borderRadius: 12,
    padding: 20,
    gap: 20,
    maxHeight: '80%',
  },
  option: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: colors.line,
  },
});
