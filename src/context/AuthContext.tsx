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
  signUp: (email: string, password: string, nextPath?: string) => Promise<void>;
  sendPhoneOtp: (phone: string) => Promise<void>;
  verifyPhoneOtp: (phone: string, token: string) => Promise<void>;
  signInWithOAuth: (provider: Provider, nextPath?: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function getBrowserSupabase() {
  if (!isSupabaseBrowserConfigured()) return null;
  return createClient();
}

function normalizeRedirectPath(nextPath?: string) {
  return nextPath && nextPath.startsWith("/") ? nextPath : "/";
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
  const authSyncIdRef = useRef(0);

  const syncUserRole = useCallback(
    async (nextUser: User, syncId: number) => {
      if (!supabase) return;

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

      if (!mountedRef.current || authSyncIdRef.current !== syncId) return;
      setUserRole(role);
    },
    [supabase],
  );

  const applySession = useCallback(
    (nextUser: User | null) => {
      authSyncIdRef.current += 1;
      const syncId = authSyncIdRef.current;

      setUser(nextUser);

      if (!nextUser || !supabase) {
        setUserRole(null);
        return;
      }

      setUserRole(null);

      // Supabase warns against awaiting other Supabase calls inside onAuthStateChange.
      setTimeout(() => {
        void syncUserRole(nextUser, syncId);
      }, 0);
    },
    [supabase, syncUserRole],
  );

  useEffect(() => {
    mountedRef.current = true;

    if (!supabase) {
      setLoading(false);
      return;
    }
    const client: SupabaseClient = supabase;

    async function init() {
      try {
        const {
          data: { session },
        } = await client.auth.getSession();
        if (!mountedRef.current) return;
        applySession(session?.user ?? null);
      } catch {
        if (!mountedRef.current) return;
        applySession(null);
      } finally {
        if (!mountedRef.current) return;
        setLoading(false);
      }
    }

    void init();

    const {
      data: { subscription },
    } = client.auth.onAuthStateChange((_event, session) => {
      if (!mountedRef.current) return;
      applySession(session?.user ?? null);
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
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      applySession(data.session?.user ?? null);
      setLoading(false);
    },
    [applySession, supabase],
  );

  const signUp = useCallback(
    async (email: string, password: string, nextPath = "/") => {
      if (!supabase) throw new Error("Supabase is not configured");
      const siteUrl =
        typeof window !== "undefined"
          ? window.location.origin
          : (process.env.NEXT_PUBLIC_BASE_URL ?? "");
      const redirectPath = normalizeRedirectPath(nextPath);
      const callbackUrl = new URL("/auth/callback", siteUrl);
      if (redirectPath !== "/") {
        callbackUrl.searchParams.set("next", redirectPath);
      }

      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: callbackUrl.toString(),
        },
      });
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
      const { data, error } = await supabase.auth.verifyOtp({
        phone,
        token,
        type: "sms",
      });
      if (error) throw error;
      applySession(data.user ?? data.session?.user ?? null);
      setLoading(false);
    },
    [applySession, supabase],
  );

  const signInWithOAuth = useCallback(
    async (provider: Provider, nextPath = "/") => {
      if (!supabase) throw new Error("Supabase is not configured");
      const siteUrl =
        typeof window !== "undefined"
          ? window.location.origin
          : (process.env.NEXT_PUBLIC_BASE_URL ?? "");
      const redirectPath = normalizeRedirectPath(nextPath);
      const callbackUrl = new URL("/auth/callback", siteUrl);
      if (redirectPath !== "/") {
        callbackUrl.searchParams.set("next", redirectPath);
      }
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: callbackUrl.toString(),
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
    applySession(null);
    setLoading(false);
  }, [applySession, supabase]);

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
