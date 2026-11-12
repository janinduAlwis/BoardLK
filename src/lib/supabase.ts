
import { auth } from '@/lib/firebase';
import { createClient } from '@supabase/supabase-js';
import Constants from 'expo-constants';

const supabaseConfig = Constants.expoConfig?.extra?.supabase;

const supabaseUrl =
  supabaseConfig?.url || process.env.EXPO_PUBLIC_SUPABASE_URL;

const supabasePublishableKey =
  supabaseConfig?.publishableKey ||
  process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

export const isSupabaseConfigured = Boolean(
  supabaseUrl && supabasePublishableKey
);

export const supabaseBucket =
  supabaseConfig?.storageBucket ||
  process.env.EXPO_PUBLIC_SUPABASE_STORAGE_BUCKET ||
  'property-images';

export function getOptimizedImageUrl(
  uri: string,
  width = 1200,
  quality = 70
): string {
  if (!uri.includes('/storage/v1/object/public/')) {
    return uri;
  }

  const separator = uri.includes('?') ? '&' : '?';

  return `${uri}${separator}width=${width}&quality=${quality}`;
}

export const supabase =
  isSupabaseConfigured && supabaseUrl && supabasePublishableKey
    ? createClient(supabaseUrl, supabasePublishableKey, {
        accessToken: async () => {
          const currentUser = auth?.currentUser;

          if (!currentUser) {
            return null;
          }

          return currentUser.getIdToken();
        },
        auth: {
          persistSession: false,
          autoRefreshToken: false,
          detectSessionInUrl: false,
        },
      })
    : null;
