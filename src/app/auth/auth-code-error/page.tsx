import Link from "next/link";
import { ShieldCheck } from "lucide-react";

export default function AuthCodeErrorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-accent-100/80 px-4 py-12">
      <div className="mx-auto flex max-w-md flex-col gap-8">
        <header className="text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-400 to-accent-400 text-white shadow-md shadow-primary-500/20">
            <ShieldCheck className="h-8 w-8" strokeWidth={1.75} aria-hidden />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
            Sign-in link didn&apos;t work
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            The link may have expired or already been used. Try signing in again.
          </p>
        </header>
        <div className="rounded-2xl border border-slate-100/80 bg-white p-8 shadow-lg shadow-slate-200/50 ring-1 ring-slate-100/60">
          <Link
            href="/auth/login"
            className="flex w-full items-center justify-center rounded-xl bg-primary-500 py-3 text-sm font-semibold text-white shadow-md shadow-primary-500/25 transition hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500/40"
          >
            Back to sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
