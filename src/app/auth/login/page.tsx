"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { AuthForm } from "@/components/AuthForm";

function LoginContent() {
  const searchParams = useSearchParams();
  const registered = searchParams.get("registered") === "1";
  return <AuthForm variant="login" registeredBanner={registered} />;
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-ivory via-white to-primary-50 px-4 py-12">
          <div className="mx-auto max-w-md animate-pulse-soft rounded-3xl bg-white/60 p-8 shadow-premium" />
        </div>
      }
    >
      <LoginContent />
    </Suspense>
  );
}
