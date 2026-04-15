"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Shield, Heart, Star, Droplets, Wind, Feather } from "lucide-react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const layersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!layersRef.current || !sectionRef.current) return;

    const layers = layersRef.current.querySelectorAll(".pad-layer");
    const labels = layersRef.current.querySelectorAll(".pad-label");

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=600",
        scrub: 1,
        pin: false,
      },
    });

    layers.forEach((layer, i) => {
      tl.fromTo(
        layer,
        { y: 0, opacity: 0.7, scale: 0.95 },
        { y: (i + 1) * 16, opacity: 1, scale: 1, duration: 0.5 },
        i * 0.15
      );
    });

    labels.forEach((label, i) => {
      tl.fromTo(
        label,
        { x: -20, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.4 },
        i * 0.15 + 0.1
      );
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

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

      <div className="relative mx-auto flex max-w-7xl flex-col-reverse items-center gap-16 px-4 py-20 sm:px-6 md:flex-row md:gap-16 md:py-28 lg:px-8 lg:py-36">
        {/* Left content */}
        <div className="flex flex-1 flex-col items-center text-center md:items-start md:text-left">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary-200/50 bg-white/80 px-5 py-2.5 text-sm font-medium text-primary-600 shadow-sm backdrop-blur-sm"
          >
            <Sparkles className="h-4 w-4 text-gold-400" />
            Trusted by 50,000+ women
          </motion.span>

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
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Link
              href="/#pads"
              className="btn-glow group inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-primary-500 to-primary-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-primary-500/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary-500/35"
            >
              Shop Now
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              href="/#why-choose"
              className="inline-flex items-center gap-2 rounded-2xl border-2 border-primary-200/60 bg-white/80 px-8 py-4 text-base font-semibold text-plum shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary-300 hover:text-primary-600 hover:shadow-md"
            >
              Know Your Protection
            </Link>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-14 flex flex-wrap items-center gap-6 sm:gap-8"
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex items-center gap-3 rounded-2xl bg-white/70 px-5 py-3 shadow-sm backdrop-blur-sm"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary-50 to-accent-50">
                  <stat.icon className="h-5 w-5 text-primary-500" strokeWidth={1.75} />
                </div>
                <div>
                  <p className="text-lg font-bold text-plum">{stat.value}</p>
                  <p className="text-xs text-plum-400">{stat.label}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right visual — Interactive Pad Layers */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="relative flex flex-1 items-center justify-center"
        >
          <div ref={layersRef} className="relative w-full max-w-lg">
            {/* Ambient glow behind the pad */}
            <div className="absolute inset-0 translate-y-4 rounded-[3rem] bg-gradient-to-br from-primary-300/30 via-accent-200/20 to-gold-200/30 blur-3xl" />

            {/* Main pad visual with layers */}
            <div className="relative rounded-[2.5rem] border border-white/60 bg-white/90 p-8 shadow-premium backdrop-blur-sm">
              <div className="mb-4 text-center">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-gold-100 px-3 py-1 text-xs font-semibold text-gold-600">
                  <Sparkles className="h-3 w-3" />
                  Interactive Layers
                </span>
              </div>

              {/* Stacked pad layers */}
              <div className="relative mx-auto flex flex-col gap-3">
                {padLayers.map((layer, i) => (
                  <div key={i} className="pad-layer relative">
                    <div
                      className={`flex items-center gap-4 rounded-2xl bg-gradient-to-r ${layer.color} px-5 py-4 shadow-sm transition-all duration-500`}
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/80 shadow-sm">
                        <layer.icon className="h-5 w-5 text-primary-500" />
                      </div>
                      <div className="pad-label">
                        <p className="text-sm font-semibold text-plum">{layer.label}</p>
                        <p className="text-xs text-plum-400">{layer.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Scroll hint */}
              <motion.div
                className="mt-6 flex items-center justify-center gap-2 text-xs text-plum-400"
                animate={{ y: [0, 4, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span>Scroll to explore layers</span>
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </motion.div>
            </div>

            {/* Floating badges around the pad */}
            <motion.div
              className="absolute -left-4 top-8 rounded-2xl bg-white px-4 py-3 shadow-card-soft"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary-500" />
                <span className="text-xs font-semibold text-plum">Rash-Free</span>
              </div>
            </motion.div>

            <motion.div
              className="absolute -right-4 bottom-20 rounded-2xl bg-white px-4 py-3 shadow-card-soft"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            >
              <div className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-primary-400" fill="currentColor" />
                <span className="text-xs font-semibold text-plum">Eco-Safe</span>
              </div>
            </motion.div>

            <motion.div
              className="absolute -right-2 top-1/3 rounded-2xl bg-white px-4 py-3 shadow-card-soft"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            >
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-gold-400" fill="currentColor" />
                <span className="text-xs font-semibold text-plum">4.9★</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
