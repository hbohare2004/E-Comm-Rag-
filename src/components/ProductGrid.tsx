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
        variant === "alt" ? "bg-gradient-section-alt" : "bg-gradient-section"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center">
            <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-primary-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary-600">
              Our Collection
            </span>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-plum sm:text-4xl lg:text-5xl">
              {title}
            </h2>
            {subtitle && (
              <p className="mx-auto mt-4 max-w-2xl text-lg text-plum-400">
                {subtitle}
              </p>
            )}
            <div className="mx-auto mt-5 h-1 w-20 rounded-full bg-gradient-to-r from-primary-500 to-primary-300" />
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
