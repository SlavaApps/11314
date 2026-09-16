import { useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from '../theme';

export function useScreenLayout() {
  const { width, height, fontScale } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const compact = width < 375 || height < 700;
  const padding = compact ? 14 : 20;
  const availableHeight = height - insets.top - insets.bottom;
  return {
    width,
    height,
    compact,
    padding,
    availableHeight,
    imageSize: Math.max(
      120,
      Math.min(
        width - padding * 2,
        (availableHeight * (compact ? 0.32 : 0.4)) / Math.max(1, fontScale),
        360,
      ),
    ),
    styles: {
      ...styles,
      content: [
        styles.content,
        { padding, gap: compact ? 12 : 16, paddingBottom: 24 },
      ],
      title: [styles.title, { fontSize: compact ? 22 : 24 }],
      subtitle: [styles.subtitle, { fontSize: compact ? 18 : 19 }],
    },
  };
}
