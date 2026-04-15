"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Heart } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

function normalizeE164(raw: string): string {
  const t = raw.trim().replace(/\s/g, "");
  if (!t) return "";
  return t.startsWith("+") ? t : `+${t}`;
}

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

function AppleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.53 4.08zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
    </svg>
  );
}

type Props = {
  variant: "login" | "signup";
  registeredBanner?: boolean;
};

export function AuthForm({ variant, registeredBanner }: Props) {
  const router = useRouter();
  const {
    signIn,
    signUp,
    sendPhoneOtp,
    verifyPhoneOtp,
    signInWithOAuth,
  } = useAuth();

  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [phoneStep, setPhoneStep] = useState<"enter" | "verify">("enter");
  const [phoneSubmitting, setPhoneSubmitting] = useState(false);
  const [oauthLoading, setOauthLoading] = useState<string | null>(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailSubmitting, setEmailSubmitting] = useState(false);
  const [showEmail, setShowEmail] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const title = variant === "login" ? "Welcome Back" : "Join PureCare";
  const subtitle =
    variant === "login"
      ? "Sign in to your account"
      : "Create your account to get started";

  async function handleSendOtp(e: FormEvent) {
    e.preventDefault();
    setError(null);
    const normalized = normalizeE164(phone);
    if (normalized.length < 8) {
      setError("Enter a valid mobile number with country code (e.g. +91…).");
      return;
    }
    setPhoneSubmitting(true);
    try {
      await sendPhoneOtp(normalized);
      setPhone(normalized);
      setPhoneStep("verify");
      setOtp("");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Could not send the code. Try again.",
      );
    } finally {
      setPhoneSubmitting(false);
    }
  }

  async function handleVerifyOtp(e: FormEvent) {
    e.preventDefault();
    setError(null);
    const code = otp.replace(/\D/g, "");
    if (code.length < 6) {
      setError("Enter the 6-digit code from your SMS.");
      return;
    }
    setPhoneSubmitting(true);
    try {
      await verifyPhoneOtp(phone, code);
      router.push("/");
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Invalid code. Please try again.",
      );
    } finally {
      setPhoneSubmitting(false);
    }
  }

  async function handleOAuth(provider: "google" | "apple") {
    setError(null);
    setOauthLoading(provider);
    try {
      await signInWithOAuth(provider);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong. Try again.",
      );
      setOauthLoading(null);
    }
  }

  async function handleEmailSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    if (variant === "signup" && password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setEmailSubmitting(true);
    try {
      if (variant === "login") {
        await signIn(email, password);
        router.push("/");
      } else {
        await signUp(email, password);
        router.push("/auth/login?registered=1");
      }
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong. Try again.",
      );
    } finally {
      setEmailSubmitting(false);
    }
  }

  const inputClass =
    "w-full rounded-2xl border border-primary-100 bg-white px-4 py-3 text-plum outline-none transition duration-300 placeholder:text-plum-400/50 focus:border-primary-300 focus:ring-2 focus:ring-primary-500/15";

  return (
    <div className="min-h-screen bg-gradient-to-br from-ivory via-white to-primary-50 px-4 py-12 transition-colors duration-300">
      <div className="mx-auto flex max-w-md flex-col gap-8">
        <header className="text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-primary-400 text-white shadow-lg shadow-primary-500/20 transition-transform duration-300 hover:scale-105">
            <Heart className="h-7 w-7" strokeWidth={1.75} fill="currentColor" aria-hidden />
          </div>
          <h1 className="font-display text-2xl font-bold tracking-tight text-plum">
            PureCare
          </h1>
          <p className="mt-1 text-sm text-plum-400">{subtitle}</p>
        </header>

        <div className="rounded-3xl border border-primary-100/30 bg-white/90 p-8 shadow-premium backdrop-blur-sm">
          {registeredBanner && variant === "login" && (
            <div
              className="mb-6 rounded-2xl border border-emerald-200/60 bg-emerald-50/80 px-4 py-3 text-sm text-emerald-700"
              role="status"
            >
              Account created successfully. You can sign in now.
            </div>
          )}

          <p className="mb-5 text-center text-lg font-bold text-plum">
            {title}
          </p>

          {error && (
            <div
              className="mb-5 rounded-2xl border border-primary-200 bg-primary-50 px-4 py-3 text-sm text-primary-700"
              role="alert"
            >
              {error}
            </div>
          )}

          <div className="space-y-3">
            <button
              type="button"
              disabled={oauthLoading !== null}
              onClick={() => void handleOAuth("google")}
              className="flex w-full items-center justify-center gap-3 rounded-2xl border border-primary-100 bg-white py-3.5 text-sm font-medium text-plum shadow-sm transition hover:border-primary-200 hover:bg-primary-50/50 focus:outline-none focus:ring-2 focus:ring-primary-500/20 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <GoogleIcon className="h-5 w-5 shrink-0" />
              {oauthLoading === "google" ? "Redirecting…" : "Continue with Google"}
            </button>
            <button
              type="button"
              disabled={oauthLoading !== null}
              onClick={() => void handleOAuth("apple")}
              className="flex w-full items-center justify-center gap-3 rounded-2xl bg-plum py-3.5 text-sm font-medium text-white shadow-sm transition hover:bg-plum-600 focus:outline-none focus:ring-2 focus:ring-plum/30 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <AppleIcon className="h-5 w-5 shrink-0 text-white" />
              {oauthLoading === "apple" ? "Redirecting…" : "Continue with Apple"}
            </button>
          </div>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center" aria-hidden>
              <div className="w-full border-t border-primary-100" />
            </div>
            <div className="relative flex justify-center text-xs uppercase tracking-wide">
              <span className="bg-white px-3 text-plum-400">or mobile</span>
            </div>
          </div>

          {phoneStep === "enter" ? (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <label
                  htmlFor="auth-phone"
                  className="mb-1.5 block text-sm font-medium text-plum"
                >
                  Mobile number
                </label>
                <input
                  id="auth-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={inputClass}
                  placeholder="+91 98765 43210"
                />
                <p className="mt-1.5 text-xs text-plum-400">
                  Include country code (E.164). We&apos;ll send a one-time code by SMS.
                </p>
              </div>
              <button
                type="submit"
                disabled={phoneSubmitting}
                className="w-full rounded-2xl bg-gradient-to-r from-primary-500 to-primary-600 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary-500/25 transition duration-300 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
              >
                {phoneSubmitting ? "Sending code…" : "Send OTP"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <p className="text-sm text-plum-400">
                Code sent to{" "}
                <span className="font-medium text-plum">{phone}</span>
              </p>
              <div>
                <label
                  htmlFor="auth-otp"
                  className="mb-1.5 block text-sm font-medium text-plum"
                >
                  One-time code
                </label>
                <input
                  id="auth-otp"
                  name="otp"
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  maxLength={8}
                  required
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className={`${inputClass} text-center font-mono text-lg tracking-widest`}
                  placeholder="••••••"
                />
              </div>
              <button
                type="submit"
                disabled={phoneSubmitting}
                className="w-full rounded-2xl bg-gradient-to-r from-primary-500 to-primary-600 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary-500/25 transition duration-300 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
              >
                {phoneSubmitting ? "Verifying…" : "Verify & continue"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setPhoneStep("enter");
                  setOtp("");
                  setError(null);
                }}
                className="w-full text-center text-sm font-medium text-primary-500 hover:text-primary-600 hover:underline"
              >
                Use a different number
              </button>
            </form>
          )}

          <div className="mt-6 border-t border-primary-100/50 pt-6">
            <button
              type="button"
              onClick={() => setShowEmail((v) => !v)}
              className="w-full text-center text-sm font-medium text-plum-400 hover:text-plum"
            >
              {showEmail ? "Hide email sign-in" : "Use email & password instead"}
            </button>

            {showEmail && (
              <form
                onSubmit={handleEmailSubmit}
                className="mt-4 space-y-4 border-t border-primary-100/50 pt-4"
              >
                <div>
                  <label
                    htmlFor="auth-email"
                    className="mb-1.5 block text-sm font-medium text-plum"
                  >
                    Email
                  </label>
                  <input
                    id="auth-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={inputClass}
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="auth-password"
                    className="mb-1.5 block text-sm font-medium text-plum"
                  >
                    Password
                  </label>
                  <input
                    id="auth-password"
                    name="password"
                    type="password"
                    autoComplete={
                      variant === "login" ? "current-password" : "new-password"
                    }
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={inputClass}
                    placeholder="••••••••"
                  />
                </div>
                {variant === "signup" && (
                  <div>
                    <label
                      htmlFor="auth-confirm"
                      className="mb-1.5 block text-sm font-medium text-plum"
                    >
                      Confirm password
                    </label>
                    <input
                      id="auth-confirm"
                      name="confirmPassword"
                      type="password"
                      autoComplete="new-password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className={inputClass}
                      placeholder="••••••••"
                    />
                  </div>
                )}
                <button
                  type="submit"
                  disabled={emailSubmitting}
                  className="w-full rounded-2xl border border-primary-100 bg-primary-50 py-3.5 text-sm font-semibold text-primary-600 transition hover:bg-primary-100 focus:outline-none focus:ring-2 focus:ring-primary-500/20 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {emailSubmitting
                    ? variant === "login"
                      ? "Signing in…"
                      : "Creating account…"
                    : variant === "login"
                      ? "Sign in with email"
                      : "Create account with email"}
                </button>
              </form>
            )}
          </div>

          <p className="mt-6 text-center text-sm text-plum-400">
            {variant === "login" ? (
              <>
                Don&apos;t have an account?{" "}
                <Link
                  href="/auth/signup"
                  className="font-semibold text-primary-500 underline-offset-4 transition hover:text-primary-600 hover:underline"
                >
                  Create one
                </Link>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <Link
                  href="/auth/login"
                  className="font-semibold text-primary-500 underline-offset-4 transition hover:text-primary-600 hover:underline"
                >
                  Sign in
                </Link>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
