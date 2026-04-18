"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Star, ShoppingCart, Check, Leaf, Award } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { Product } from "@/lib/types";
import { useCart } from "@/context/CartContext";

const categoryColors: Record<string, { dot: string; bg: string; text: string }> = {
  pads: { dot: "bg-primary-500", bg: "bg-primary-50", text: "text-primary-700" },
  diapers: { dot: "bg-accent-500", bg: "bg-accent-50", text: "text-accent-700" },
  masks: { dot: "bg-gold-400", bg: "bg-gold-50", text: "text-gold-600" },
};

const bestSellers = ["pad-001", "pad-003", "diaper-002"];
const recommended = ["pad-002", "pad-004", "diaper-001"];

export function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const catStyle = categoryColors[product.category] ?? categoryColors.pads;

  const isBestSeller = bestSellers.includes(product.id);
  const isRecommended = recommended.includes(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-primary-100/30 bg-white shadow-card-soft transition-all duration-500 hover:border-primary-200/50 hover:shadow-card-hover"
    >
      {/* Premium tags */}
      <div className="absolute right-3 top-3 z-10 flex flex-col gap-1.5">
        {isBestSeller && (
          <span className="gold-shimmer inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-plum shadow-sm">
            <Award className="h-3 w-3" />
            Best Seller
          </span>
        )}
        {isRecommended && (
          <span className="inline-flex items-center gap-1 rounded-full bg-primary-500 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
            Recommended
          </span>
        )}
      </div>

      <Link
        href={`/product/${product.id}`}
        className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-primary-50/50 to-accent-50/50"
      >
        {product.thumbnail_url ? (
          <Image
            src={product.thumbnail_url}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            sizes="(max-width: 639px) 50vw, (max-width: 1024px) 50vw, 25vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <motion.span
              className="text-7xl"
              whileHover={{ scale: 1.15, rotate: 5 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              {product.category === "pads"
                ? "🩹"
                : product.category === "diapers"
                ? "👶"
                : "😷"}
            </motion.span>
          </div>
        )}

        {/* Category badge */}
        <div className={`absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-xl ${catStyle.bg} px-3 py-1.5 text-xs font-semibold ${catStyle.text} backdrop-blur-sm`}>
          <span className={`h-1.5 w-1.5 rounded-full ${catStyle.dot}`} />
          <span className="capitalize">{product.category}</span>
        </div>

        {/* Eco badge */}
        <div className="absolute bottom-3 left-3 inline-flex items-center gap-1 rounded-xl bg-white/90 px-2.5 py-1 text-[10px] font-medium text-plum-400 backdrop-blur-sm">
          <Leaf className="h-3 w-3 text-emerald-500" />
          Eco-Friendly
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-plum/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </Link>

      <div className="flex flex-1 flex-col p-3 sm:p-5">
        <Link href={`/product/${product.id}`}>
          <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-plum sm:text-[15px] transition-colors duration-300 group-hover:text-primary-500">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="mt-2.5 flex items-center gap-2">
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-3.5 w-3.5 ${
                  i < Math.round(product.rating)
                    ? "fill-gold-300 text-gold-300"
                    : "fill-primary-50 text-primary-100"
                }`}
              />
            ))}
          </div>
          <span className="text-xs font-medium text-plum-400">
            ({product.review_count})
          </span>
        </div>

        {/* Trust badges */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          <span className="rounded-lg bg-primary-50 px-2 py-0.5 text-[10px] font-medium text-primary-600">
            Dermatologically Tested
          </span>
          <span className="rounded-lg bg-accent-50 px-2 py-0.5 text-[10px] font-medium text-accent-700">
            Rash-Free
          </span>
        </div>

        {/* Price + Cart */}
        <div className="mt-auto flex items-center justify-between gap-2 pt-3 sm:pt-4">
          <div className="min-w-0">
            <span className="text-base font-bold text-plum sm:text-xl">
              ₹{product.price.toFixed(0)}
            </span>
            <span className="ml-1 text-xs text-plum-400">.00</span>
          </div>
          <motion.button
            type="button"
            whileTap={{ scale: 0.85 }}
            onClick={handleAddToCart}
            className={`relative flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl shadow-lg transition-all duration-300 sm:h-11 sm:w-11 ${
              added
                ? "bg-emerald-500 shadow-emerald-500/25"
                : "bg-gradient-to-br from-primary-500 to-primary-600 shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/35"
            } text-white`}
            aria-label={`Add ${product.name} to cart`}
          >
            <AnimatePresence mode="wait">
              {added ? (
                <motion.div
                  key="check"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Check className="h-5 w-5" />
                </motion.div>
              ) : (
                <motion.div
                  key="cart"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  <ShoppingCart className="h-[18px] w-[18px]" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
