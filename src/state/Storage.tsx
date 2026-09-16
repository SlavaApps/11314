import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
type Data = {
  onboarded: boolean;
  favorites: string[];
  calculator: Record<string, string>;
  finder: Record<string, string>;
  lastQuiz: { score: number; date: string } | null;
};
const initial: Data = {
  onboarded: false,
  favorites: [],
  calculator: {},
  finder: {},
  lastQuiz: null,
};
const Context = createContext<{
  data: Data;
  ready: boolean;
  update: (patch: Partial<Data>) => void;
  toggleFavorite: (id: string) => void;
}>({ data: initial, ready: false, update: () => {}, toggleFavorite: () => {} });
export function StorageProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState(initial);
  const [ready, setReady] = useState(false);
  const queue = useRef(Promise.resolve());
  const current = useRef(initial);
  useEffect(() => {
    AsyncStorage.getItem('books-roots-v1')
      .then(raw => {
        if (raw) {
          const parsed = JSON.parse(raw);
          const restored: Data = {
            ...initial,
            onboarded: parsed.onboarded === true,
            calculator:
              parsed.calculator && typeof parsed.calculator === 'object'
                ? parsed.calculator
                : {},
            finder:
              parsed.finder && typeof parsed.finder === 'object'
                ? parsed.finder
                : {},
            lastQuiz: parsed.lastQuiz ?? null,
            favorites: Array.isArray(parsed.favorites)
              ? parsed.favorites.filter((v: unknown) => typeof v === 'string')
              : [],
          };
          current.current = restored;
          setData(restored);
        }
      })
      .catch(() =>
        Alert.alert(
          'Storage unavailable',
          'Saved data could not be loaded. Please restart the app to try again.',
        ),
      )
      .finally(() => setReady(true));
  }, []);
  const persist = (next: Data) => {
    current.current = next;
    setData(next);
    queue.current = queue.current
      .then(() => AsyncStorage.setItem('books-roots-v1', JSON.stringify(next)))
      .catch(() =>
        Alert.alert(
          'Unable to save',
          'Your changes could not be saved. Please check device storage.',
        ),
      );
  };
  const update = (patch: Partial<Data>) =>
    persist({ ...current.current, ...patch });
  const toggleFavorite = (id: string) => {
    const previous = current.current;
    persist({
      ...previous,
      favorites: previous.favorites.includes(id)
        ? previous.favorites.filter(value => value !== id)
        : [...previous.favorites, id],
    });
  };
  return (
    <Context.Provider value={{ data, ready, update, toggleFavorite }}>
      {children}
    </Context.Provider>
  );
}
export const useStorage = () => useContext(Context);
