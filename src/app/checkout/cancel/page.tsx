import Link from "next/link";
import { XCircle, ArrowLeft } from "lucide-react";

export default function CheckoutCancelPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-red-50/30 to-white">
      <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-20 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
          <XCircle className="h-10 w-10 text-red-500" strokeWidth={1.5} />
        </div>

        <h1 className="mt-6 text-3xl font-bold text-slate-900">
          Payment Cancelled
        </h1>
        <p className="mt-3 text-lg text-slate-600">
          Your payment was cancelled. No charges were made.
        </p>
        <p className="mt-2 text-sm text-slate-500">
          Your cart items are still saved. You can try again anytime.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/cart"
            className="inline-flex items-center gap-2 rounded-xl bg-primary-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary-500/25 transition hover:bg-primary-600"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Cart
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-primary-300 hover:text-primary-600"
          >
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}
