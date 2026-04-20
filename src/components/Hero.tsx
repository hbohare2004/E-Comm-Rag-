"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Shield, Heart, Star, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const trustBadges = [
  { icon: Shield, label: "Clinically tested" },
  { icon: Heart, label: "Dermatologist friendly" },
  { icon: Star, label: "4.9 average rating" },
];

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

export function Hero() {
  return (
    <section className="relative isolate min-h-[100svh] w-full overflow-hidden md:min-h-[min(92vh,960px)]">
      {/* Background templates — desktop / mobile; illustration stays uncovered */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <Image
          src="/images/hero-desktop.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="hidden object-cover object-left md:block"
        />
        <Image
          src="/images/hero-mobile.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[left_top] md:hidden"
        />
      </div>

      {/* Content lives only in the template’s light (white) safe zone */}
      <div className="mx-auto flex min-h-[100svh] max-w-[1400px] flex-col justify-start px-5 pb-20 pt-28 md:min-h-[min(92vh,960px)] md:justify-center md:px-10 md:pb-16 md:pt-20 lg:px-14">
        <div className="w-full max-w-md text-center md:ml-0 md:mr-auto md:max-w-[min(26rem,44vw)] md:text-left">
          <motion.p
            {...fadeUp}
            transition={{ duration: 0.5 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-teal/10 bg-white/80 px-4 py-2 text-xs font-medium text-brand-teal shadow-sm backdrop-blur-sm md:text-sm"
          >
            <Sparkles className="h-3.5 w-3.5 text-brand-rose" aria-hidden />
            Trusted feminine care
          </motion.p>

          <motion.h1
            {...fadeUp}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="font-display text-[2.125rem] font-bold leading-[1.1] tracking-tight text-brand-teal sm:text-5xl lg:text-[3.25rem]"
          >
            Your comfort,{" "}
            <span className="gradient-text">our promise</span>
          </motion.h1>

          <motion.p
            {...fadeUp}
            transition={{ duration: 0.55, delay: 0.12 }}
            className="mt-5 text-left text-base leading-relaxed text-brand-teal/75 sm:text-lg"
          >
            Premium pads and care essentials — ultra-soft, breathable, and made
            to move with you. Thoughtfully designed for confidence every day.
          </motion.p>

          <motion.div
            {...fadeUp}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="mt-8 flex w-full flex-col gap-3 sm:flex-row sm:justify-center md:justify-start"
          >
            <Link
              href="/#pads"
              className="btn-glow inline-flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-brand-teal px-8 text-base font-semibold text-brand-offwhite shadow-lg shadow-brand-teal/20 transition hover:bg-brand-teal/95 sm:w-auto"
            >
              Shop collection
              <ArrowRight className="h-5 w-5 shrink-0" aria-hidden />
            </Link>
            <Link
              href="/#why-choose"
              className="inline-flex h-14 w-full items-center justify-center rounded-2xl border border-brand-teal/15 bg-white/85 px-8 text-base font-semibold text-brand-teal shadow-md backdrop-blur-sm transition hover:border-brand-blush/40 hover:bg-white sm:w-auto"
            >
              Why Cottorin
            </Link>
          </motion.div>

          <motion.div
            {...fadeUp}
            transition={{ duration: 0.55, delay: 0.28 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4 md:justify-start"
          >
            {trustBadges.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 rounded-xl border border-brand-teal/8 bg-white/75 px-3 py-2 shadow-sm backdrop-blur-sm"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-blush/35 to-brand-lavender/25 text-brand-teal">
                  <Icon className="h-4 w-4" strokeWidth={1.75} aria-hidden />
                </span>
                <span className="text-left text-xs font-medium text-brand-teal/85">
                  {label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
