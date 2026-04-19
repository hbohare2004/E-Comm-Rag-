import { AuthForm } from "@/components/AuthForm";

type SignupPageProps = {
  searchParams?: {
    next?: string | string[];
  };
};

function normalizeRedirectTarget(value?: string | string[]) {
  const next = Array.isArray(value) ? value[0] : value;
  return next && next.startsWith("/") ? next : "/";
}

export default function SignupPage({ searchParams }: SignupPageProps) {
  return (
    <AuthForm
      variant="signup"
      redirectTo={normalizeRedirectTarget(searchParams?.next)}
    />
  );
}
