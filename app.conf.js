import 'dotenv/config';

export default {
  expo: {
    name: "Pet Feeder",
    slug: "Pet Feeder",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    updates: {
      fallbackToCacheTimeout: 0
    },
    assetBundlePatterns: [
      "**/*"
    ],
    ios: {
      supportsTablet: true
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#FFFFFF"
      }
    },
    web: {
      favicon: "./assets/favicon.png"
    },
    "plugins": [
      [
        '@config-plugins/react-native-ble-plx',
      ]
    ],
    extra: {
      apiKey: "AIzaSyBZHNT2vPtIjXU44rAvwcDfquBnjZwkFOk",
      authDomain: "pet-feeder-ccb60.firebaseapp.com",
      projectId: "pet-feeder-ccb60",
      storageBucket: "pet-feeder-ccb60.appspot.com",
      messagingSenderId: "312887184128",
      appId: "1:312887184128:web:6cff3efd6b312dc01c01e5",
      measurementId: "G-N8W699FZ74"
    }
  }
};
