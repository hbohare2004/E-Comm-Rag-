"use client";

import { ShieldCheck, Heart, Leaf, Award } from "lucide-react";
import { motion } from "framer-motion";
import { StaggerContainer, StaggerItem, FadeIn } from "./MotionWrapper";

const badges = [
  {
    icon: ShieldCheck,
    title: "Safe & Hygienic",
    description: "Clinically tested for safety and purity. Every batch goes through rigorous quality checks.",
    gradient: "from-primary-500 to-primary-400",
    bg: "bg-primary-50",
    iconColor: "text-primary-500",
  },
  {
    icon: Heart,
    title: "Dermatologically Tested",
    description: "Gentle on the most sensitive skin. Certified safe by leading dermatologists.",
    gradient: "from-primary-400 to-primary-300",
    bg: "bg-primary-50",
    iconColor: "text-primary-400",
  },
  {
    icon: Leaf,
    title: "Eco-Friendly",
    description: "Sustainable materials with biodegradable packaging. Caring for you and the planet.",
    gradient: "from-emerald-500 to-emerald-400",
    bg: "bg-emerald-50",
    iconColor: "text-emerald-500",
  },
  {
    icon: Award,
    title: "Premium Quality",
    description: "Award-winning products trusted by 50,000+ women across India.",
    gradient: "from-gold-400 to-gold-300",
    bg: "bg-gold-50",
    iconColor: "text-gold-500",
  },
];

// const features = [
//   { icon: Droplets, label: "3x Absorption", desc: "Advanced core technology" },
//   { icon: Feather, label: "Ultra Soft", desc: "Cotton-like comfort" },
//   { icon: Wind, label: "Breathable", desc: "All-day freshness" },
//   { icon: Sparkles, label: "Rash-Free", desc: "Hypoallergenic formula" },
// ];

export function TrustSection() {
  return (
    <section id="why-choose" className="relative scroll-mt-20 overflow-hidden bg-ivory py-24 sm:py-32">
      <div className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-primary-200/40 to-transparent" />

      {/* Subtle background decoration */}
      <div className="absolute -right-40 top-20 h-96 w-96 rounded-full bg-primary-100/20 blur-[120px]" />
      <div className="absolute -left-40 bottom-20 h-96 w-96 rounded-full bg-accent-100/20 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center">
            <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-primary-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary-600">
              Why Choose Us
            </span>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-plum sm:text-4xl lg:text-5xl">
              Why Women Trust{" "}
              <span className="gradient-text">PureCare</span>
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-plum-400">
              Every product is crafted with the highest standards of hygiene,
              comfort, and care — because you deserve nothing less.
            </p>
          </div>
        </FadeIn>

        {/* Trust badges grid */}
        <StaggerContainer className="mt-16 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {badges.map((badge) => (
            <StaggerItem key={badge.title}>
              <div className="premium-card group relative rounded-3xl p-5 text-left sm:p-8">
                <div className={`absolute left-0 right-0 top-0 h-1 rounded-t-3xl bg-gradient-to-r ${badge.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />

                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className={`mx-auto flex h-14 w-14 items-center justify-center rounded-2xl sm:h-16 sm:w-16 ${badge.bg} shadow-sm transition-shadow duration-300 group-hover:shadow-md`}
                >
                  <badge.icon
                    className={`h-7 w-7 sm:h-8 sm:w-8 ${badge.iconColor}`}
                    strokeWidth={1.75}
                  />
                </motion.div>
                <h3 className="mt-4 text-sm font-bold leading-snug text-plum sm:mt-6 sm:text-lg">
                  {badge.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-plum-400 sm:text-sm">
                  {badge.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Feature icons row */}
        {/* <FadeIn delay={0.3}>
          <div className="mt-20 rounded-3xl border border-primary-100/30 bg-white/80 p-8 shadow-sm backdrop-blur-sm sm:p-10">
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
              {features.map((feat) => (
                <motion.div
                  key={feat.label}
                  whileHover={{ y: -4 }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-50 to-accent-50">
                    <feat.icon className="h-7 w-7 text-primary-500" strokeWidth={1.5} />
                  </div>
                  <p className="mt-3 text-sm font-bold text-plum">{feat.label}</p>
                  <p className="mt-1 text-xs text-plum-400">{feat.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </FadeIn> */}
      </div>
    </section>
  );
}
