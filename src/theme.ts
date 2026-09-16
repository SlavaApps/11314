import { Platform, StyleSheet } from 'react-native';
export const colors = {
  background: '#061925',
  card: '#10314B',
  tab: '#0D2C4B',
  gold: '#D9AB32',
  blue: '#196CA7',
  text: '#FAFAF8',
  muted: '#B9C7D1',
  line: '#194661',
};
export const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { padding: 20, gap: 16, paddingBottom: 32 },
  title: {
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
    fontWeight: '700',
    fontSize: 24,
    color: colors.text,
  },
  subtitle: {
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
    fontWeight: '700',
    fontSize: 19,
    color: colors.text,
  },
  body: { fontSize: 14, lineHeight: 23, color: colors.muted },
  label: {
    fontSize: 10,
    letterSpacing: 1.3,
    color: colors.gold,
    textTransform: 'uppercase',
  },
  card: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 6,
    overflow: 'hidden',
  },
  row: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  divider: { height: 1, backgroundColor: colors.line, marginVertical: 16 },
  image: { width: '100%', aspectRatio: 1.8 },
  field: {
    borderWidth: 1,
    borderColor: colors.gold,
    borderRadius: 6,
    backgroundColor: colors.card,
    padding: 14,
    gap: 7,
  },
  input: { color: colors.text, fontSize: 15, padding: 0, minHeight: 26 },
  error: { color: '#FF9898', fontSize: 13, lineHeight: 20 },
});
