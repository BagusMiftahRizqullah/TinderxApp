# Matchverse (Expo + React Native + TypeScript)

Tinder-like mobile app built with Expo SDK 52, React Native 0.76, and TypeScript.

## Fitur
- Swipe card dengan animasi (like/nope), ikon bawah responsif, dan threshold 30%
- Tombol absolut (Undo, Nope, Super Like, Like, Boost)
- Progress bar foto auto-berjalan pada kartu
- Bottom tab navigation
- Splash screen animasi gradien
- Dummy data 50 profil (picsum.photos)
- Ikon aplikasi: `src/components/icons/icon.png`

## Persyaratan
- Node.js LTS (≥ 18)
- Xcode (untuk iOS) / Android Studio (untuk Android)
- CocoaPods (macOS): `sudo gem install cocoapods`

## Instalasi
```bash
npm install
```

## Menjalankan Aplikasi
- Dev server: `npm start`
- iOS: `npm run ios`
- Android: `npm run android`
- Web: `npm run web`

## iOS Trouble‑shooting
Jika modul native baru ditambahkan (mis. `expo-av`, `expo-haptics`):
```bash
npx expo prebuild -p ios --no-install
npx pod-install
npm run ios
```

## Struktur Direktori Singkat
```
src/
  components/
    atoms/    # Teks, badge, dsb.
    molecules/ # Progress bar, action feedback, dll
    organisms/ # SwipeCard, SwipeDeck
  features/
    swipe/
    liked/
    splash/
```

## Skrip NPM
```json
{
  "start": "expo start",
  "ios": "expo run:ios",
  "android": "expo run:android",
  "web": "expo start --web",
  "typecheck": "tsc --noEmit"
}
```

## Catatan
- Dummy data berada di halaman swipe dan dapat diganti ke API kapan saja.
- Ikon bawah saat swipe ditempel ke kartu dan selalu di depan.
- Warna mengikuti tema; ikon bawah putih untuk kontras.

