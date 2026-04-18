"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Package,
  ShoppingBag,
  Loader2,
  ArrowLeft,
  Calendar,
  IndianRupee,
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { createClient } from "@/utils/supabase/client";
import type { Order } from "@/lib/types";

const STATUS_CONFIG = {
  completed: {
    label: "Completed",
    icon: CheckCircle,
    bg: "bg-emerald-50",
    text: "text-emerald-600",
    border: "border-emerald-200",
  },
  pending: {
    label: "Pending",
    icon: Clock,
    bg: "bg-amber-50",
    text: "text-amber-600",
    border: "border-amber-200",
  },
  cancelled: {
    label: "Cancelled",
    icon: XCircle,
    bg: "bg-red-50",
    text: "text-red-600",
    border: "border-red-200",
  },
} as const;

export default function OrdersPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const loadOrders = useCallback(async () => {
    if (!user) return;
    try {
      const supabase = createClient();
      const { data } = await supabase
        .from("orders")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (data) setOrders(data as Order[]);
    } catch {
      // silently handle
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/auth/login");
      return;
    }
    if (user) void loadOrders();
  }, [user, authLoading, router, loadOrders]);

  if (authLoading || loading) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary-500" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-ivory via-white to-primary-50/30">
      <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <Link
              href="/profile"
              className="mb-2 inline-flex items-center gap-1.5 text-sm font-medium text-plum-400 transition-colors hover:text-primary-500"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Profile
            </Link>
            <h1 className="text-2xl font-bold text-plum sm:text-3xl">
              My Orders
            </h1>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-100 to-primary-200">
            <Package className="h-6 w-6 text-primary-500" />
          </div>
        </div>

        {orders.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center gap-4 rounded-3xl border border-primary-100/30 bg-white/90 px-8 py-16 text-center shadow-premium backdrop-blur-sm"
          >
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary-50">
              <ShoppingBag className="h-10 w-10 text-primary-300" />
            </div>
            <h2 className="text-xl font-bold text-plum">No orders yet</h2>
            <p className="max-w-sm text-sm text-plum-400">
              Once you make a purchase, your order history will appear here.
            </p>
            <Link
              href="/"
              className="mt-2 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-primary-500 to-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary-500/25 transition hover:shadow-xl"
            >
              <ShoppingBag className="h-4 w-4" />
              Start Shopping
            </Link>
          </motion.div>
        ) : (
          <div className="space-y-4">
            <div className="mb-4 rounded-2xl border border-primary-100/30 bg-white/80 px-5 py-3 backdrop-blur-sm">
              <p className="text-sm font-medium text-plum-400">
                Total Orders:{" "}
                <span className="font-bold text-plum">{orders.length}</span>
              </p>
            </div>

            {orders.map((order, i) => {
              const statusCfg =
                STATUS_CONFIG[order.status] ?? STATUS_CONFIG.completed;
              const StatusIcon = statusCfg.icon;

              return (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="overflow-hidden rounded-2xl border border-primary-100/30 bg-white/90 shadow-card-soft backdrop-blur-sm transition-all duration-300 hover:shadow-card-hover"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-primary-100/20 px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1.5 text-xs text-plum-400">
                        <Calendar className="h-3.5 w-3.5" />
                        {new Date(order.created_at).toLocaleDateString(
                          "en-IN",
                          {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          }
                        )}
                      </div>
                      <span className="text-xs text-plum-400/40">|</span>
                      <span className="font-mono text-xs text-plum-400">
                        #{order.id.slice(0, 8).toUpperCase()}
                      </span>
                    </div>
                    <div
                      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${statusCfg.bg} ${statusCfg.text} ${statusCfg.border}`}
                    >
                      <StatusIcon className="h-3.5 w-3.5" />
                      {statusCfg.label}
                    </div>
                  </div>

                  <div className="px-5 py-4">
                    <div className="space-y-2.5">
                      {order.items.map((item, j) => (
                        <div
                          key={j}
                          className="flex items-center justify-between text-sm"
                        >
                          <div className="flex items-center gap-3">
                            {item.image_url && (
                              <img
                                src={item.image_url}
                                alt={item.name}
                                className="h-10 w-10 rounded-lg border border-primary-100/30 object-cover"
                              />
                            )}
                            <div>
                              <p className="font-medium text-plum">
                                {item.name}
                              </p>
                              <p className="text-xs text-plum-400">
                                Qty: {item.quantity}
                              </p>
                            </div>
                          </div>
                          <p className="flex items-center font-medium text-plum">
                            <IndianRupee className="h-3.5 w-3.5" />
                            {(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-end border-t border-primary-100/20 px-5 py-3">
                    <p className="flex items-center gap-1 text-base font-bold text-plum">
                      Total:{" "}
                      <IndianRupee className="h-4 w-4" />
                      {order.total_amount.toFixed(2)}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
