import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const hasSupabaseEnv = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = hasSupabaseEnv ? createClient(supabaseUrl!, supabaseAnonKey!) : null;

export function getSupabase() {
  if (!hasSupabaseEnv) {
    throw new Error("Supabase environment variables are not set. Provide VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.");
  }
  if (!supabase) {
    return createClient(supabaseUrl!, supabaseAnonKey!);
  }
  return supabase;
}
