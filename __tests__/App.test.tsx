import React from 'react';
import ReactTestRenderer, { act } from 'react-test-renderer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StorageProvider, useStorage } from '../src/state/Storage';
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn().mockResolvedValue(null),
  setItem: jest.fn().mockResolvedValue(undefined),
}));
let state: ReturnType<typeof useStorage>;
function Probe() {
  state = useStorage();
  return null;
}
test('favorites and onboarding persist and restore without demo data', async () => {
  let tree: ReactTestRenderer.ReactTestRenderer;
  await act(async () => {
    tree = ReactTestRenderer.create(
      <StorageProvider>
        <Probe />
      </StorageProvider>,
    );
  });
  expect(state!.ready).toBe(true);
  expect(state!.data.favorites).toEqual([]);
  await act(async () => {
    state!.toggleFavorite('PapyrusScrollsOfEgypt');
  });
  expect(state!.data.favorites).toEqual(['PapyrusScrollsOfEgypt']);
  await act(async () => {
    state!.update({ onboarded: true });
  });
  const saved = JSON.parse(
    (AsyncStorage.setItem as jest.Mock).mock.calls.at(-1)[1],
  );
  expect(saved.onboarded).toBe(true);
  expect(saved.favorites).toEqual(['PapyrusScrollsOfEgypt']);
  await act(async () => {
    tree!.unmount();
  });
  (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(
    JSON.stringify(saved),
  );
  await act(async () => {
    tree = ReactTestRenderer.create(
      <StorageProvider>
        <Probe />
      </StorageProvider>,
    );
  });
  expect(state!.data.onboarded).toBe(true);
  expect(state!.data.favorites).toEqual(['PapyrusScrollsOfEgypt']);
  await act(async () => {
    state!.toggleFavorite('PapyrusScrollsOfEgypt');
  });
  expect(state!.data.favorites).toEqual([]);
  await act(async () => {
    tree!.unmount();
  });
});
