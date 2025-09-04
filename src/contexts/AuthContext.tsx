import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getSupabase, hasSupabaseEnv } from "@/lib/supabase";

export type AppRole = "freelancer" | "owner" | "customer";

type AuthState = {
  user: any | null;
  role: AppRole | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, role: AppRole) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthState | null>(null);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!hasSupabaseEnv) {
      setLoading(false);
      return;
    }
    const supabase = getSupabase();
    const init = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data.session?.user ?? null);
      setLoading(false);
    };
    init();
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => { sub.subscription.unsubscribe(); };
  }, []);

  const role = useMemo(() => {
    const r = (user?.user_metadata?.role as AppRole | undefined) || null;
    return r;
  }, [user]);

  const signIn: AuthState["signIn"] = async (email, password) => {
    const supabase = getSupabase();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  };
  const signUp: AuthState["signUp"] = async (email, password, role) => {
    const supabase = getSupabase();
    const { error } = await supabase.auth.signUp({ email, password, options: { data: { role } } });
    if (error) throw error;
  };
  const signOut: AuthState["signOut"] = async () => {
    if (!hasSupabaseEnv) return;
    const supabase = getSupabase();
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, role, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
