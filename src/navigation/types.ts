import { NavigatorScreenParams } from '@react-navigation/native';
export type TabsParamList = {
  Articles: undefined;
  Timeline: { periodId?: string } | undefined;
  Quiz: undefined;
  Favorites: undefined;
  ReadingTime: undefined;
  EraFinder: undefined;
};
export type RootParamList = {
  Main: NavigatorScreenParams<TabsParamList>;
  Article: { id: string };
};
