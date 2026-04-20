import { Hero } from "@/components/Hero";
import { TrustSection } from "@/components/TrustSection";
import { ProductGrid } from "@/components/ProductGrid";
import { ReviewSection } from "@/components/ReviewSection";
import { sampleProducts } from "@/lib/sample-data";
import { supabase } from "@/lib/supabase";
import type { Product } from "@/lib/types";

export const dynamic = "force-dynamic";

async function getProducts(): Promise<Product[]> {
  if (!supabase) return sampleProducts;

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error || !data || data.length === 0) {
    return sampleProducts;
  }

  return data as Product[];
}

export default async function Home() {
  const products = await getProducts();
  const pads = products.filter((p) => p.category === "pads");
  const diapers = products.filter((p) => p.category === "diapers");

  return (
    <>
      <Hero />
      
      <ProductGrid
        title="Premium Sanitary Pads"
        subtitle="Ultra-soft, leak-proof protection designed for all-day comfort and confidence."
        products={pads}
        id="pads"
      />
      <ProductGrid
        title="Baby Care Diapers"
        subtitle="Cloud-soft diapers that keep your little one dry, comfy, and rash-free."
        products={diapers}
        id="diapers"
        variant="alt"
      />
      {/* <EducationSection /> */}
      {/* <CtaBanner /> */}
      <TrustSection />
      <ReviewSection />
    </>
  );
}
