"use client";

import { Droplets, Calendar, Shield, Heart, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import { FadeIn, StaggerContainer, StaggerItem } from "./MotionWrapper";

const topics = [
  {
    icon: Calendar,
    title: "Know Your Cycle",
    description:
      "Understanding your menstrual cycle helps you choose the right protection. Regular cycles typically last 21–35 days.",
    color: "from-primary-500 to-primary-400",
    bg: "bg-primary-50",
  },
  {
    icon: Droplets,
    title: "Choose Your Flow",
    description:
      "Light, regular, or heavy — we have pads designed for every flow type. Pick what works best for your unique needs.",
    color: "from-primary-400 to-accent-400",
    bg: "bg-accent-50",
  },
  {
    icon: Shield,
    title: "Material Matters",
    description:
      "Organic cotton, breathable layers, and chemical-free materials make a real difference for your skin and comfort.",
    color: "from-accent-400 to-gold-400",
    bg: "bg-gold-50",
  },
  {
    icon: Heart,
    title: "Self-Care Tips",
    description:
      "Stay hydrated, exercise gently, and change pads every 4–6 hours. Your body deserves the best care during your period.",
    color: "from-gold-400 to-primary-400",
    bg: "bg-primary-50",
  },
];

const infographicSteps = [
  { number: "01", label: "Soft cotton top layer", desc: "Touches your skin" },
  { number: "02", label: "Quick-dry mesh", desc: "Pulls moisture away" },
  { number: "03", label: "Super-absorbent core", desc: "Locks in fluid" },
  { number: "04", label: "Breathable back sheet", desc: "Prevents leaks" },
];

export function EducationSection() {
  return (
    <section className="relative overflow-hidden bg-white py-24 sm:py-32">
      <div className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-primary-200/40 to-transparent" />
      <div className="absolute -right-60 bottom-0 h-[500px] w-[500px] rounded-full bg-accent-100/15 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* <FadeIn>
          <div className="text-center">
            <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-accent-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent-700">
              <BookOpen className="h-3.5 w-3.5" />
              Learn & Empower
            </span>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-plum sm:text-4xl lg:text-5xl">
              Understanding Your Hygiene
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-plum-400">
              Knowledge is power. Learn how to make the best choices for your body and well-being.
            </p>
          </div>
        </FadeIn> */}

        {/* Topics grid */}
        {/* <StaggerContainer className="mt-16 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {topics.map((topic) => (
            <StaggerItem key={topic.title}>
              <div className="premium-card group rounded-3xl p-5 sm:p-7">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl sm:h-14 sm:w-14 ${topic.bg}`}
                >
                  <topic.icon className="h-6 w-6 text-primary-500 sm:h-7 sm:w-7" strokeWidth={1.5} />
                </motion.div>
                <h3 className="mt-4 text-sm font-bold leading-snug text-plum sm:mt-5 sm:text-base">{topic.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-plum-400 sm:text-sm">{topic.description}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer> */}

        {/* Infographic: How a pad works */}
        {/* <FadeIn delay={0.2}>
          <div className="mt-20 rounded-3xl bg-gradient-to-br from-primary-50 via-white to-accent-50 p-8 sm:p-12">
            <div className="text-center">
              <h3 className="font-display text-2xl font-bold text-plum sm:text-3xl">
                How Our Pad Protects You
              </h3>
              <p className="mt-2 text-sm text-plum-400">
                4 layers of science-backed protection for maximum comfort
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {infographicSteps.map((step, i) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.5 }}
                  className="relative flex flex-col items-center text-center"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#dba1a2] text-2xl font-bold text-brand-teal shadow-lg shadow-brand-teal/10">
                    {step.number}
                  </div>
                  {i < infographicSteps.length - 1 && (
                    <div className="absolute left-[calc(50%+2rem)] top-8 hidden h-px w-[calc(100%-4rem)] bg-gradient-to-r from-primary-300 to-primary-100 lg:block" />
                  )}
                  <p className="mt-4 text-sm font-bold text-plum">{step.label}</p>
                  <p className="mt-1 text-xs text-plum-400">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </FadeIn> */}
      </div>
    </section>
  );
}
