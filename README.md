# Cottorin — Premium Hygiene E-Commerce

A modern full-stack e-commerce website built with **Next.js 14** (App Router), **Tailwind CSS**, **Supabase**, and **Stripe**. Focused on sanitary pads, diapers, and masks.

## Features

- **Homepage** — Hero section, trust badges, product grids by category, customer reviews
- **Product Details** — Full product page with image, ratings, reviews, Add to Cart / Buy Now
- **Authentication** — Sign up / Sign in with Supabase Auth, role-based access (admin/user)
- **Shopping Cart** — Add/remove items, quantity controls, persisted in localStorage
- **Stripe Checkout** — Secure payment via Stripe Checkout Sessions
- **Admin Panel** — Protected admin route for managing products and reviews
- **Loading Skeletons** — Smooth loading states with skeleton UI
- **Responsive Design** — Mobile-first, works on all screen sizes

## Tech Stack

| Layer       | Technology       |
| ----------- | ---------------- |
| Framework   | Next.js 14       |
| Styling     | Tailwind CSS     |
| Database    | Supabase         |
| Auth        | Supabase Auth    |
| Payments    | Stripe           |
| Icons       | Lucide React     |
| Language    | TypeScript       |

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

Copy the example file and fill in your keys:

```bash
cp .env.local.example .env.local
```

Required variables:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key

NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### 3. Set up Supabase database

Run the SQL in `supabase-schema.sql` in your Supabase SQL Editor. This creates:

- **profiles** — Extends auth users with email and role
- **products** — Product catalog with categories, images, ratings
- **reviews** — Customer reviews linked to products and users

Row Level Security (RLS) policies are included.

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

> **Note:** The app ships with sample product data. Without Supabase configured, it will display sample products automatically.

## Project Structure

```
src/
├── app/
│   ├── page.tsx                    # Homepage
│   ├── layout.tsx                  # Root layout with Navbar + Footer
│   ├── providers.tsx               # Client providers (Auth + Cart)
│   ├── loading.tsx                 # Homepage loading skeleton
│   ├── product/[id]/
│   │   ├── page.tsx                # Product details (server)
│   │   └── AddToCartButton.tsx     # Client add-to-cart widget
│   ├── auth/
│   │   ├── login/page.tsx          # Sign in page
│   │   └── signup/page.tsx         # Sign up page
│   ├── cart/page.tsx               # Shopping cart
│   ├── checkout/
│   │   ├── success/page.tsx        # Payment success
│   │   └── cancel/page.tsx         # Payment cancelled
│   ├── admin/
│   │   ├── layout.tsx              # Admin auth guard
│   │   └── page.tsx                # Product + review management
│   └── api/checkout/route.ts       # Stripe checkout API
├── components/
│   ├── Navbar.tsx                  # Sticky navigation
│   ├── Hero.tsx                    # Hero banner
│   ├── TrustSection.tsx            # Trust badges
│   ├── ProductCard.tsx             # Product card
│   ├── ProductGrid.tsx             # Product grid section
│   ├── ReviewSection.tsx           # Customer testimonials
│   ├── Footer.tsx                  # Site footer
│   └── Skeletons/                  # Loading skeleton components
├── context/
│   ├── AuthContext.tsx              # Auth state management
│   └── CartContext.tsx              # Cart state management
└── lib/
    ├── supabase.ts                 # Supabase client
    ├── supabase-server.ts          # Server-side Supabase client
    ├── stripe.ts                   # Stripe initialization
    ├── types.ts                    # TypeScript interfaces
    └── sample-data.ts              # Fallback sample products
```

## Making an Admin User

After signing up through the app, update the user's role in Supabase:

```sql
UPDATE profiles SET role = 'admin' WHERE email = 'your-email@example.com';
```

## Color Theme

| Role      | Colors                    |
| --------- | ------------------------- |
| Primary   | White + Light Blue (#3b82f6) |
| Secondary | Soft Purple (#a855f7)     |
| Text      | Slate tones               |

## License

MIT
