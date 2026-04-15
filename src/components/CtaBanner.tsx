"use client";

import Link from "next/link";
import { ArrowRight, Heart, Sparkles } from "lucide-react";
import { FadeIn } from "./MotionWrapper";
import { motion } from "framer-motion";

export function CtaBanner() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-primary-600 via-primary-500 to-primary-400 py-24 sm:py-28">
      {/* Decorative elements */}
      <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute left-1/3 top-1/2 h-60 w-60 rounded-full bg-gold-300/10 blur-3xl" />

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
          <motion.div
            className="mx-auto mb-8 flex h-18 w-18 items-center justify-center rounded-3xl bg-white/15 backdrop-blur-sm"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            style={{ width: 72, height: 72 }}
          >
            <Heart className="h-9 w-9 text-white" strokeWidth={1.75} fill="currentColor" />
          </motion.div>

          <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Care That Comes From the Heart
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/80">
            Join 50,000+ women who have made the switch to PureCare.
            Experience the difference that premium, mindful protection makes.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/#pads"
              className="group inline-flex items-center gap-2 rounded-2xl bg-white px-8 py-4 text-base font-semibold text-primary-600 shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
            >
              <Sparkles className="h-4 w-4 text-gold-400" />
              Start Shopping
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              href="/auth/signup"
              className="inline-flex items-center gap-2 rounded-2xl border-2 border-white/30 px-8 py-4 text-base font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-white/60 hover:bg-white/10"
            >
              Create Account
            </Link>
          </div>

          {/* Gold shimmer badge */}
          <motion.div
            className="mx-auto mt-10 inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2 backdrop-blur-sm"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Sparkles className="h-4 w-4 text-gold-300" />
            <span className="text-sm font-medium text-white/90">
              Free shipping on all orders above ₹499
            </span>
          </motion.div>
        </FadeIn>
      </div>
    </section>
  );
}
