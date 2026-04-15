import { Hero } from "@/components/Hero";
import { TrustSection } from "@/components/TrustSection";
import { ProductGrid } from "@/components/ProductGrid";
import { ReviewSection } from "@/components/ReviewSection";
import { EducationSection } from "@/components/EducationSection";
import { CtaBanner } from "@/components/CtaBanner";
import { sampleProducts } from "@/lib/sample-data";

export default function Home() {
  const pads = sampleProducts.filter((p) => p.category === "pads");
  const diapers = sampleProducts.filter((p) => p.category === "diapers");

  return (
    <>
      <Hero />
      <TrustSection />
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
      <EducationSection />
      <CtaBanner />
      <ReviewSection />
    </>
  );
}
