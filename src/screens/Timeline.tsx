import React, { useEffect, useRef, useState } from 'react';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { periods } from '../data/timeline';
import { TabsParamList } from '../navigation/types';
import { Header } from '../components/UI';
import { colors, styles as s } from '../theme';
export function TimelineScreen({
  route,
}: BottomTabScreenProps<TabsParamList, 'Timeline'>) {
  const [index, setIndex] = useState(0);
  const scroll = useRef<ScrollView>(null);
  useEffect(() => {
    const found = periods.findIndex(p => p.id === route.params?.periodId);
    if (found >= 0) {
      setIndex(found);
    }
  }, [route.params?.periodId]);
  useEffect(() => scroll.current?.scrollTo({ y: 0, animated: false }), [index]);
  const period = periods[index];
  return (
    <View style={s.screen}>
      <Header title="Timeline" caption="8 periods" />
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <ScrollView
          style={{
            width: 96,
            flexGrow: 0,
            borderRightWidth: 1,
            borderColor: colors.line,
          }}
          contentContainerStyle={{ paddingVertical: 18 }}
        >
          {periods.map((p, i) => (
            <Pressable
              key={p.id}
              accessibilityRole="tab"
              accessibilityState={{ selected: i === index }}
              accessibilityLabel={`${p.date}, ${p.title}`}
              onPress={() => setIndex(i)}
              style={{
                minHeight: 72,
                paddingLeft: 23,
                paddingRight: 6,
                paddingBottom: 14,
              }}
            >
              <View
                style={{
                  position: 'absolute',
                  left: 12,
                  top: 9,
                  bottom: -8,
                  width: 1,
                  backgroundColor: colors.line,
                }}
              />
              <View
                style={{
                  position: 'absolute',
                  left: 8,
                  top: 5,
                  width: 9,
                  height: 9,
                  borderRadius: 5,
                  borderWidth: 1,
                  borderColor: i === index ? colors.gold : colors.blue,
                  backgroundColor:
                    i === index ? colors.gold : colors.background,
                }}
              />
              <Text
                style={{
                  color: i === index ? colors.gold : '#778B99',
                  fontSize: 10,
                  marginBottom: 5,
                }}
              >
                {p.date}
              </Text>
              <Text
                style={{
                  color: i === index ? colors.text : '#778B99',
                  fontSize: 10,
                  lineHeight: 15,
                }}
              >
                {p.title}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
        <ScrollView
          ref={scroll}
          style={{ flex: 1 }}
          contentContainerStyle={{ padding: 16, paddingBottom: 30, gap: 14 }}
        >
          <Image
            source={period.image}
            style={{
              width: '100%',
              aspectRatio: 1.1,
              borderRadius: 3,
              borderWidth: 1,
              borderColor: colors.gold,
            }}
          />
          <Text style={s.label}>{period.date}</Text>
          <Text style={s.subtitle}>{period.title}</Text>
          <View style={{ height: 1, backgroundColor: colors.line }} />
          {period.paragraphs.map(p => (
            <Text key={p} style={s.body}>
              {p}
            </Text>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}
