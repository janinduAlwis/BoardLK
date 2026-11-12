const appJson = require('./app.json');
const value = (name) => process.env[name]?.trim();

module.exports = ({ config }) => ({
  ...appJson.expo,
  ...config,
  extra: {
    ...(config.extra || {}),
    firebase: {
      apiKey: value('EXPO_PUBLIC_FIREBASE_API_KEY'),
      authDomain: value('EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN'),
      projectId: value('EXPO_PUBLIC_FIREBASE_PROJECT_ID'),
      storageBucket: value('EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET'),
      messagingSenderId: value('EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID'),
      appId: value('EXPO_PUBLIC_FIREBASE_APP_ID'),
    },
    supabase: {
      url: value('EXPO_PUBLIC_SUPABASE_URL'),
      publishableKey: value('EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY'),
      storageBucket: value('EXPO_PUBLIC_SUPABASE_STORAGE_BUCKET') || 'property-images',
    },
  },
});
