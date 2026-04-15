export function ProductCardSkeleton() {
  return (
    <div className="animate-pulse-soft overflow-hidden rounded-3xl border border-primary-100/20 bg-white shadow-card-soft">
      <div className="aspect-[4/3] bg-gradient-to-br from-primary-50/50 to-accent-50/30" />
      <div className="p-5">
        <div className="h-4 w-3/4 rounded-xl bg-primary-100/40" />
        <div className="mt-3 h-3 w-1/2 rounded-lg bg-primary-100/30" />
        <div className="mt-3 flex gap-1">
          <div className="h-5 w-24 rounded-xl bg-primary-100/30" />
          <div className="h-5 w-16 rounded-xl bg-primary-100/25" />
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div className="h-6 w-20 rounded-xl bg-primary-100/40" />
          <div className="h-11 w-11 rounded-2xl bg-primary-100/40" />
        </div>
      </div>
    </div>
  );
}
