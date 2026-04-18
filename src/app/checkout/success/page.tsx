"use client";

import Link from "next/link";
import { CheckCircle, ShoppingBag, Package } from "lucide-react";
import { useEffect, useRef } from "react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { createClient } from "@/utils/supabase/client";
import type { OrderItem } from "@/lib/types";

export default function CheckoutSuccessPage() {
  const { items, clearCart, totalPrice } = useCart();
  const { user } = useAuth();
  const savedRef = useRef(false);

  useEffect(() => {
    if (savedRef.current || !user || items.length === 0) {
      if (items.length > 0) clearCart();
      return;
    }
    savedRef.current = true;

    const orderItems: OrderItem[] = items.map((item) => ({
      name: item.product.name,
      price: item.product.price,
      quantity: item.quantity,
      image_url: item.product.thumbnail_url || item.product.image_url,
    }));

    const supabase = createClient();
    void supabase
      .from("orders")
      .insert({
        user_id: user.id,
        items: orderItems,
        total_amount: totalPrice,
        status: "completed",
      })
      .then(() => clearCart());
  }, [user, items, clearCart, totalPrice]);

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-emerald-50/50 to-white">
      <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-20 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
          <CheckCircle className="h-10 w-10 text-emerald-500" strokeWidth={1.5} />
        </div>

        <h1 className="mt-6 text-3xl font-bold text-slate-900">
          Order Confirmed!
        </h1>
        <p className="mt-3 text-lg text-slate-600">
          Thank you for your purchase. Your order has been placed successfully.
        </p>
        <p className="mt-2 text-sm text-slate-500">
          You will receive a confirmation email shortly with your order details.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl bg-primary-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary-500/25 transition hover:bg-primary-600"
          >
            <ShoppingBag className="h-4 w-4" />
            Continue Shopping
          </Link>
          <Link
            href="/profile/orders"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-primary-300 hover:text-primary-600"
          >
            <Package className="h-4 w-4" />
            View Orders
          </Link>
        </div>
      </div>
    </div>
  );
}
