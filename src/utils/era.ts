import { periods } from '../data/timeline';
export const finderOptions: Record<string, string[]> = {
  Material: ['Clay', 'Papyrus', 'Parchment', 'Paper', 'Digital'],
  Format: ['Tablet', 'Scroll', 'Codex', 'Printed Book', 'Paperback', 'E-book'],
  'Writing Method': [
    'Carved',
    'Handwritten',
    'Illustrated',
    'Printed',
    'Digital Text',
  ],
  'Visual Clue': [
    'Ancient Symbols',
    'Egyptian Details',
    'Gold Decoration',
    'Library Marks',
    'Modern Screen',
  ],
  Purpose: [
    'Law/Trade Record',
    'Religious Text',
    'Story/Literature',
    'Study Material',
    'Everyday Reading',
  ],
};
const profiles: Record<string, Record<string, string[]>> = {
  clay: {
    Material: ['Clay'],
    Format: ['Tablet'],
    'Writing Method': ['Carved'],
    'Visual Clue': ['Ancient Symbols'],
    Purpose: ['Law/Trade Record'],
  },
  egypt: {
    Material: ['Papyrus'],
    Format: ['Scroll'],
    'Writing Method': ['Handwritten'],
    'Visual Clue': ['Egyptian Details'],
    Purpose: ['Religious Text', 'Law/Trade Record'],
  },
  scrolls: {
    Material: ['Papyrus', 'Parchment'],
    Format: ['Scroll'],
    'Writing Method': ['Handwritten'],
    'Visual Clue': ['Library Marks'],
    Purpose: ['Story/Literature', 'Study Material'],
  },
  codex: {
    Material: ['Parchment'],
    Format: ['Codex'],
    'Writing Method': ['Handwritten'],
    Purpose: ['Study Material', 'Religious Text'],
  },
  medieval: {
    Material: ['Parchment', 'Paper'],
    Format: ['Codex'],
    'Writing Method': ['Illustrated'],
    'Visual Clue': ['Gold Decoration'],
    Purpose: ['Religious Text'],
  },
  print: {
    Material: ['Paper'],
    Format: ['Printed Book', 'Paperback'],
    'Writing Method': ['Printed'],
    'Visual Clue': ['Library Marks'],
    Purpose: ['Story/Literature', 'Study Material', 'Everyday Reading'],
  },
  digital: {
    Material: ['Digital'],
    Format: ['E-book'],
    'Writing Method': ['Digital Text'],
    'Visual Clue': ['Modern Screen'],
    Purpose: ['Everyday Reading', 'Study Material'],
  },
};
export function findEra(values: Record<string, string>) {
  const ranked = Object.entries(profiles)
    .map(([id, profile]) => ({
      id,
      score: Object.entries(profile).reduce(
        (sum, [key, options]) =>
          sum +
          (options.includes(values[key])
            ? key === 'Material' || key === 'Format'
              ? 4
              : key === 'Purpose'
              ? 1
              : 3
            : 0),
        0,
      ),
      matches: Object.entries(profile)
        .filter(([key, options]) => options.includes(values[key]))
        .map(([key]) => values[key]),
    }))
    .sort((a, b) => b.score - a.score);
  let best = ranked[0];
  if (values.Material === 'Digital' || values.Format === 'E-book') {
    best = ranked.find(v => v.id === 'digital')!;
  } else if (values.Material === 'Clay' && values.Format === 'Tablet') {
    best = ranked.find(v => v.id === 'clay')!;
  } else if (values.Material === 'Papyrus' && values.Format === 'Scroll') {
    best = ranked.find(v => v.id === 'egypt')!;
  } else if (
    values['Visual Clue'] === 'Gold Decoration' ||
    values['Writing Method'] === 'Illustrated'
  ) {
    best = ranked.find(v => v.id === 'medieval')!;
  }
  const period = periods.find(p => p.id === best.id)!;
  return {
    period,
    level:
      best.matches.length >= 4
        ? 'High Match'
        : best.matches.length >= 2
        ? 'Moderate Match'
        : 'Low Match',
    explanation: `${best.matches.join(', ') || 'These features'} ${
      best.matches.length === 1 ? 'is' : 'are'
    } associated with this period. ${
      best.matches.length < 4
        ? 'The selected features span different traditions, so this is an approximate match. '
        : ''
    }${period.paragraphs[0]}`,
  };
}
