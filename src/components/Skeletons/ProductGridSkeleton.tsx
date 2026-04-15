import { ProductCardSkeleton } from "./ProductCardSkeleton";

export function ProductGridSkeleton({ count = 4 }: { count?: number }) {
  return (
    <section className="bg-gradient-section py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex animate-pulse-soft flex-col items-center gap-3">
          <div className="h-6 w-24 rounded-full bg-primary-100/40" />
          <div className="h-9 w-56 rounded-2xl bg-primary-100/40" />
          <div className="h-4 w-72 rounded-xl bg-primary-100/30" />
          <div className="mt-2 h-1 w-20 rounded-full bg-primary-100/40" />
        </div>
        <div className="mt-14 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: count }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
