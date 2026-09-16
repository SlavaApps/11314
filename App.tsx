import React, { useCallback, useState } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StorageProvider, useStorage } from './src/state/Storage';
import { Loader, Onboarding } from './src/screens/Welcome';
import { Navigation } from './src/navigation/Navigation';
import { colors } from './src/theme';
function Application() {
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
export default function App() {
  return (
    <SafeAreaProvider>
      <StorageProvider>
        <StatusBar
          barStyle="light-content"
          backgroundColor={colors.background}
        />
        <Application />
      </StorageProvider>
    </SafeAreaProvider>
  );
}
