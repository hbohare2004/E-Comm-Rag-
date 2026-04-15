"use client";

import { useEffect, useRef, useState } from "react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn } from "./MotionWrapper";

const testimonials = [
  {
    name: "Priya S.",
    rating: 5,
    comment:
      "The best sanitary pads I have ever used! Ultra soft, no rashes, and perfect for sensitive skin. I finally feel comfortable and protected all day long.",
    product: "Ultra Comfort Pads",
    avatar: "PS",
  },
  {
    name: "Anitha R.",
    rating: 5,
    comment:
      "I switched to PureCare and the difference is incredible. No more irritation, and the absorption is amazing. These are truly premium quality.",
    product: "Organic Cotton Pads",
    avatar: "AR",
  },
  {
    name: "Meera K.",
    rating: 5,
    comment:
      "Love the eco-friendly packaging and the pads are so breathable. Perfect for Indian weather. Will never go back to any other brand!",
    product: "Overnight Protection Pads",
    avatar: "MK",
  },
  {
    name: "Divya M.",
    rating: 5,
    comment:
      "My daughter loves the teen range. They are discreet, comfortable, and give her so much confidence during school days. Thank you PureCare!",
    product: "Teen Comfort Pads",
    avatar: "DM",
  },
  {
    name: "Sneha T.",
    rating: 4,
    comment:
      "Great quality at a fair price. The organic range is my go-to now. It feels genuinely different from other brands — softer and safer.",
    product: "Ultra Comfort Pads",
    avatar: "ST",
  },
];

export function ReviewSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  const resetAutoSlide = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
  };

  useEffect(() => {
    resetAutoSlide();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const goTo = (idx: number) => {
    setDirection(idx > currentIndex ? 1 : -1);
    setCurrentIndex(idx);
    resetAutoSlide();
  };

  const goNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    resetAutoSlide();
  };

  const goPrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    resetAutoSlide();
  };

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 200 : -200, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -200 : 200, opacity: 0 }),
  };

  const t = testimonials[currentIndex];

  return (
    <section className="relative overflow-hidden bg-ivory py-24 sm:py-32">
      <div className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-primary-200/40 to-transparent" />
      <div className="absolute -left-40 top-1/3 h-80 w-80 rounded-full bg-primary-100/15 blur-[100px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center">
            <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-primary-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary-600">
              Testimonials
            </span>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-plum sm:text-4xl lg:text-5xl">
              What Our Customers Say
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-plum-400">
              Real reviews from real women who trust PureCare for their daily comfort and protection.
            </p>
          </div>
        </FadeIn>

        {/* Carousel */}
        <div className="relative mx-auto mt-16 max-w-3xl">
          <div className="relative min-h-[280px] overflow-hidden rounded-3xl border border-primary-100/30 bg-white/90 p-8 shadow-premium backdrop-blur-sm sm:p-12">
            {/* Quote decorative */}
            <div className="absolute right-8 top-8 opacity-[0.06]">
              <Quote className="h-24 w-24 text-primary-500" />
            </div>

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                {/* Stars */}
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < t.rating
                          ? "fill-gold-300 text-gold-300"
                          : "fill-primary-50 text-primary-100"
                      }`}
                    />
                  ))}
                </div>

                {/* Comment */}
                <p className="mt-6 text-lg leading-relaxed text-plum/80 sm:text-xl">
                  &ldquo;{t.comment}&rdquo;
                </p>

                {/* Reviewer */}
                <div className="mt-8 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-primary-400 text-sm font-bold text-white shadow-md shadow-primary-500/20">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-plum">{t.name}</p>
                    <p className="text-xs text-plum-400">on {t.product}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation arrows */}
          <button
            onClick={goPrev}
            className="absolute -left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-plum shadow-lg transition-all duration-300 hover:bg-primary-50 hover:text-primary-500 hover:shadow-xl sm:-left-5"
            aria-label="Previous review"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={goNext}
            className="absolute -right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-plum shadow-lg transition-all duration-300 hover:bg-primary-50 hover:text-primary-500 hover:shadow-xl sm:-right-5"
            aria-label="Next review"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Dots */}
          <div className="mt-8 flex items-center justify-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === currentIndex
                    ? "w-8 bg-gradient-to-r from-primary-500 to-primary-400"
                    : "w-2 bg-primary-200 hover:bg-primary-300"
                }`}
                aria-label={`Go to review ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
