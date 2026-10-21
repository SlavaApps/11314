import React, { useCallback, useState } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StorageProvider, useStorage } from '../state/Storage';
import { Loader, Onboarding } from '../screens/Welcome';
import { Navigation } from './Navigation';
import { colors } from '../theme';

function RootNavigatorInner() {
  const [loaded, setLoaded] = useState(false);
  const { data, ready } = useStorage();
  const finish = useCallback(() => setLoaded(true), []);
  if (!loaded || !ready) {
    return <Loader onFinish={finish} />;
  }
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: colors.background }}
      edges={['top', 'bottom', 'left', 'right']}
    >
      {data.onboarded ? <Navigation /> : <Onboarding />}
    </SafeAreaView>
  );
}

export default function RootNavigator() {
  return (
    <StorageProvider>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />
      <RootNavigatorInner />
    </StorageProvider>
  );
}
