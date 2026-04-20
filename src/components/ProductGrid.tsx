"use client";

import type { Product } from "@/lib/types";
import { ProductCard } from "./ProductCard";
import { StaggerContainer, StaggerItem, FadeIn } from "./MotionWrapper";

interface ProductGridProps {
  title: string;
  subtitle?: string;
  products: Product[];
  id?: string;
  variant?: "light" | "alt";
}

export function ProductGrid({
  title,
  subtitle,
  products,
  id,
  variant = "light",
}: ProductGridProps) {
  if (products.length === 0) return null;

  return (
    <section
      id={id}
      className={`scroll-mt-20 py-20 sm:py-28 ${
        variant === "alt"
          ? "bg-gradient-to-b from-white via-brand-offwhite to-brand-blush/10"
          : "bg-gradient-to-b from-brand-offwhite via-white to-brand-offwhite"
      }`}
    >
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center">
            {/* <span className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-brand-teal/10 bg-white/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-teal shadow-sm">
              Our collection
            </span> */}
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-brand-teal sm:text-4xl lg:text-5xl">
              {title}
            </h2>
            {subtitle && (
              <p className="mx-auto mt-4 max-w-2xl text-lg text-brand-teal/60">
                {subtitle}
              </p>
            )}
            <div className="mx-auto mt-5 h-1 w-20 rounded-full bg-gradient-to-r from-brand-rose via-brand-lavender to-brand-blush" />
          </div>
        </FadeIn>

        <StaggerContainer className="mt-14 grid grid-cols-2 gap-3 gap-y-6 sm:gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <StaggerItem key={product.id} className="min-w-0">
              <ProductCard product={product} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
