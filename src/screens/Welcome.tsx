import React, { useEffect, useState } from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from '../components/UI';
import { useStorage } from '../state/Storage';
import { colors, styles as s } from '../theme';
const slides = [
  {
    image: require('../assets/Slice01.png'),
    title: 'Discover the Story of Books',
    description:
      'Explore how books evolved from ancient records to modern digital reading. Follow the journey through scrolls, manuscripts, printing, libraries, and e-books.',
  },
  {
    image: require('../assets/Slice02.png'),
    title: 'Travel Through Reading History',
    description:
      'Move across key eras using a clear visual timeline. Learn how clay tablets, papyrus, parchment, paper, and printed books shaped the way people shared knowledge.',
  },
  {
    image: require('../assets/Slice03.png'),
    title: 'Read, Save, and Test Yourself',
    description:
      'Browse short educational articles, save your favorites, and check what you remember with a quick quiz. Each section is designed to make book history simple and easy to explore.',
  },
  {
    image: require('../assets/Slice04.png'),
    title: 'Use Smart Reading Tools',
    description:
      'Calculate estimated reading time and discover which historical book era matches selected materials and formats. Turn small details into useful insights about books and reading.',
  },
];
const loaderHtml = `<!doctype html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
<style>
html, body { margin: 0; width: 100%; height: 100%; background: transparent; overflow: hidden; }
body { display: flex; align-items: center; justify-content: center; }
.dots { display: flex; align-items: center; justify-content: center; padding: 16px; }
.dot { width: 38px; height: 38px; border-radius: 50%; background: rgba(245, 139, 103, .85); box-shadow: 0 0 18px rgba(246, 159, 77, .35); animation: pulse 1.2s ease-in-out infinite; }
.dot + .dot { margin-left: -8px; }
.dot:nth-child(2) { animation-delay: .2s; }
.dot:nth-child(3) { animation-delay: .4s; }
@keyframes pulse { 0%, 100% { transform: scale(.65); opacity: .4; } 50% { transform: scale(1); opacity: 1; } }
</style>
</head>
<body><div class="dots" role="status" aria-label="Loading"><div class="dot"></div><div class="dot"></div><div class="dot"></div></div></body>
</html>`;
const loaderSource = { html: loaderHtml };
export function Loader({ onFinish }: { onFinish: () => void }) {
  const insets = useSafeAreaInsets();
  const [started, setStarted] = useState(false);
  useEffect(() => {
    if (started) {
      const timer = setTimeout(onFinish, 4000);
      return () => clearTimeout(timer);
    }
  }, [started, onFinish]);
  return (
    <ImageBackground
      source={require('../assets/image 99.png')}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <View
        pointerEvents="none"
        style={{
          position: 'absolute',
          bottom: insets.bottom + 30,
          left: 0,
          right: 0,
          height: 80,
        }}
      >
        <WebView
          source={loaderSource}
          originWhitelist={['*']}
          onLoadEnd={() => setStarted(true)}
          onError={() => setStarted(true)}
          scrollEnabled={false}
          opaque={false}
          containerStyle={local.loaderWebContainer}
          style={local.loaderWebView}
          bounces={false}
          overScrollMode="never"
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          accessible={false}
          javaScriptEnabled={false}
        />
      </View>
    </ImageBackground>
  );
}
export function Onboarding() {
  const [index, setIndex] = useState(0);
  const { update } = useStorage();
  const { height, width } = useWindowDimensions();
  const slide = slides[index];
  return (
    <View style={s.screen}>
      <ScrollView
        key={index}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 24 }}
      >
        <View
          style={{
            height: Math.max(16, height * 0.045),
            borderTopWidth: 1,
            borderColor: colors.line,
            marginTop: 12,
          }}
        />
        <Image
          source={slide.image}
          style={{
            width: width - 12,
            height: Math.min(width - 12, height * 0.45),
            alignSelf: 'center',
            resizeMode: 'cover',
          }}
        />
        <View style={{ padding: 22, gap: 16, flex: 1 }}>
          <Text style={[s.title, { fontSize: 27, marginTop: 10 }]}>
            {slide.title}
          </Text>
          <Text style={s.body}>{slide.description}</Text>
          <View style={{ flex: 1, minHeight: 16 }} />
          <Button
            title={index === 3 ? 'Get started' : 'Next'}
            onPress={() =>
              index === 3 ? update({ onboarded: true }) : setIndex(index + 1)
            }
          />
          <View style={local.dots}>
            {slides.map((_, i) => (
              <View
                key={i}
                style={{
                  height: 5,
                  width: i === index ? 22 : 6,
                  borderRadius: 3,
                  backgroundColor: i === index ? colors.gold : colors.line,
                }}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
const local = StyleSheet.create({
  loaderWebContainer: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  loaderWebView: {
    flex: 1,
    height: 80,
    backgroundColor: 'transparent',
  },
  dots: {
    flexDirection: 'row',
    gap: 7,
    justifyContent: 'center',
    paddingTop: 3,
  },
});
