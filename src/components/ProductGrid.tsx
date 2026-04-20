"use client";

import { useState } from "react";
import type { Product } from "@/lib/types";
import { ProductCard } from "./ProductCard";
import { StaggerContainer, StaggerItem, FadeIn } from "./MotionWrapper";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  if (products.length === 0) return null;

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const paginatedProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
            <div className="mx-auto mt-5 h-1 w-20 rounded-full bg-gradient-to-r from-brand-blush via-brand-lavender to-brand-rose" />
          </div>
        </FadeIn>

        <div key={currentPage}>
          <StaggerContainer className="mt-14 grid grid-cols-2 gap-3 gap-y-6 sm:gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {paginatedProducts.map((product) => (
              <StaggerItem key={product.id} className="min-w-0">
                <ProductCard product={product} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        {totalPages > 1 && (
          <FadeIn delay={0.2}>
            <div className="mt-12 flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-brand-teal/20 bg-white text-brand-teal shadow-sm transition hover:bg-brand-offwhite hover:text-brand-rose disabled:cursor-not-allowed disabled:opacity-50"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              
              <span className="text-sm font-semibold text-brand-teal">
                Page {currentPage} of {totalPages}
              </span>

              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-brand-teal/20 bg-white text-brand-teal shadow-sm transition hover:bg-brand-offwhite hover:text-brand-rose disabled:cursor-not-allowed disabled:opacity-50"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </FadeIn>
        )}
      </div>
    </section>
  );
}
