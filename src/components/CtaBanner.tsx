"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { FadeIn } from "./MotionWrapper";
import { motion } from "framer-motion";

export function CtaBanner() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-blush to-brand-lavender py-24 sm:py-28">
      {/* Decorative elements */}
      <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-white/25 blur-3xl" />
      <div className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-white/20 blur-3xl" />
      <div className="absolute left-1/3 top-1/2 h-60 w-60 rounded-full bg-brand-lavender/15 blur-3xl" />

      {/* Pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: "36px 36px",
        }}
      />

      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <FadeIn>
          {/* <motion.div
            className="mx-auto mb-8 flex h-18 w-18 items-center justify-center rounded-3xl border border-white/40 bg-white/50 backdrop-blur-sm"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            style={{ width: 72, height: 72 }}
          >
            <Heart className="h-9 w-9 text-brand-teal" strokeWidth={1.75} fill="currentColor" />
          </motion.div> */}

          <h2 className="font-display text-3xl font-bold tracking-tight text-brand-teal sm:text-4xl lg:text-5xl">
            Care That Comes From the Heart
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-brand-teal/85">
            Join 50,000+ women who have made the switch to Cottorin.
            Experience the difference that premium, mindful protection makes.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/#pads"
              className="group inline-flex items-center gap-2 rounded-2xl bg-brand-teal px-8 py-4 text-base font-semibold text-brand-offwhite shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-rose hover:shadow-xl"
            >
              <Sparkles className="h-4 w-4 text-brand-mustard" />
              Start Shopping
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              href="/auth/signup"
              className="inline-flex items-center gap-2 rounded-2xl border-2 border-brand-teal/35 bg-white/40 px-8 py-4 text-base font-semibold text-brand-teal backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-teal/55 hover:bg-white/60"
            >
              Create Account
            </Link>
          </div>

          {/* Gold shimmer badge */}
          <motion.div
            className="mx-auto mt-10 inline-flex items-center gap-2 rounded-full border border-brand-teal/10 bg-white/35 px-5 py-2 backdrop-blur-sm"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Sparkles className="h-4 w-4 text-brand-teal" />
            <span className="text-sm font-medium text-brand-teal/90">
              Free shipping on all orders above ₹499
            </span>
          </motion.div>
        </FadeIn>
      </div>
    </section>
  );
}
