export function HeroSkeleton() {
  return (
    <section className="animate-pulse-soft bg-gradient-hero">
      <div className="mx-auto flex max-w-7xl flex-col-reverse items-center gap-8 px-4 py-16 sm:px-6 md:flex-row md:gap-12 md:py-24 lg:px-8">
        <div className="flex flex-1 flex-col items-center gap-4 md:items-start">
          <div className="h-6 w-48 rounded-full bg-primary-100/50" />
          <div className="h-12 w-full max-w-md rounded-2xl bg-primary-100/40" />
          <div className="h-12 w-3/4 max-w-sm rounded-2xl bg-primary-100/40" />
          <div className="mt-2 h-5 w-full max-w-lg rounded-xl bg-primary-100/30" />
          <div className="h-5 w-3/4 max-w-lg rounded-xl bg-primary-100/30" />
          <div className="mt-4 flex gap-4">
            <div className="h-14 w-36 rounded-2xl bg-primary-100/40" />
            <div className="h-14 w-36 rounded-2xl bg-primary-100/30" />
          </div>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="aspect-square w-full max-w-md rounded-[2.5rem] bg-primary-100/30" />
        </div>
      </div>
    </section>
  );
}
