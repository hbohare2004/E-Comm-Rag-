import type { Product } from "./types";

export const sampleProducts: Product[] = [
  // === PADS ===
  {
    id: "pad-001",
    name: "Ultra Comfort Sanitary Pads — Regular",
    description:
      "Experience all-day comfort with our ultra-soft sanitary pads. Features a breathable top sheet, rapid absorption core, and leak-proof wings. Dermatologically tested and free from harmful chemicals. Ideal for regular flow days.",
    price: 199.0,
    category: "pads",
    image_url:
      "https://images.unsplash.com/photo-1712647796215-0561c111390b?w=1200&h=900&fit=crop&auto=format&q=85",
    thumbnail_url:
      "https://images.unsplash.com/photo-1712647796215-0561c111390b?w=600&h=450&fit=crop&auto=format&q=80",
    rating: 4.8,
    review_count: 324,
    created_at: new Date().toISOString(),
  },
  {
    id: "pad-002",
    name: "Ultra Comfort Sanitary Pads — Heavy Flow",
    description:
      "Maximum protection for heavy flow days. Extra-long design with wider back coverage and double absorption core. Stays in place with secure adhesive wings. Clinically proven to absorb 3x more than regular pads.",
    price: 249.0,
    category: "pads",
    image_url:
      "https://images.unsplash.com/photo-1712842955521-55c8c01ef148?w=1200&h=900&fit=crop&auto=format&q=85",
    thumbnail_url:
      "https://images.unsplash.com/photo-1712842955521-55c8c01ef148?w=600&h=450&fit=crop&auto=format&q=80",
    rating: 4.7,
    review_count: 287,
    created_at: new Date().toISOString(),
  },
  {
    id: "pad-003",
    name: "Organic Cotton Pads — Day",
    description:
      "Made from 100% certified organic cotton. Hypoallergenic and perfect for sensitive skin. No chlorine bleaching, no dyes, no fragrances. Biodegradable and eco-friendly packaging.",
    price: 299.0,
    category: "pads",
    image_url:
      "https://images.unsplash.com/photo-1712775337261-588dbf0c4955?w=1200&h=900&fit=crop&auto=format&q=85",
    thumbnail_url:
      "https://images.unsplash.com/photo-1712775337261-588dbf0c4955?w=600&h=450&fit=crop&auto=format&q=80",
    rating: 4.9,
    review_count: 198,
    created_at: new Date().toISOString(),
  },
  {
    id: "pad-004",
    name: "Overnight Protection Pads — XL",
    description:
      "Sleep worry-free with our extra-long overnight pads. 360° leak protection with raised edges and back guard. Ultra-thin design that feels like wearing nothing. 12-hour protection guaranteed.",
    price: 279.0,
    category: "pads",
    image_url:
      "https://images.unsplash.com/photo-1589395937921-fddc324ccdd2?w=1200&h=900&fit=crop&auto=format&q=85",
    thumbnail_url:
      "https://images.unsplash.com/photo-1589395937921-fddc324ccdd2?w=600&h=450&fit=crop&auto=format&q=80",
    rating: 4.6,
    review_count: 156,
    created_at: new Date().toISOString(),
  },
  {
    id: "pad-005",
    name: "Teen Comfort Pads — Slim",
    description:
      "Specially designed for teens with a slim, discreet profile. Soft cotton cover with gentle adhesive. Perfect for school and sports. Individually wrapped for easy carrying.",
    price: 149.0,
    category: "pads",
    image_url:
      "https://images.unsplash.com/photo-1618111415549-e49d0ec86591?w=1200&h=900&fit=crop&auto=format&q=85",
    thumbnail_url:
      "https://images.unsplash.com/photo-1618111415549-e49d0ec86591?w=600&h=450&fit=crop&auto=format&q=80",
    rating: 4.5,
    review_count: 102,
    created_at: new Date().toISOString(),
  },
  {
    id: "pad-006",
    name: "Panty Liners — Everyday Fresh",
    description:
      "Stay fresh every day with our breathable panty liners. Ultra-thin at just 1mm for invisible protection. Lightly scented with natural botanical extracts. Pack of 40.",
    price: 129.0,
    category: "pads",
    image_url:
      "https://images.unsplash.com/photo-1618111415604-afe870dbb72a?w=1200&h=900&fit=crop&auto=format&q=85",
    thumbnail_url:
      "https://images.unsplash.com/photo-1618111415604-afe870dbb72a?w=600&h=450&fit=crop&auto=format&q=80",
    rating: 4.4,
    review_count: 89,
    created_at: new Date().toISOString(),
  },

  // === DIAPERS ===
  {
    id: "diaper-001",
    name: "Baby Soft Diapers — Newborn (NB)",
    description:
      "Cloud-soft diapers for your newborn with umbilical cord cut-out. Hypoallergenic inner lining with wetness indicator. 12-hour absorption with leak guards. Size NB: up to 5kg.",
    price: 499.0,
    category: "diapers",
    image_url:
      "https://images.unsplash.com/photo-1544268211-ba72491bf350?w=1200&h=900&fit=crop&auto=format&q=85",
    thumbnail_url:
      "https://images.unsplash.com/photo-1544268211-ba72491bf350?w=600&h=450&fit=crop&auto=format&q=80",
    rating: 4.7,
    review_count: 412,
    created_at: new Date().toISOString(),
  },
  {
    id: "diaper-002",
    name: "Baby Soft Diapers — Medium (M)",
    description:
      "Premium comfort for active babies. Stretchy waistband for perfect fit and easy movement. Quick-dry top sheet keeps baby dry. Anti-rash formula with aloe vera. Size M: 6–11kg.",
    price: 599.0,
    category: "diapers",
    image_url:
      "https://images.unsplash.com/photo-1622290319146-7b63df48a635?w=1200&h=900&fit=crop&auto=format&q=85",
    thumbnail_url:
      "https://images.unsplash.com/photo-1622290319146-7b63df48a635?w=600&h=450&fit=crop&auto=format&q=80",
    rating: 4.8,
    review_count: 356,
    created_at: new Date().toISOString(),
  },
  {
    id: "diaper-003",
    name: "Baby Soft Diapers — Large (L)",
    description:
      "Extra absorption for toddlers on the move. 3D fit design adapts to your baby's body. Breathable outer cover prevents overheating. Fun animal prints that kids love. Size L: 9–14kg.",
    price: 649.0,
    category: "diapers",
    image_url:
      "https://images.unsplash.com/photo-1504151671506-6312eceb0f18?w=1200&h=900&fit=crop&auto=format&q=85",
    thumbnail_url:
      "https://images.unsplash.com/photo-1504151671506-6312eceb0f18?w=600&h=450&fit=crop&auto=format&q=80",
    rating: 4.6,
    review_count: 278,
    created_at: new Date().toISOString(),
  },
  {
    id: "diaper-004",
    name: "Pull-Up Training Pants — XL",
    description:
      "Easy pull-up design for toddlers learning to use the potty. Tear-away sides for quick changes. Super absorbent core with leak protection. Size XL: 12–17kg.",
    price: 699.0,
    category: "diapers",
    image_url:
      "https://images.unsplash.com/photo-1584839404042-8bc21d240e91?w=1200&h=900&fit=crop&auto=format&q=85",
    thumbnail_url:
      "https://images.unsplash.com/photo-1584839404042-8bc21d240e91?w=600&h=450&fit=crop&auto=format&q=80",
    rating: 4.5,
    review_count: 145,
    created_at: new Date().toISOString(),
  },

  // === MASKS ===
  {
    id: "mask-001",
    name: "Premium 3-Ply Surgical Masks — 50 Pack",
    description:
      "Medical-grade 3-ply surgical masks with BFE ≥ 98%. Soft elastic ear loops that won't irritate. Built-in nose wire for secure fit. Individually sealed for hygiene. Box of 50.",
    price: 349.0,
    category: "masks",
    image_url:
      "https://images.unsplash.com/photo-1584634731339-252c581abfc5?w=1200&h=900&fit=crop&auto=format&q=85",
    thumbnail_url:
      "https://images.unsplash.com/photo-1584634731339-252c581abfc5?w=600&h=450&fit=crop&auto=format&q=80",
    rating: 4.6,
    review_count: 523,
    created_at: new Date().toISOString(),
  },
  {
    id: "mask-002",
    name: "N95 Respirator Masks — 10 Pack",
    description:
      "NIOSH-approved N95 respirator masks with 95% filtration efficiency. Five-layer construction with activated carbon filter. Adjustable nose clip and head straps for secure seal. Pack of 10.",
    price: 599.0,
    category: "masks",
    image_url:
      "https://images.unsplash.com/photo-1585435557343-3b092031a831?w=1200&h=900&fit=crop&auto=format&q=85",
    thumbnail_url:
      "https://images.unsplash.com/photo-1585435557343-3b092031a831?w=600&h=450&fit=crop&auto=format&q=80",
    rating: 4.8,
    review_count: 234,
    created_at: new Date().toISOString(),
  },
  {
    id: "mask-003",
    name: "Kids Printed Masks — 30 Pack",
    description:
      "Fun printed masks designed for children aged 3–12. Three-layer protection with soft meltblown filter. Adjustable ear loops for comfortable fit. Cute cartoon designs kids love. Pack of 30.",
    price: 299.0,
    category: "masks",
    image_url:
      "https://images.unsplash.com/photo-1590086782957-93c06ef21604?w=1200&h=900&fit=crop&auto=format&q=85",
    thumbnail_url:
      "https://images.unsplash.com/photo-1590086782957-93c06ef21604?w=600&h=450&fit=crop&auto=format&q=80",
    rating: 4.4,
    review_count: 167,
    created_at: new Date().toISOString(),
  },
  {
    id: "mask-004",
    name: "Reusable Cotton Masks — 5 Pack",
    description:
      "Eco-friendly reusable masks made from organic cotton. Washable up to 50 times without losing filtration. Adjustable ear loops and nose wire. Comes in 5 neutral colors.",
    price: 399.0,
    category: "masks",
    image_url:
      "https://images.unsplash.com/photo-1586942593568-29361efae17b?w=1200&h=900&fit=crop&auto=format&q=85",
    thumbnail_url:
      "https://images.unsplash.com/photo-1586942593568-29361efae17b?w=600&h=450&fit=crop&auto=format&q=80",
    rating: 4.3,
    review_count: 98,
    created_at: new Date().toISOString(),
  },
];
