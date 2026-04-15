"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { Provider, SupabaseClient, User } from "@supabase/supabase-js";
import {
  createClient,
  isSupabaseBrowserConfigured,
} from "@/utils/supabase/client";

export type UserRole = "admin" | "user" | null;

type AuthContextValue = {
  user: User | null;
  userRole: UserRole;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  sendPhoneOtp: (phone: string) => Promise<void>;
  verifyPhoneOtp: (phone: string, token: string) => Promise<void>;
  signInWithOAuth: (provider: Provider) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function getBrowserSupabase() {
  if (!isSupabaseBrowserConfigured()) return null;
  return createClient();
}

async function fetchUserRole(
  supabase: NonNullable<ReturnType<typeof getBrowserSupabase>>,
  userId: string,
): Promise<UserRole> {
  const { data, error } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", userId)
    .maybeSingle();

  if (error || !data?.role) return null;
  if (data.role === "admin" || data.role === "user") return data.role;
  return null;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const supabase = useMemo(() => getBrowserSupabase(), []);
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [loading, setLoading] = useState(true);
  const mountedRef = useRef(true);

  const applySession = useCallback(
    async (nextUser: User | null) => {
      setUser(nextUser);
      if (!nextUser || !supabase) {
        setUserRole(null);
        return;
      }

      let role = await fetchUserRole(supabase, nextUser.id);

      if (role === null) {
        const { error } = await supabase.from("profiles").insert({
          id: nextUser.id,
          email: nextUser.email ?? nextUser.phone ?? "",
          role: "user",
        });
        if (!error) {
          role = "user";
        }
      }

      if (!mountedRef.current) return;
      setUserRole(role);
    },
    [supabase],
  );

  useEffect(() => {
    mountedRef.current = true;

    if (!supabase) {
      setLoading(false);
      return;
    }
    const client: SupabaseClient = supabase;

    async function init() {
      const {
        data: { session },
      } = await client.auth.getSession();
      if (!mountedRef.current) return;
      await applySession(session?.user ?? null);
      if (!mountedRef.current) return;
      setLoading(false);
    }

    void init();

    const {
      data: { subscription },
    } = client.auth.onAuthStateChange(async (_event, session) => {
      if (!mountedRef.current) return;
      await applySession(session?.user ?? null);
      if (!mountedRef.current) return;
      setLoading(false);
    });

    return () => {
      mountedRef.current = false;
      subscription.unsubscribe();
    };
  }, [applySession, supabase]);

  const signIn = useCallback(
    async (email: string, password: string) => {
      if (!supabase) throw new Error("Supabase is not configured");
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
    },
    [supabase],
  );

  const signUp = useCallback(
    async (email: string, password: string) => {
      if (!supabase) throw new Error("Supabase is not configured");
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
    },
    [supabase],
  );

  const sendPhoneOtp = useCallback(
    async (phone: string) => {
      if (!supabase) throw new Error("Supabase is not configured");
      const { error } = await supabase.auth.signInWithOtp({
        phone,
        options: {
          shouldCreateUser: true,
        },
      });
      if (error) throw error;
    },
    [supabase],
  );

  const verifyPhoneOtp = useCallback(
    async (phone: string, token: string) => {
      if (!supabase) throw new Error("Supabase is not configured");
      const { error } = await supabase.auth.verifyOtp({
        phone,
        token,
        type: "sms",
      });
      if (error) throw error;
    },
    [supabase],
  );

  const signInWithOAuth = useCallback(
    async (provider: Provider) => {
      if (!supabase) throw new Error("Supabase is not configured");
      const siteUrl =
        typeof window !== "undefined"
          ? window.location.origin
          : (process.env.NEXT_PUBLIC_BASE_URL ?? "");
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${siteUrl}/auth/callback`,
        },
      });
      if (error) throw error;
      if (data.url) {
        window.location.href = data.url;
      }
    },
    [supabase],
  );

  const signOut = useCallback(async () => {
    if (!supabase) return;
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  }, [supabase]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      userRole,
      loading,
      signIn,
      signUp,
      sendPhoneOtp,
      verifyPhoneOtp,
      signInWithOAuth,
      signOut,
    }),
    [
      user,
      userRole,
      loading,
      signIn,
      signUp,
      sendPhoneOtp,
      verifyPhoneOtp,
      signInWithOAuth,
      signOut,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (ctx === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}
