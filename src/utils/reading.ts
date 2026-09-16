export const speeds: Record<string, number> = {
  Slow: 180,
  Average: 240,
  Fast: 320,
};
export function calculateReading(
  words: string,
  speed: string,
  content: string,
  mode: string,
) {
  const count = Number(words);
  if (
    !/^\d+$/.test(words) ||
    !Number.isSafeInteger(count) ||
    count <= 0 ||
    !speeds[speed]
  ) {
    return null;
  }
  const minutes = Math.ceil(
    (count / speeds[speed]) *
      (content === 'Study Text' ? 1.2 : 1) *
      (mode === 'Focused Reading' ? 1.1 : 1),
  );
  return {
    minutes,
    pace: speeds[speed],
    formatted:
      minutes < 60
        ? `${minutes} ${minutes === 1 ? 'minute' : 'minutes'}`
        : `${Math.floor(minutes / 60)} ${
            Math.floor(minutes / 60) === 1 ? 'hour' : 'hours'
          }${minutes % 60 ? ` ${minutes % 60} minutes` : ''}`,
    summary:
      minutes <= 10
        ? 'A short read suitable for a quick learning session.'
        : minutes <= 45
        ? 'Set aside a quiet reading break for this text.'
        : 'Plan several reading sessions and take regular breaks.',
  };
}
