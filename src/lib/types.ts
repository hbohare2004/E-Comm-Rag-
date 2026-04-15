export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: "pads" | "diapers" | "masks";
  image_url: string;
  thumbnail_url: string;
  rating: number;
  review_count: number;
  created_at: string;
}

export interface Review {
  id: string;
  product_id: string;
  user_id: string;
  user_email?: string;
  rating: number;
  comment: string;
  created_at: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface UserProfile {
  id: string;
  email: string;
  role: "admin" | "user";
}
