"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShoppingCart, Check, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { Product } from "@/lib/types";
import { useCart } from "@/context/CartContext";

export function AddToCartButton({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const router = useRouter();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
      <motion.button
        type="button"
        whileTap={{ scale: 0.97 }}
        onClick={handleAdd}
        className={`btn-glow inline-flex flex-1 items-center justify-center gap-2 rounded-2xl px-6 py-4 text-sm font-semibold shadow-lg transition-all duration-300 ${
          added
            ? "bg-emerald-500 shadow-emerald-500/25 text-white"
            : "bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/35"
        }`}
      >
        <AnimatePresence mode="wait">
          {added ? (
            <motion.span
              key="added"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="flex items-center gap-2"
            >
              <Check className="h-5 w-5" />
              Added to Cart!
            </motion.span>
          ) : (
            <motion.span
              key="add"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="flex items-center gap-2"
            >
              <ShoppingCart className="h-5 w-5" />
              Add to Cart
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
      <motion.button
        type="button"
        whileTap={{ scale: 0.97 }}
        onClick={() => {
          addToCart(product);
          router.push("/cart");
        }}
        className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border-2 border-primary-200/60 bg-primary-50 px-6 py-4 text-sm font-semibold text-primary-600 shadow-sm transition-all duration-300 hover:border-primary-300 hover:bg-primary-100 hover:shadow-md active:scale-[0.98]"
      >
        <Sparkles className="h-5 w-5 text-gold-400" />
        Buy Now
      </motion.button>
    </div>
  );
}
