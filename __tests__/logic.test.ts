import { calculateReading } from '../src/utils/reading';
import { findEra } from '../src/utils/era';
import { createQuiz, questions } from '../src/data/quiz';
import { articles } from '../src/data/content';
import { periods } from '../src/data/timeline';

test('reading time rounds up and applies study and focus adjustments', () => {
  expect(
    calculateReading('1800', 'Average', 'Article', 'Casual Reading')?.minutes,
  ).toBe(8);
  expect(
    calculateReading('2400', 'Average', 'Study Text', 'Focused Reading')
      ?.minutes,
  ).toBe(14);
  expect(
    calculateReading('32400', 'Average', 'Book', 'Casual Reading')?.formatted,
  ).toBe('2 hours 15 minutes');
  for (const invalid of ['', '0', '-1', '1.5', 'abc']) {
    expect(
      calculateReading(invalid, 'Average', 'Book', 'Casual Reading'),
    ).toBeNull();
  }
});
test('quiz samples ten unique questions with one valid answer each', () => {
  expect(questions).toHaveLength(30);
  for (let i = 0; i < 20; i++) {
    const session = createQuiz();
    expect(new Set(session.map(q => q.id)).size).toBe(10);
    for (const question of session) {
      expect(question.options).toHaveLength(4);
      expect(question.options.filter(o => o === question.correct)).toHaveLength(
        1,
      );
    }
  }
});
test('all articles contain two paragraphs and timeline references are valid', () => {
  expect(articles).toHaveLength(12);
  expect(periods).toHaveLength(8);
  for (const article of articles) {
    expect(article.paragraphs).toHaveLength(2);
  }
  for (const period of periods) {
    expect(articles.some(a => a.id === period.articleId)).toBe(true);
    expect(period.paragraphs).toHaveLength(2);
  }
});
test('finder recognizes principal material and format combinations', () => {
  expect(findEra({ Material: 'Clay', Format: 'Tablet' }).period.id).toBe(
    'clay',
  );
  expect(
    findEra({
      Material: 'Papyrus',
      Format: 'Scroll',
      'Writing Method': 'Handwritten',
      'Visual Clue': 'Egyptian Details',
      Purpose: 'Religious Text',
    }).level,
  ).toBe('High Match');
  expect(
    findEra({
      Material: 'Parchment',
      Format: 'Codex',
      'Writing Method': 'Handwritten',
    }).period.id,
  ).toBe('codex');
  expect(
    findEra({
      Material: 'Parchment',
      Format: 'Codex',
      'Visual Clue': 'Gold Decoration',
    }).period.id,
  ).toBe('medieval');
  expect(
    findEra({
      Material: 'Paper',
      Format: 'Printed Book',
      'Writing Method': 'Printed',
    }).period.id,
  ).toBe('print');
  expect(findEra({ Material: 'Digital', Format: 'E-book' }).period.id).toBe(
    'digital',
  );
});
