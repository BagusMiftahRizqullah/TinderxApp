# Matchverse (Expo + React Native + TypeScript)

Tinder-like mobile app built with Expo SDK 52, React Native 0.76, and TypeScript.

## Features
- Swipe cards with animations (like/nope), responsive bottom icons, and 30% width threshold
- Absolute action buttons (Undo, Nope, Super Like, Like, Boost)
- Auto photo progress bar on cards
- Bottom tab navigation
- Animated gradient splash screen
- 50 dummy profiles (picsum.photos)
- App icon: `src/components/icons/icon.png`

## Requirements
- Node.js LTS (≥ 18)
- Xcode (for iOS) / Android Studio (for Android)
- CocoaPods (macOS): `sudo gem install cocoapods`

## Installation
```bash
npm install
```

## Run
- Dev server: `npm start`
- iOS: `npm run ios`
- Android: `npm run android`
- Web: `npm run web`

## iOS Troubleshooting
When new native modules are added (e.g., `expo-av`, `expo-haptics`):
```bash
npx expo prebuild -p ios --no-install
npx pod-install
npm run ios
```

## Directory Structure
```
src/
  components/
    atoms/
    molecules/
    organisms/
  features/
    swipe/
    liked/
    splash/
```

## NPM Scripts
```json
{
  "start": "expo start",
  "ios": "expo run:ios",
  "android": "expo run:android",
  "web": "expo start --web",
  "typecheck": "tsc --noEmit"
}
```

## Notes
- Dummy data is defined in the swipe page and can be replaced with an API.
- Bottom icons during swipe are attached to and layered above the card.
- Colors follow the theme; bottom icons are white for contrast.
