"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Shield, Heart, Star, Droplets, Wind, Feather } from "lucide-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

const stats = [
  { icon: Shield, label: "Clinically Tested", value: "100%" },
  { icon: Heart, label: "Happy Customers", value: "50K+" },
  { icon: Star, label: "Average Rating", value: "4.9★" },
];

const padLayers = [
  {
    label: "Soft Cotton Cover",
    description: "Gentle on sensitive skin",
    color: "from-white to-primary-50",
    icon: Feather,
  },
  {
    label: "Absorption Core",
    description: "3x faster absorption",
    color: "from-primary-100 to-primary-200",
    icon: Droplets,
  },
  {
    label: "Leak-Proof Shield",
    description: "360° protection",
    color: "from-primary-200 to-primary-300",
    icon: Shield,
  },
  {
    label: "Breathable Base",
    description: "All-day comfort",
    color: "from-accent-100 to-accent-200",
    icon: Wind,
  },
];

type PadLayer = (typeof padLayers)[number];

/** Index-based stagger on layersScrollProgress (0→1 over layersRef scroll span). */
function useLayerScrollTransforms(
  i: number,
  scrollYProgress: MotionValue<number>,
  prefersReducedMotion: boolean | null
) {
  const start = i * 0.08;
  const end = start + 0.3;
  const reduced = prefersReducedMotion === true;
  const clampOpts = { clamp: true } as const;

  const opacity = useTransform(
    scrollYProgress,
    [start, end],
    reduced ? [1, 1] : [0, 1],
    clampOpts
  );
  const x = useTransform(
    scrollYProgress,
    [start, end],
    reduced ? [0, 0] : [-50, 0],
    clampOpts
  );
  const y = useTransform(
    scrollYProgress,
    [start, end],
    reduced ? [0, 0] : [30, 0],
    clampOpts
  );
  const scale = useTransform(
    scrollYProgress,
    [start, end],
    reduced ? [1, 1] : [0.9, 1],
    clampOpts
  );

  return { opacity, x, y, scale };
}

function PadLayerRow({
  layer,
  index,
  scrollYProgress,
  prefersReducedMotion,
}: {
  layer: PadLayer;
  index: number;
  scrollYProgress: MotionValue<number>;
  prefersReducedMotion: boolean | null;
}) {
  const { opacity, x, y, scale } = useLayerScrollTransforms(
    index,
    scrollYProgress,
    prefersReducedMotion
  );

  return (
    <div className="pad-layer relative">
      <motion.div
        className={`group/pad-row flex cursor-default items-center gap-3 rounded-2xl bg-gradient-to-r ${layer.color} px-4 py-3 shadow-sm transition-all duration-300 sm:gap-4 sm:px-5 sm:py-4 lg:hover:shadow-md`}
        style={{ opacity, x, y, scale }}
      >
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/80 shadow-sm transition-transform duration-300 sm:h-10 sm:w-10 lg:group-hover/pad-row:scale-105">
          <layer.icon className="h-4 w-4 text-primary-500 sm:h-5 sm:w-5" />
        </div>
        <div className="pad-label min-w-0 flex-1 opacity-100 transition-opacity duration-300 lg:opacity-0 lg:group-hover/pad-row:opacity-100">
          <p className="text-[13px] font-semibold leading-snug text-plum sm:text-sm">{layer.label}</p>
          <p className="text-[11px] text-plum-400 sm:text-xs">{layer.description}</p>
        </div>
      </motion.div>
    </div>
  );
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const layersRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const { scrollYProgress: layersScrollProgress } = useScroll({
    target: layersRef,
    offset: ["start end", "end start"],
  });
  const scrollHintOpacity = useTransform(scrollYProgress, [0, 0.18], [1, 0]);

  return (
    <section ref={sectionRef} className="relative min-h-[90vh] overflow-hidden bg-gradient-hero">
      {/* Floating decorative blobs */}
      <motion.div
        className="absolute -right-40 -top-40 h-[600px] w-[600px] rounded-full bg-primary-200/20 blur-[120px]"
        animate={{ y: [0, -30, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-60 -left-40 h-[500px] w-[500px] rounded-full bg-accent-200/25 blur-[100px]"
        animate={{ y: [0, 20, 0], x: [0, 10, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      <motion.div
        className="absolute right-1/4 top-1/3 h-80 w-80 rounded-full bg-gold-200/20 blur-[90px]"
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 4 }}
      />

      {/* Subtle dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(194,24,91,0.4) 1px, transparent 0)`,
          backgroundSize: "48px 48px",
        }}
      />

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-2 w-2 rounded-full bg-primary-300/40"
          style={{
            left: `${15 + i * 15}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5,
          }}
        />
      ))}

      <div className="relative mx-auto flex max-w-7xl flex-col-reverse items-center gap-10 px-4 pb-20 pt-10 sm:px-6 md:flex-row md:gap-16 md:pb-28 md:pt-14 lg:px-8 lg:pb-36 lg:pt-16">
        {/* Left content */}
        <div className="flex flex-1 flex-col items-center text-center md:items-start md:text-left">
          {/* <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary-200/50 bg-white/80 px-5 py-2.5 text-sm font-medium text-primary-600 shadow-sm backdrop-blur-sm"
          >
            <Sparkles className="h-4 w-4 text-gold-400" />
            Trusted by 50,000+ women
          </motion.span> */}

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-balance text-4xl font-extrabold leading-[1.08] tracking-tight text-plum sm:text-5xl lg:text-6xl xl:text-7xl"
          >
            Your Comfort,{" "}
            <span className="gradient-text">Our Promise</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-plum-400 sm:text-xl"
          >
            Experience the next generation of feminine care. Ultra-soft, breathable,
            and dermatologically tested pads designed to move with you — not against you.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-10 flex w-full max-w-xl flex-nowrap items-center justify-center gap-2 self-center sm:max-w-none sm:gap-4 md:self-start md:justify-start"
          >
            <Link
              href="/#pads"
              className="btn-glow group inline-flex min-w-0 flex-1 items-center justify-center gap-1.5 rounded-2xl bg-gradient-to-r from-primary-500 to-primary-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-primary-500/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary-500/35 sm:flex-initial sm:gap-2 sm:px-8 sm:py-4 sm:text-base"
            >
              Shop Now
              <ArrowRight className="h-3.5 w-3.5 shrink-0 transition-transform duration-300 group-hover:translate-x-1 sm:h-4 sm:w-4" />
            </Link>
            <Link
              href="/#why-choose"
              className="inline-flex min-w-0 flex-1 items-center justify-center gap-2 rounded-2xl border-2 border-primary-200/60 bg-white/80 px-3 py-3 text-center text-xs font-semibold leading-snug text-plum shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary-300 hover:text-primary-600 hover:shadow-md sm:flex-initial sm:px-8 sm:py-4 sm:text-base"
            >
              Know Your Protection
            </Link>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-14 flex w-full flex-nowrap items-stretch justify-center gap-2 sm:flex-wrap sm:gap-6 md:gap-8 md:justify-start"
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex min-w-0 max-w-[33%] flex-1 items-center gap-2 rounded-2xl bg-white/70 px-2.5 py-2.5 shadow-sm backdrop-blur-sm sm:max-w-none sm:flex-none sm:gap-3 sm:px-5 sm:py-3"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary-50 to-accent-50 sm:h-11 sm:w-11">
                  <stat.icon className="h-4 w-4 text-primary-500 sm:h-5 sm:w-5" strokeWidth={1.75} />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-bold leading-tight text-plum sm:text-lg">{stat.value}</p>
                  <p className="text-[10px] leading-tight text-plum-400 sm:text-xs">{stat.label}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right visual — Interactive Pad Layers */}
        <motion.div
          initial={
            prefersReducedMotion
              ? { opacity: 1, scale: 1 }
              : { opacity: 0, scale: 0.96 }
          }
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.75,
            delay: prefersReducedMotion ? 0 : 0.15,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative flex flex-1 items-center justify-center"
        >
          <div ref={layersRef} className="relative w-full max-w-lg">
            {/* Ambient glow behind the pad */}
            <div className="pointer-events-none absolute inset-0 translate-y-4 rounded-[3rem] bg-gradient-to-br from-primary-300/30 via-accent-200/20 to-gold-200/30 blur-3xl" />

            {/* Main pad visual with layers */}
            <motion.div
              initial={
                prefersReducedMotion
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 24 }
              }
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.65,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative rounded-[2rem] border border-white/60 bg-white/90 p-5 shadow-premium backdrop-blur-sm sm:rounded-[2.5rem] sm:p-8"
            >
              <div className="mb-4 text-center">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-gold-100 px-3 py-1 text-xs font-semibold text-gold-600">
                  <Sparkles className="h-3 w-3" />
                  Interactive Layers
                </span>
              </div>

              {/* Stacked pad layers — on lg+ pointer devices: text fades in on row hover; below lg text stays visible for touch */}
              <div className="relative mx-auto flex flex-col gap-2.5 sm:gap-3">
                {padLayers.map((layer, i) => (
                  <PadLayerRow
                    key={layer.label}
                    layer={layer}
                    index={i}
                    scrollYProgress={layersScrollProgress}
                    prefersReducedMotion={prefersReducedMotion}
                  />
                ))}
              </div>

              {/* Scroll hint — fades as you leave the hero; motion reduced = static */}
              <motion.div
                className="mt-5 flex items-center justify-center gap-2 text-xs text-plum-400 sm:mt-6"
                style={{ opacity: prefersReducedMotion ? 1 : scrollHintOpacity }}
                animate={
                  prefersReducedMotion
                    ? undefined
                    : {
                        y: [0, 3, 0],
                      }
                }
                transition={{
                  duration: 2.8,
                  repeat: prefersReducedMotion ? 0 : Infinity,
                  ease: "easeInOut",
                }}
                aria-hidden="true"
              >
                <span>Scroll to see layers stack</span>
                <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </motion.div>
            </motion.div>

            {/* Floating badges — inset on small screens so they stay in view */}
            <motion.div
              className="absolute left-1 top-6 z-10 sm:-left-4 sm:top-8"
              initial={
                prefersReducedMotion
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, scale: 0.92 }
              }
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.5,
                delay: prefersReducedMotion ? 0 : 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <motion.div
                className="rounded-2xl bg-white px-3 py-2.5 shadow-card-soft sm:px-4 sm:py-3"
                animate={
                  prefersReducedMotion
                    ? undefined
                    : { y: [0, -6, 0] }
                }
                transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <Shield className="h-4 w-4 shrink-0 text-primary-500 sm:h-5 sm:w-5" />
                  <span className="text-[11px] font-semibold text-plum sm:text-xs">Rash-Free</span>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              className="absolute bottom-16 right-1 z-10 sm:-right-4 sm:bottom-20"
              initial={
                prefersReducedMotion
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, scale: 0.92 }
              }
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.5,
                delay: prefersReducedMotion ? 0 : 0.35,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <motion.div
                className="rounded-2xl bg-white px-3 py-2.5 shadow-card-soft sm:px-4 sm:py-3"
                animate={
                  prefersReducedMotion
                    ? undefined
                    : { y: [0, -8, 0] }
                }
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
              >
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <Heart className="h-4 w-4 shrink-0 text-primary-400 sm:h-5 sm:w-5" fill="currentColor" />
                  <span className="text-[11px] font-semibold text-plum sm:text-xs">Eco-Safe</span>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              className="absolute right-2 top-[28%] z-10 sm:-right-2 sm:top-1/3"
              initial={
                prefersReducedMotion
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, scale: 0.92 }
              }
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.5,
                delay: prefersReducedMotion ? 0 : 0.45,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <motion.div
                className="rounded-2xl bg-white px-3 py-2.5 shadow-card-soft sm:px-4 sm:py-3"
                animate={
                  prefersReducedMotion
                    ? undefined
                    : { y: [0, -5, 0] }
                }
                transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
              >
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <Star className="h-4 w-4 shrink-0 text-gold-400 sm:h-5 sm:w-5" fill="currentColor" />
                  <span className="text-[11px] font-semibold text-plum sm:text-xs">4.9★</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
