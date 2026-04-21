"use client";

import { useCallback, useEffect, useState } from "react";
import { createClient, isSupabaseBrowserConfigured } from "@/utils/supabase/client";

const supabase = isSupabaseBrowserConfigured() ? createClient() : null;
import type { Product, Review } from "@/lib/types";
import {
  Plus,
  Pencil,
  Trash2,
  Package,
  MessageSquare,
  Loader2,
  X,
  Save,
  Star,
} from "lucide-react";

type Tab = "products" | "reviews";

export default function AdminPage() {
  const [tab, setTab] = useState<Tab>("products");

  return (
    <div className="min-h-screen bg-slate-50/50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-slate-900">Admin Panel</h1>
        <p className="mt-1 text-slate-500">
          Manage your products and reviews.
        </p>

        <div className="mt-6 flex gap-2 border-b border-slate-200">
          <button
            type="button"
            onClick={() => setTab("products")}
            className={`inline-flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition ${
              tab === "products"
                ? "border-primary-500 text-primary-600"
                : "border-transparent text-slate-500 hover:text-slate-700"
            }`}
          >
            <Package className="h-4 w-4" />
            Products
          </button>
          <button
            type="button"
            onClick={() => setTab("reviews")}
            className={`inline-flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition ${
              tab === "reviews"
                ? "border-primary-500 text-primary-600"
                : "border-transparent text-slate-500 hover:text-slate-700"
            }`}
          >
            <MessageSquare className="h-4 w-4" />
            Reviews
          </button>
        </div>

        <div className="mt-6">
          {tab === "products" ? <ProductsPanel /> : <ReviewsPanel />}
        </div>
      </div>
    </div>
  );
}

/* ===================== PRODUCT PANEL ===================== */

interface ProductFormData {
  name: string;
  description: string;
  price: string;
  category: "pads" | "diapers" | "masks";
  image_url: string;
  thumbnail_url: string;
}

const emptyForm: ProductFormData = {
  name: "",
  description: "",
  price: "",
  category: "pads",
  image_url: "",
  thumbnail_url: "",
};

function ProductsPanel() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<ProductFormData>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    if (!supabase) { setLoading(false); return; }
    setLoading(true);
    const { data, error: err } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });
    if (!err && data) setProducts(data as Product[]);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  function openCreateForm() {
    setEditingId(null);
    setForm(emptyForm);
    setShowForm(true);
    setError(null);
  }

  function openEditForm(product: Product) {
    setEditingId(product.id);
    setForm({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      category: product.category,
      image_url: product.image_url || "",
      thumbnail_url: product.thumbnail_url || "",
    });
    setShowForm(true);
    setError(null);
  }

  async function handleSave() {
    if (!form.name || !form.price) {
      setError("Name and price are required.");
      return;
    }

    const parsedPrice = parseFloat(form.price);
    if (!Number.isFinite(parsedPrice) || parsedPrice <= 0) {
      setError("Enter a valid price.");
      return;
    }

    setSaving(true);
    setError(null);

    const imageUrl = form.image_url.trim();
    const thumbnailUrl = form.thumbnail_url.trim() || imageUrl;

    const payload = {
      name: form.name,
      description: form.description,
      price: parsedPrice,
      category: form.category,
      image_url: imageUrl,
      thumbnail_url: thumbnailUrl,
    };

    if (!supabase) { setError("Supabase not configured"); setSaving(false); return; }

    let saveError: string | null = null;

    if (editingId) {
      const { error: err } = await supabase
        .from("products")
        .update(payload)
        .eq("id", editingId);
      if (err) saveError = err.message;
    } else {
      const { error: err } = await supabase.from("products").insert(payload);
      if (err) saveError = err.message;
    }

    setSaving(false);
    if (saveError) {
      setError(saveError);
      return;
    }

    setShowForm(false);
    await fetchProducts();
  }

  async function handleDelete(id: string) {
    if (!supabase) return;
    if (!confirm("Are you sure you want to delete this product?")) return;
    await supabase.from("products").delete().eq("id", id);
    fetchProducts();
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-primary-500" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-800">
          All Products ({products.length})
        </h2>
        <button
          type="button"
          onClick={openCreateForm}
          className="inline-flex items-center gap-2 rounded-xl bg-primary-500 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-primary-500/25 transition hover:bg-primary-600"
        >
          <Plus className="h-4 w-4" />
          Add Product
        </button>
      </div>

      {showForm && (
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-800">
              {editingId ? "Edit Product" : "New Product"}
            </h3>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {error && (
            <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
              {error}
            </div>
          )}

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Product Name *
              </label>
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-slate-900 outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
                placeholder="Ultra Comfort Sanitary Pads"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Description
              </label>
              <textarea
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                rows={3}
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-slate-900 outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
                placeholder="Product description..."
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Price (₹) *
              </label>
              <input
                type="number"
                step="0.01"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-slate-900 outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
                placeholder="199.00"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Category
              </label>
              <select
                value={form.category}
                onChange={(e) =>
                  setForm({
                    ...form,
                    category: e.target.value as ProductFormData["category"],
                  })
                }
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-slate-900 outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
              >
                <option value="pads">Pads</option>
                <option value="diapers">Diapers</option>
                <option value="masks">Masks</option>
              </select>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Image URL
              </label>
              <input
                value={form.image_url}
                onChange={(e) =>
                  setForm({ ...form, image_url: e.target.value })
                }
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-slate-900 outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
                placeholder="https://..."
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Thumbnail URL
              </label>
              <input
                value={form.thumbnail_url}
                onChange={(e) =>
                  setForm({ ...form, thumbnail_url: e.target.value })
                }
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-slate-900 outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
                placeholder="https://..."
              />
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-xl bg-primary-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-primary-500/25 transition hover:bg-primary-600 disabled:opacity-60"
            >
              <Save className="h-4 w-4" />
              {saving ? "Saving..." : editingId ? "Update" : "Create"}
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {products.length === 0 ? (
        <p className="mt-10 rounded-2xl border border-dashed border-slate-200 bg-white px-6 py-12 text-center text-slate-500">
          No products found. Connect Supabase and add your first product.
        </p>
      ) : (
        <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-slate-200 bg-slate-50">
                <tr>
                  <th className="px-4 py-3 font-medium text-slate-600">
                    Name
                  </th>
                  <th className="px-4 py-3 font-medium text-slate-600">
                    Category
                  </th>
                  <th className="px-4 py-3 font-medium text-slate-600">
                    Price
                  </th>
                  <th className="px-4 py-3 font-medium text-slate-600">
                    Rating
                  </th>
                  <th className="px-4 py-3 text-right font-medium text-slate-600">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {products.map((product) => (
                  <tr
                    key={product.id}
                    className="transition hover:bg-slate-50/50"
                  >
                    <td className="max-w-[200px] truncate px-4 py-3 font-medium text-slate-900">
                      {product.name}
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex rounded-lg bg-primary-100 px-2.5 py-0.5 text-xs font-medium capitalize text-primary-700">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-700">
                      ₹{product.price.toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-slate-700">
                      {product.rating?.toFixed(1) ?? "—"}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          type="button"
                          onClick={() => openEditForm(product)}
                          className="rounded-lg p-2 text-slate-400 transition hover:bg-primary-50 hover:text-primary-600"
                          title="Edit"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(product.id)}
                          className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

/* ===================== REVIEWS PANEL ===================== */

function ReviewsPanel() {
  const [reviews, setReviews] = useState<(Review & { product_name?: string })[]>(
    []
  );
  const [loading, setLoading] = useState(true);

  const fetchReviews = useCallback(async () => {
    if (!supabase) { setLoading(false); return; }
    setLoading(true);
    const { data, error } = await supabase
      .from("reviews")
      .select("*, products(name)")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setReviews(
        data.map((r: unknown) => {
          const row = r as Review & { products?: { name?: string } | null };
          return {
            ...row,
            product_name: row.products?.name ?? "Unknown Product",
          };
        })
      );
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  async function handleDeleteReview(id: string) {
    if (!supabase) return;
    if (!confirm("Delete this review?")) return;
    await supabase.from("reviews").delete().eq("id", id);
    fetchReviews();
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-primary-500" />
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <p className="mt-10 rounded-2xl border border-dashed border-slate-200 bg-white px-6 py-12 text-center text-slate-500">
        No reviews found. Reviews will appear here once customers leave them.
      </p>
    );
  }

  return (
    <div>
      <h2 className="text-lg font-semibold text-slate-800">
        All Reviews ({reviews.length})
      </h2>

      <div className="mt-6 space-y-4">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="flex items-start gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm"
          >
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < review.rating
                          ? "fill-amber-400 text-amber-400"
                          : "fill-slate-200 text-slate-200"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs text-slate-400">
                  on {review.product_name}
                </span>
              </div>
              <p className="mt-2 text-sm text-slate-600">{review.comment}</p>
              <p className="mt-2 text-xs text-slate-400">
                By {review.user_email ?? review.user_id} ·{" "}
                {new Date(review.created_at).toLocaleDateString()}
              </p>
            </div>
            <button
              type="button"
              onClick={() => handleDeleteReview(review.id)}
              className="shrink-0 rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600"
              title="Delete review"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
