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

  if (error) {
    console.error("Error fetching products:", error);
    return sampleProducts;
  }

  // Combine database products with sample products so the user can see everything
  if (data && data.length > 0) {
    const dbProducts = data as Product[];
    return [...dbProducts, ...sampleProducts.filter(sp => !dbProducts.find(dp => dp.id === sp.id))];
  }

  return sampleProducts;
}

export default async function Home() {
  const products = await getProducts();
  const pads = products.filter((p) => p.category === "pads");
  const diapers = products.filter((p) => p.category === "diapers");
  const masks = products.filter((p) => p.category === "masks");

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
      {/* <ProductGrid
        title="Protective Masks"
        subtitle="Comfortable, reliable everyday protection for families and healthcare needs."
        products={masks}
        id="masks"
      /> */}
      {/* <EducationSection /> */}
      {/* <CtaBanner /> */}
      <TrustSection />
      <ReviewSection />
    </>
  );
}
