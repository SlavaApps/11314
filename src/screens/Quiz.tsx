import React, { useState } from 'react';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';
import { Reveal } from '../components/Reveal';
import { Button, Header } from '../components/UI';
import { createQuiz } from '../data/quiz';
import { useStorage } from '../state/Storage';
import { colors } from '../theme';
import { useScreenLayout } from '../hooks/useScreenLayout';
export function QuizScreen() {
  const { styles: s, ...layout } = useScreenLayout();
  const [session, setSession] = useState<ReturnType<typeof createQuiz>>([]);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const { update } = useStorage();
  const start = () => {
    setSession(createQuiz());
    setIndex(0);
    setSelected(null);
    setConfirmed(false);
    setScore(0);
    setFinished(false);
  };
  const current = session[index];
  const advance = () => {
    if (!confirmed) {
      if (selected === null) {
        return;
      }
      setScore(v => v + (selected === current.correct ? 1 : 0));
      setConfirmed(true);
    } else if (index === 9) {
      setFinished(true);
      update({ lastQuiz: { score, date: new Date().toISOString() } });
    } else {
      setIndex(v => v + 1);
      setSelected(null);
      setConfirmed(false);
    }
  };
  if (finished) {
    return (
      <Reveal
        replayKey={finished ? 'result' : session.length ? index : 'intro'}
        style={s.screen}
      >
        <ScrollView
          contentContainerStyle={[
            s.content,
            {
              flexGrow: 1,
              justifyContent: 'center',
              alignItems: 'center',
              gap: 28,
            },
          ]}
        >
          <View
            style={{
              width: 118,
              height: 118,
              borderRadius: 59,
              borderWidth: 6,
              borderColor: colors.gold,
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 30,
            }}
          >
            <Text style={[s.title, { fontSize: 36 }]}>{score}</Text>
            <Text style={s.body}>out of 10</Text>
          </View>
          <Text style={s.title}>
            {score >= 7 ? 'Well Done, Scholar' : 'Keep Exploring'}
          </Text>
          <Text style={[s.body, { textAlign: 'center' }]}>
            You answered {score} out of 10 questions correctly. Explore the
            articles and timeline to deepen your understanding of written
            history before the next round.
          </Text>
          <View style={{ width: '100%' }}>
            <Button title="Try again" onPress={start} />
          </View>
        </ScrollView>
      </Reveal>
    );
  }
  return (
    <Reveal
      replayKey={finished ? 'result' : session.length ? index : 'intro'}
      style={s.screen}
    >
      <Header
        title="Quiz"
        caption={session.length ? `${index + 1} / 10` : '10 questions'}
      />
      <ScrollView
        key={session.length ? index : 'intro'}
        contentContainerStyle={[s.content, { flexGrow: 1 }]}
      >
        {!session.length ? (
          <>
            <Image
              source={require('../assets/image 100.png')}
              style={{
                width: layout.imageSize,
                alignSelf: 'center',
                aspectRatio: 1,
                borderWidth: 1,
                borderColor: colors.gold,
                borderRadius: 4,
              }}
            />
            <Text style={[s.title, { marginTop: 20 }]}>
              Test Your Knowledge of Book History
            </Text>
            <Text style={s.body}>
              Ten randomly selected questions from a pool of thirty. Choose one
              answer, confirm it, and learn from the feedback. Explore ancient
              writing materials, pivotal inventions, and the books that shaped
              civilization.
            </Text>
            <View style={{ flex: 1, minHeight: 28 }} />
            <Button title="Start quiz" onPress={start} />
          </>
        ) : (
          <>
            <View
              style={{
                height: 4,
                backgroundColor: colors.line,
                borderRadius: 2,
              }}
            >
              <View
                style={{
                  height: 4,
                  width: `${(index + 1) * 10}%`,
                  backgroundColor: colors.gold,
                }}
              />
            </View>
            <View style={[s.field, { gap: 14, padding: 18 }]}>
              <Text style={s.label}>Question {index + 1}</Text>
              <Text style={[s.subtitle, { lineHeight: 26 }]}>
                {current.question}
              </Text>
            </View>
            {current.options.map((option, i) => {
              const correct = confirmed && option === current.correct;
              const wrong = confirmed && selected === option && !correct;
              return (
                <Pressable
                  key={option}
                  accessibilityRole="radio"
                  accessibilityState={{
                    checked: selected === option,
                    disabled: confirmed,
                  }}
                  disabled={confirmed}
                  onPress={() => setSelected(option)}
                  style={[
                    s.card,
                    {
                      padding: 16,
                      flexDirection: 'row',
                      gap: 12,
                      borderColor: correct
                        ? '#28904F'
                        : wrong
                        ? '#B42B30'
                        : selected === option
                        ? colors.gold
                        : colors.line,
                      backgroundColor: correct
                        ? '#0A301D'
                        : wrong
                        ? '#350F14'
                        : colors.card,
                    },
                  ]}
                >
                  <Text
                    style={{
                      color: correct
                        ? '#65D58B'
                        : wrong
                        ? '#FF7070'
                        : colors.gold,
                      fontWeight: '700',
                    }}
                  >
                    {correct ? '✓' : wrong ? '×' : String.fromCharCode(65 + i)}
                  </Text>
                  <Text style={[s.body, { flex: 1 }]}>{option}</Text>
                </Pressable>
              );
            })}
            {confirmed && (
              <Text accessibilityLiveRegion="polite" style={s.body}>
                {selected === current.correct
                  ? 'Correct!'
                  : `Correct answer: ${current.correct}`}
              </Text>
            )}
            <View style={{ flex: 1, minHeight: 24 }} />
            <Button
              title={
                confirmed
                  ? index === 9
                    ? 'See result'
                    : 'Next question'
                  : 'Confirm'
              }
              disabled={selected === null}
              onPress={advance}
            />
          </>
        )}
      </ScrollView>
    </Reveal>
  );
}
