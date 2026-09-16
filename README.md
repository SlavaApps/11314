# Books Roots Archive

React Native + TypeScript educational app with React Navigation. All artwork is bundled from `src/assets`; article and timeline content is available offline.

## Run

```sh
npm install
cd ios && pod install && cd ..
npm run ios
```

For Android, configure the Android SDK and run `npm run android`. Run Metro separately with `npm start` if needed.

## Features

- Local full-screen loader with a four-second WebView animation.
- Four onboarding pages, shown until onboarding is completed.
- Twelve articles with sequential reading, native sharing, and persistent favorites.
- Eight interactive historical periods.
- Ten random quiz questions drawn from thirty, shuffled answers, feedback, and results.
- Reading calculator: 180/240/320 words per minute, 20% extra for study text, 10% extra for focused reading, rounded up to whole minutes.
- Era finder with five input groups, a match explanation, and links to the timeline and related article.
- AsyncStorage saves onboarding completion, favorites, tool inputs, and the most recent quiz result. No user data is prefilled.

## Structure

- `src/components`: shared controls and vector icons
- `src/navigation`: typed root stack and six tabs
- `src/screens`: screen layouts and interactions
- `src/data`: supplied educational content and local image mappings
- `src/state`: persistent app state
- `src/utils`: reading calculations and era matching

## Checks

```sh
npx tsc --noEmit
npm run lint
npm test -- --runInBand --watchman=false
```
