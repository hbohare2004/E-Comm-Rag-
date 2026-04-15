import { HeroSkeleton } from "@/components/Skeletons/HeroSkeleton";
import { ProductGridSkeleton } from "@/components/Skeletons/ProductGridSkeleton";

export default function HomeLoading() {
  return (
    <>
      <HeroSkeleton />
      {/* Trust section skeleton */}
      <div className="bg-ivory py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex animate-pulse-soft flex-col items-center gap-3">
            <div className="h-6 w-24 rounded-full bg-primary-100/40" />
            <div className="h-9 w-56 rounded-2xl bg-primary-100/40" />
            <div className="h-4 w-72 rounded-xl bg-primary-100/30" />
          </div>
          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="animate-pulse-soft rounded-3xl border border-primary-100/20 bg-white p-8 text-center shadow-card-soft"
              >
                <div className="mx-auto h-16 w-16 rounded-2xl bg-primary-50" />
                <div className="mx-auto mt-6 h-5 w-32 rounded-xl bg-primary-100/30" />
                <div className="mx-auto mt-3 h-4 w-48 rounded-lg bg-primary-100/20" />
              </div>
            ))}
          </div>
        </div>
      </div>
      <ProductGridSkeleton count={6} />
      <ProductGridSkeleton count={4} />
    </>
  );
}
