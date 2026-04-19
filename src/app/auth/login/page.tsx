import { AuthForm } from "@/components/AuthForm";

type LoginPageProps = {
  searchParams?: {
    registered?: string | string[];
    next?: string | string[];
  };
};

function firstQueryValue(value?: string | string[]) {
  return Array.isArray(value) ? value[0] : value;
}

function normalizeRedirectTarget(value?: string | string[]) {
  const next = firstQueryValue(value);
  return next && next.startsWith("/") ? next : "/";
}

export default function LoginPage({ searchParams }: LoginPageProps) {
  const registered = firstQueryValue(searchParams?.registered) === "1";
  const redirectTo = normalizeRedirectTarget(searchParams?.next);

  return (
    <AuthForm
      variant="login"
      registeredBanner={registered}
      redirectTo={redirectTo}
    />
  );
}
