import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// Helper function to get the site URL
function getSiteUrl() {
  return process.env.NODE_ENV === 'production'
    ? 'https://santaswishlist.app'
    : 'http://localhost:3000';
}

export function createClient() {
  const cookieStore = cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name) {
          return cookieStore.get(name)?.value;
        },
        set(name, value, options) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch (error) {
            // Handle cookie error
          }
        },
        remove(name, options) {
          try {
            cookieStore.set({ name, value: '', ...options });
          } catch (error) {
            // Handle cookie error
          }
        },
      },
      auth: {
        flowType: 'pkce',
        detectSessionInUrl: true,
        persistSession: true,
        autoRefreshToken: true,
        redirectTo: `${getSiteUrl()}/auth/callback`,
      },
    }
  );
}
