"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  Sparkles,
  Shield,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import type { Product } from "@/lib/types";

function categoryEmoji(category: Product["category"]) {
  if (category === "pads") return "🩹";
  if (category === "diapers") return "👶";
  return "😷";
}

export default function CartPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const {
    items,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
  } = useCart();

  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  const handleCheckout = useCallback(async () => {
    setCheckoutError(null);
    if (!user) {
      router.push(`/auth/login?next=${encodeURIComponent("/cart")}`);
      return;
    }
    setCheckoutLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `Checkout failed (${res.status})`);
      }
      const data = (await res.json()) as { url?: string };
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error("No checkout URL returned");
      }
    } catch (e) {
      setCheckoutError(e instanceof Error ? e.message : "Checkout failed");
    } finally {
      setCheckoutLoading(false);
    }
  }, [items, router, user]);

  if (items.length === 0) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-ivory">
        <div className="mx-auto flex max-w-lg flex-col items-center justify-center px-4 py-20 text-center">
          <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-3xl bg-primary-50 shadow-sm">
            <ShoppingBag className="h-12 w-12 text-primary-300" strokeWidth={1.25} />
          </div>
          <h1 className="font-display text-2xl font-bold text-plum">
            Your cart is empty
          </h1>
          <p className="mt-2 text-plum-400">
            Add something you love and it will show up here.
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-[#1F2A3D] px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#E89BAE]/90 hover:shadow-xl"
          >
            <ArrowLeft className="h-4 w-4" />
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ivory">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="mb-6 inline-flex w-fit items-center gap-2 rounded-xl bg-[#1F2A3D] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#E89BAE]/90"
        >
          <ArrowLeft className="h-4 w-4" />
          Continue shopping
        </Link>

        <h1 className="font-display text-2xl font-bold tracking-tight text-plum sm:text-3xl">
          Shopping Cart
          <span className="ml-2 text-lg font-normal text-plum-400">
            ({totalItems} {totalItems === 1 ? "item" : "items"})
          </span>
        </h1>

        <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-start">
          <ul className="space-y-4 lg:col-span-8">
            <AnimatePresence>
              {items.map(({ product, quantity }) => (
                <motion.li
                  key={product.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.3 }}
                  className="flex gap-4 rounded-3xl border border-primary-100/30 bg-white p-4 shadow-card-soft"
                >
                  <Link
                    href={`/product/${product.id}`}
                    className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-gradient-to-br from-primary-50/50 to-accent-50/50 sm:h-28 sm:w-28"
                  >
                    {product.thumbnail_url ? (
                      <Image
                        src={product.thumbnail_url}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="112px"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-4xl">
                        {categoryEmoji(product.category)}
                      </div>
                    )}
                  </Link>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <Link
                          href={`/product/${product.id}`}
                          className="font-semibold text-plum transition hover:text-primary-500"
                        >
                          {product.name}
                        </Link>
                        <span className="mt-1 block w-fit rounded-xl bg-primary-50 px-2.5 py-0.5 text-xs font-medium capitalize text-primary-600">
                          {product.category}
                        </span>
                      </div>
                      <p className="shrink-0 text-sm font-semibold text-plum">
                        ₹{product.price.toFixed(2)}{" "}
                        <span className="font-normal text-plum-400">each</span>
                      </p>
                    </div>

                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-1 rounded-2xl border border-primary-100/50 bg-primary-50/50 p-1">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(product.id, quantity - 1)
                          }
                          className="flex h-9 w-9 items-center justify-center rounded-xl text-plum-400 transition hover:bg-white hover:text-plum"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="min-w-[2rem] text-center text-sm font-semibold text-plum">
                          {quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(product.id, quantity + 1)
                          }
                          className="flex h-9 w-9 items-center justify-center rounded-xl text-plum-400 transition hover:bg-white hover:text-plum"
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeFromCart(product.id)}
                        className="inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-medium text-primary-400 transition hover:bg-primary-50 hover:text-primary-600"
                        aria-label={`Remove ${product.name}`}
                      >
                        <Trash2 className="h-4 w-4" />
                        Remove
                      </button>
                    </div>
                  </div>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>

          <aside className="lg:col-span-4">
            <div className="rounded-3xl border border-primary-100/30 bg-white p-6 shadow-premium lg:sticky lg:top-24">
              <h2 className="text-lg font-bold text-plum">
                Order Summary
              </h2>
              <dl className="mt-5 space-y-3 text-sm">
                <div className="flex justify-between text-plum-400">
                  <dt>Subtotal</dt>
                  <dd className="font-medium text-plum">
                    ₹{totalPrice.toFixed(2)}
                  </dd>
                </div>
                <div className="flex justify-between text-plum-400">
                  <dt>Shipping</dt>
                  <dd className="font-medium text-emerald-600">Free</dd>
                </div>
                <div className="border-t border-primary-100/30 pt-3">
                  <div className="flex justify-between text-base font-bold text-plum">
                    <dt>Total</dt>
                    <dd>₹{totalPrice.toFixed(2)}</dd>
                  </div>
                </div>
              </dl>

              {/* Trust indicators */}
              <div className="mt-4 flex items-center gap-2 rounded-xl bg-primary-50/50 px-3 py-2">
                <Shield className="h-4 w-4 text-primary-500" />
                <span className="text-xs text-plum-400">
                  Secure checkout • Free returns
                </span>
              </div>

              {checkoutError ? (
                <p className="mt-3 text-sm text-primary-500" role="alert">
                  {checkoutError}
                </p>
              ) : null}

              <motion.button
                type="button"
                whileTap={{ scale: 0.98 }}
                onClick={handleCheckout}
                disabled={authLoading || checkoutLoading}
                className="btn-glow mt-6 w-full rounded-2xl bg-gradient-to-r from-primary-500 to-primary-600 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-primary-500/35 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <span className="flex items-center justify-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  {checkoutLoading
                    ? "Redirecting…"
                    : authLoading
                      ? "Loading…"
                      : "Proceed to Checkout"}
                </span>
              </motion.button>

              <button
                type="button"
                onClick={() => clearCart()}
                className="mt-3 w-full rounded-2xl border border-primary-100 py-3 text-sm font-medium text-plum-400 transition hover:bg-primary-50 hover:text-plum"
              >
                Clear cart
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
