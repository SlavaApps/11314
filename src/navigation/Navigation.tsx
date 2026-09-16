import React from 'react';
import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';
import { RootParamList, TabsParamList } from './types';
import {
  ArticleScreen,
  ArticlesScreen,
  FavoritesScreen,
} from '../screens/Articles';
import { TimelineScreen } from '../screens/Timeline';
import { QuizScreen } from '../screens/Quiz';
import { EraFinderScreen, ReadingTimeScreen } from '../screens/Tools';
import { Icon } from '../components/UI';
import { colors } from '../theme';
const Stack = createNativeStackNavigator<RootParamList>();
const Tab = createBottomTabNavigator<TabsParamList>();
const icons: Record<keyof TabsParamList, string> = {
  Articles: 'articles',
  Timeline: 'timeline',
  Quiz: 'quiz',
  Favorites: 'bookmark',
  ReadingTime: 'clock',
  EraFinder: 'finder',
};
function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.gold,
        tabBarInactiveTintColor: colors.text,
        tabBarStyle: {
          backgroundColor: colors.tab,
          borderTopColor: colors.line,
          height: 64,
          paddingBottom: 4,
          paddingTop: 4,
        },
        tabBarAccessibilityLabel:
          route.name === 'ReadingTime'
            ? 'Reading time calculator'
            : route.name === 'EraFinder'
            ? 'Book era finder'
            : route.name,
        tabBarIcon: ({ color, focused }) => (
          <View
            style={{
              padding: 5,
              borderBottomWidth: 1,
              borderColor: focused ? colors.gold : 'transparent',
            }}
          >
            <Icon
              name={icons[route.name]}
              color={color}
              filled={route.name === 'Favorites' && focused}
            />
          </View>
        ),
      })}
    >
      <Tab.Screen name="Articles" component={ArticlesScreen} />
      <Tab.Screen name="Timeline" component={TimelineScreen} />
      <Tab.Screen name="Quiz" component={QuizScreen} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
      <Tab.Screen name="ReadingTime" component={ReadingTimeScreen} />
      <Tab.Screen name="EraFinder" component={EraFinderScreen} />
    </Tab.Navigator>
  );
}
export function Navigation() {
  return (
    <NavigationContainer
      theme={{
        ...DarkTheme,
        colors: {
          ...DarkTheme.colors,
          background: colors.background,
          card: colors.background,
          primary: colors.gold,
          text: colors.text,
          border: colors.line,
        },
      }}
    >
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        <Stack.Screen name="Main" component={Tabs} />
        <Stack.Screen name="Article" component={ArticleScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
