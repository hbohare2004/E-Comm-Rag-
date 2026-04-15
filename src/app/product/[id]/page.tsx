import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Star, Shield, Feather, Wind, Droplets, Leaf, Heart, Award } from "lucide-react";
import { supabase } from "@/lib/supabase";
import type { Product, Review } from "@/lib/types";
import { sampleProducts } from "@/lib/sample-data";
import { AddToCartButton } from "./AddToCartButton";

function categoryEmoji(category: Product["category"]) {
  if (category === "pads") return "🩹";
  if (category === "diapers") return "👶";
  return "😷";
}

function StarRow({ rating, className }: { rating: number; className?: string }) {
  return (
    <div className={`flex items-center gap-0.5 ${className ?? ""}`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-5 w-5 sm:h-6 sm:w-6 ${
            i < Math.round(rating)
              ? "fill-gold-300 text-gold-300"
              : "fill-primary-50 text-primary-100"
          }`}
        />
      ))}
    </div>
  );
}

const protectionLayers = [
  {
    icon: Feather,
    title: "Ultra Soft",
    description: "Cotton-like top layer that feels gentle against sensitive skin",
    color: "from-primary-50 to-white",
  },
  {
    icon: Droplets,
    title: "Leak Protection",
    description: "Advanced absorption core locks in moisture for up to 12 hours",
    color: "from-primary-100 to-primary-50",
  },
  {
    icon: Wind,
    title: "Breathable",
    description: "Micro-perforated back sheet ensures airflow and freshness",
    color: "from-accent-50 to-white",
  },
];

const trustBadges = [
  { icon: Shield, label: "Dermatologically Tested" },
  { icon: Heart, label: "Rash-Free Formula" },
  { icon: Leaf, label: "Eco-Safe Materials" },
  { icon: Award, label: "Premium Quality" },
];

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  let product: Product | null = null;
  let reviews: Review[] = [];

  if (supabase) {
    const { data: dbProduct, error: productError } = await supabase
      .from("products")
      .select("*")
      .eq("id", params.id)
      .single();

    if (!productError && dbProduct) {
      product = dbProduct as Product;
    }

    const { data: reviewRows, error: reviewsError } = await supabase
      .from("reviews")
      .select("*")
      .eq("product_id", params.id)
      .order("created_at", { ascending: false });

    if (!reviewsError && reviewRows) {
      reviews = reviewRows as Review[];
    }
  }

  if (!product) {
    product = sampleProducts.find((p) => p.id === params.id) ?? null;
  }

  if (!product) {
    notFound();
  }

  const imageSrc = product.image_url || product.thumbnail_url;

  return (
    <div className="min-h-screen bg-ivory pb-20 pt-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-plum-400 transition hover:text-primary-500"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>

        <div className="mt-8 overflow-hidden rounded-3xl border border-primary-100/30 bg-white shadow-premium">
          <div className="grid gap-0 lg:grid-cols-2">
            <div className="relative aspect-square bg-gradient-to-br from-primary-50/50 to-accent-50/50 lg:min-h-[480px]">
              {imageSrc ? (
                <Image
                  src={imageSrc}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <span className="text-[8rem] leading-none sm:text-[10rem]">
                    {categoryEmoji(product.category)}
                  </span>
                </div>
              )}
            </div>

            <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-12">
              <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-primary-50 px-4 py-1.5 text-xs font-semibold capitalize tracking-wide text-primary-600">
                <span className="h-1.5 w-1.5 rounded-full bg-primary-500" />
                {product.category}
              </span>
              <h1 className="mt-5 font-display text-3xl font-bold tracking-tight text-plum sm:text-4xl">
                {product.name}
              </h1>

              <div className="mt-6 flex flex-wrap items-center gap-4">
                <StarRow rating={product.rating} />
                <span className="text-sm text-plum-400">
                  {product.review_count} review
                  {product.review_count === 1 ? "" : "s"}
                </span>
              </div>

              <p className="mt-8 text-4xl font-bold text-plum">
                ₹{product.price.toFixed(2)}
              </p>

              <p className="mt-6 text-base leading-relaxed text-plum-400">
                {product.description}
              </p>

              {/* Trust badges */}
              <div className="mt-6 flex flex-wrap gap-2">
                {trustBadges.map((badge) => (
                  <span
                    key={badge.label}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-primary-50 px-3 py-1.5 text-xs font-medium text-primary-600"
                  >
                    <badge.icon className="h-3.5 w-3.5" />
                    {badge.label}
                  </span>
                ))}
              </div>

              <AddToCartButton product={product} />
            </div>
          </div>
        </div>

        {/* Layers of Protection — interactive section */}
        {product.category === "pads" && (
          <section className="mt-16">
            <h2 className="font-display text-2xl font-bold text-plum sm:text-3xl">
              Layers of Protection
            </h2>
            <p className="mt-2 text-plum-400">
              Every PureCare pad features multi-layer protection technology.
            </p>

            <div className="mt-8 grid gap-6 sm:grid-cols-3">
              {protectionLayers.map((layer) => (
                <div
                  key={layer.title}
                  className={`group rounded-3xl bg-gradient-to-br ${layer.color} border border-primary-100/30 p-7 transition-all duration-300 hover:shadow-card-hover`}
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm transition-transform duration-300 group-hover:scale-110">
                    <layer.icon className="h-7 w-7 text-primary-500" strokeWidth={1.5} />
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-plum">{layer.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-plum-400">
                    {layer.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Reviews */}
        <section className="mt-16">
          <h2 className="font-display text-2xl font-bold text-plum">Customer Reviews</h2>
          <p className="mt-2 text-plum-400">
            What shoppers are saying about this product.
          </p>

          {reviews.length === 0 ? (
            <p className="mt-10 rounded-3xl border border-dashed border-primary-200/50 bg-primary-50/50 px-6 py-12 text-center text-plum-400">
              No reviews yet. Be the first to share your experience.
            </p>
          ) : (
            <ul className="mt-10 space-y-6">
              {reviews.map((review) => (
                <li
                  key={review.id}
                  className="rounded-3xl border border-primary-100/30 bg-white p-6 shadow-card-soft"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <StarRow rating={review.rating} className="scale-90" />
                      <p className="mt-3 text-sm font-medium text-plum">
                        {review.user_email ?? "Verified buyer"}
                      </p>
                      <p className="mt-1 text-xs text-plum-400">
                        {new Date(review.created_at).toLocaleDateString(
                          undefined,
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </p>
                    </div>
                  </div>
                  <p className="mt-4 text-plum-400">{review.comment}</p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
