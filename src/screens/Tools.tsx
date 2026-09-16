import React, { useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootParamList } from '../navigation/types';
import { Button, Header, Select } from '../components/UI';
import { useStorage } from '../state/Storage';
import { calculateReading } from '../utils/reading';
import { finderOptions, findEra } from '../utils/era';
import { colors } from '../theme';
import { useScreenLayout } from '../hooks/useScreenLayout';
export function ReadingTimeScreen() {
  const { styles: s } = useScreenLayout();
  const { data, update } = useStorage();
  const [values, setValues] = useState(data.calculator);
  const [calculated, setCalculated] = useState(false);
  const [error, setError] = useState('');
  const set = (key: string, value: string) => {
    const next = { ...values, [key]: value };
    setValues(next);
    update({ calculator: next });
    setError('');
  };
  const result = calculateReading(
    values.words || '',
    values.speed,
    values.content,
    values.mode,
  );
  return (
    <KeyboardAvoidingView
      style={s.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Header title="Reading Time" caption="Calculator" />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={s.content}
      >
        <View style={s.field}>
          <Text style={s.label}>Word count</Text>
          <TextInput
            accessibilityLabel="Word count"
            keyboardType="number-pad"
            placeholder="Enter number of words"
            placeholderTextColor="#718797"
            value={values.words || ''}
            onChangeText={v => set('words', v)}
            style={s.input}
            maxLength={9}
          />
        </View>
        <Select
          label="Reading speed"
          options={['Slow', 'Average', 'Fast']}
          value={values.speed || ''}
          onChange={v => set('speed', v)}
        />
        <Select
          label="Content type"
          options={['Article', 'Chapter', 'Book', 'Study Text']}
          value={values.content || ''}
          onChange={v => set('content', v)}
        />
        <Select
          label="Reading mode"
          options={['Casual Reading', 'Focused Reading']}
          value={values.mode || ''}
          onChange={v => set('mode', v)}
        />
        {error && (
          <Text accessibilityRole="alert" style={s.error}>
            {error}
          </Text>
        )}
        <Button
          gold
          title="Calculate"
          onPress={() => {
            Keyboard.dismiss();
            if (!result || !values.content || !values.mode) {
              setError(
                'Enter a positive whole word count and select every reading parameter.',
              );
              return;
            }
            setCalculated(true);
          }}
        />
        {calculated && result && values.content && values.mode && (
          <View
            accessibilityLiveRegion="polite"
            style={[s.field, { padding: 20, marginTop: 16, gap: 14 }]}
          >
            <Text style={s.label}>Calculated result</Text>
            <Text style={[s.title, { fontSize: 32 }]}>{result.formatted}</Text>
            <Text style={s.body}>
              Estimated reading time · {values.speed} pace
            </Text>
            <View style={s.divider} />
            <Text style={s.body}>
              At {result.pace} words per minute, this{' '}
              {Number(values.words).toLocaleString()}-word{' '}
              {values.content.toLowerCase()} takes approximately{' '}
              {result.formatted}
              {values.content === 'Study Text'
                ? ' including 20% extra study time'
                : ''}
              {values.mode === 'Focused Reading'
                ? ' and 10% extra for focused reading'
                : ''}
              .
            </Text>
            <Text style={s.body}>{result.summary}</Text>
            <Text style={s.label}>Updates as you change parameters</Text>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
export function EraFinderScreen() {
  const { styles: s } = useScreenLayout();
  const { data, update } = useStorage();
  const [values, setValues] = useState(data.finder);
  const [show, setShow] = useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<RootParamList>>();
  const complete = Object.keys(finderOptions).every(key => !!values[key]);
  const result = complete ? findEra(values) : null;
  return (
    <View style={s.screen}>
      <Header title="Book Era Finder" caption="Identifier" />
      <ScrollView contentContainerStyle={s.content}>
        {Object.entries(finderOptions).map(([key, options]) => (
          <View key={key} style={[s.card, { padding: 14, gap: 13 }]}>
            <Text style={s.label}>{key}</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
              {options.map(option => (
                <Pressable
                  key={option}
                  accessibilityRole="radio"
                  accessibilityState={{ checked: values[key] === option }}
                  onPress={() => {
                    const next = { ...values, [key]: option };
                    setValues(next);
                    setShow(false);
                    update({ finder: next });
                  }}
                  style={{
                    paddingHorizontal: 11,
                    paddingVertical: 11,
                    borderRadius: 4,
                    borderWidth: 1,
                    borderColor:
                      values[key] === option ? colors.gold : colors.line,
                    backgroundColor:
                      values[key] === option ? colors.blue : colors.card,
                  }}
                >
                  <Text style={{ color: colors.text, fontSize: 12 }}>
                    {option}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
        ))}
        <Text style={[s.label, { color: colors.muted, textAlign: 'center' }]}>
          Select all five parameters to identify an era
        </Text>
        <Button
          title="See the result"
          disabled={!complete}
          onPress={() => setShow(true)}
        />
        {show && result && (
          <View
            accessibilityLiveRegion="polite"
            style={[s.field, { padding: 18, gap: 16 }]}
          >
            <Text style={s.label}>Identified era · {result.level}</Text>
            <Text style={s.title}>{result.period.title}</Text>
            <Text style={s.label}>{result.period.date}</Text>
            <Text style={s.body}>{result.explanation}</Text>
            <Button
              title="Explore in timeline"
              onPress={() =>
                navigation.navigate('Main', {
                  screen: 'Timeline',
                  params: { periodId: result.period.id },
                })
              }
            />
            <Button
              title="Read related article"
              onPress={() =>
                navigation.navigate('Article', { id: result.period.articleId })
              }
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
}
