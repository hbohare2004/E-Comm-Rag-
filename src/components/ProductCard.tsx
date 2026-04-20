"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Star, ShoppingCart, Check, Leaf, Award } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { Product } from "@/lib/types";
import { useCart } from "@/context/CartContext";

const categoryStyles: Record<
  string,
  { dot: string; bg: string; text: string }
> = {
  pads: {
    dot: "bg-brand-rose",
    bg: "bg-brand-blush/25",
    text: "text-brand-teal",
  },
  diapers: {
    dot: "bg-brand-lavender",
    bg: "bg-brand-lavender/25",
    text: "text-brand-teal",
  },
  masks: {
    dot: "bg-brand-mustard",
    bg: "bg-brand-mustard/20",
    text: "text-brand-teal",
  },
};

const bestSellers = ["pad-001", "pad-003", "diaper-002"];
const recommended = ["pad-002", "pad-004", "diaper-001"];

export function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const catStyle = categoryStyles[product.category] ?? categoryStyles.pads;

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
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 380, damping: 28 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-brand-teal/8 bg-white shadow-[0_4px_24px_-6px_rgba(26,49,61,0.08)] transition-all duration-300 hover:border-brand-blush/35 hover:shadow-[0_20px_40px_-12px_rgba(26,49,61,0.12)]"
    >
      <div className="absolute right-3 top-3 z-10 flex flex-col gap-1.5">
        {isBestSeller && (
          <span className="inline-flex items-center gap-1 rounded-full border border-brand-mustard/30 bg-gradient-to-r from-brand-mustard/25 to-brand-blush/30 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-brand-teal shadow-sm">
            <Award className="h-3 w-3 text-brand-mustard" />
            Best Seller
          </span>
        )}
        {isRecommended && (
          <span className="inline-flex items-center gap-1 rounded-full bg-brand-teal px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-brand-offwhite shadow-sm">
            Recommended
          </span>
        )}
      </div>

      <Link
        href={`/product/${product.id}`}
        className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-brand-offwhite to-brand-blush/15"
      >
        {product.thumbnail_url ? (
          <Image
            src={product.thumbnail_url}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
            sizes="(max-width: 639px) 50vw, (max-width: 1024px) 50vw, 25vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <motion.span
              className="text-7xl"
              whileHover={{ scale: 1.1, rotate: 4 }}
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

        <div
          className={`absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-xl ${catStyle.bg} px-3 py-1.5 text-xs font-semibold ${catStyle.text} backdrop-blur-sm`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${catStyle.dot}`} />
          <span className="capitalize">{product.category}</span>
        </div>

        <div className="absolute bottom-3 left-3 inline-flex items-center gap-1 rounded-xl border border-success-100/70 bg-success-50/85 px-2.5 py-1 text-[10px] font-medium text-success-600 backdrop-blur-sm">
          <Leaf className="h-3 w-3 text-success-500" />
          Eco-friendly
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-brand-teal/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </Link>

      <div className="flex flex-1 flex-col p-3 sm:p-5">
        <Link href={`/product/${product.id}`}>
          <h3 className="line-clamp-2 font-display text-sm font-semibold leading-snug text-brand-teal sm:text-[15px] transition-colors duration-300 group-hover:text-brand-rose">
            {product.name}
          </h3>
        </Link>

        <div className="mt-2.5 flex items-center gap-2">
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-3.5 w-3.5 ${
                  i < Math.round(product.rating)
                    ? "fill-brand-mustard text-brand-mustard"
                    : "fill-brand-offwhite text-brand-lavender/40"
                }`}
              />
            ))}
          </div>
          <span className="text-xs font-medium text-brand-teal/50">
            ({product.review_count})
          </span>
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5">
          <span className="rounded-lg bg-brand-blush/20 px-2 py-0.5 text-[10px] font-medium text-brand-teal">
            Dermatologically tested
          </span>
          <span className="rounded-lg bg-brand-lavender/20 px-2 py-0.5 text-[10px] font-medium text-brand-teal">
            Rash-free comfort
          </span>
        </div>

        <div className="mt-auto flex items-center justify-between gap-3 pt-4 sm:pt-5">
          <div className="min-w-0">
            <span className="text-lg font-bold text-brand-teal sm:text-xl">
              ₹{product.price.toFixed(0)}
            </span>
            <span className="ml-0.5 text-xs text-brand-teal/45">.00</span>
          </div>
          <motion.button
            type="button"
            whileTap={{ scale: 0.92 }}
            onClick={handleAddToCart}
            className={`relative flex h-11 min-w-[2.75rem] shrink-0 items-center justify-center rounded-xl px-3 text-white shadow-lg transition-all duration-300 sm:h-12 sm:min-w-[3rem] ${
              added
                ? "bg-success-500 shadow-success-500/25"
                : "bg-gradient-to-br from-brand-teal to-brand-teal/90 shadow-brand-teal/20 hover:from-brand-teal hover:to-brand-rose hover:shadow-xl"
            }`}
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
