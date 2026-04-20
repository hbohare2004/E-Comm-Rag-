"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  ShoppingCart,
  Menu,
  X,
  User,
  Sparkles,
  Package,
  LogOut,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { ProfileDropdown } from "./ProfileDropdown";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Pads", href: "/#pads" },
  { label: "Diapers", href: "/#diapers" },
  { label: "About", href: "/#why-choose" },
] as const;

export function Navbar() {
  const router = useRouter();
  const { totalItems } = useCart();
  const { user, loading, signOut } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const closeMobile = () => setMobileOpen(false);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-brand-teal/10 bg-brand-offwhite/90 shadow-md shadow-brand-teal/5 backdrop-blur-xl"
          : "border-b border-transparent bg-brand-offwhite/70 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 flex-1 items-center gap-10">
          <Link
            href="/"
            className="group flex shrink-0 items-center gap-2.5 transition-opacity duration-200 hover:opacity-90"
            onClick={closeMobile}
          >
            {/* <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-teal to-brand-teal/85 text-brand-offwhite shadow-lg shadow-brand-teal/20 transition-transform duration-300 group-hover:scale-105">
              <Heart className="h-5 w-5" strokeWidth={2.25} fill="currentColor" aria-hidden />
            </span> */}
            <span className="font-display text-xl font-bold tracking-tight text-brand-teal">
              Cottorin
            </span>
          </Link>

          <nav
            className="hidden md:flex md:items-center md:gap-0.5"
            aria-label="Main"
          >
            {navLinks.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="group relative rounded-xl px-4 py-2.5 text-sm font-medium text-brand-teal/65 transition-colors duration-300 hover:text-brand-teal"
              >
                {label}
                <span className="absolute bottom-1 left-1/2 h-0.5 w-0 -translate-x-1/2 rounded-full bg-gradient-to-r from-brand-rose to-brand-lavender transition-all duration-300 group-hover:w-2/3" />
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {!loading && user ? (
            <ProfileDropdown />
          ) : !loading ? (
            <>
              <Link
                href="/auth/login"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-brand-teal/70 transition-colors duration-200 hover:bg-white/80 hover:text-brand-teal sm:hidden"
                aria-label="Sign in"
              >
                <User className="h-5 w-5" strokeWidth={2} />
              </Link>
              <Link
                href="/auth/login"
                className="hidden items-center gap-1.5 rounded-xl border border-brand-teal/10 bg-white/80 px-4 py-2.5 text-sm font-semibold text-brand-teal shadow-sm transition-all duration-200 hover:border-brand-blush/30 hover:bg-white sm:inline-flex"
              >
                <User className="h-4 w-4" aria-hidden />
                Sign In
              </Link>
            </>
          ) : (
            <div
              className="hidden h-9 w-10 animate-pulse-soft rounded-xl bg-brand-lavender/20 sm:block"
              aria-hidden
            />
          )}

          <Link
            href="/cart"
            className="relative flex h-10 w-10 items-center justify-center rounded-xl text-brand-teal/70 transition-all duration-300 hover:bg-white/80 hover:text-brand-teal"
            aria-label={`Shopping cart${totalItems > 0 ? `, ${totalItems} items` : ""}`}
          >
            <ShoppingCart className="h-5 w-5" strokeWidth={2} />
            <AnimatePresence>
              {totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-gradient-to-r from-brand-rose to-brand-rose/90 px-1 text-[10px] font-bold text-white shadow-sm ring-2 ring-brand-offwhite"
                >
                  {totalItems > 99 ? "99+" : totalItems}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-brand-teal transition-colors duration-200 hover:bg-white/80 hover:text-brand-rose md:hidden"
            onClick={() => setMobileOpen((o) => !o)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? (
              <X className="h-6 w-6" strokeWidth={2} />
            ) : (
              <Menu className="h-6 w-6" strokeWidth={2} />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden border-t border-brand-teal/10 bg-brand-offwhite/98 backdrop-blur-xl md:hidden"
          >
            <nav
              className="flex flex-col gap-1 px-4 py-4"
              aria-label="Mobile"
            >
              {navLinks.map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={closeMobile}
                  className="rounded-2xl px-4 py-3 text-base font-medium text-brand-teal transition-colors duration-200 hover:bg-white/90 hover:text-brand-rose"
                >
                  {label}
                </Link>
              ))}
              <div className="my-2 h-px bg-gradient-to-r from-transparent via-brand-blush/40 to-transparent" />
              {!loading && user ? (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      closeMobile();
                      router.push("/profile");
                    }}
                    className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-base font-medium text-brand-teal transition-colors duration-200 hover:bg-white/90 hover:text-brand-rose"
                  >
                    <User className="h-5 w-5 text-brand-rose" />
                    My Profile
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      closeMobile();
                      router.push("/profile/orders");
                    }}
                    className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-base font-medium text-brand-teal transition-colors duration-200 hover:bg-white/90 hover:text-brand-rose"
                  >
                    <Package className="h-5 w-5 text-brand-rose" />
                    My Orders
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      closeMobile();
                      void signOut();
                    }}
                    className="flex items-center gap-3 rounded-2xl px-4 py-3 text-left text-base font-medium text-brand-teal transition-colors duration-200 hover:bg-brand-rose/10 hover:text-brand-rose"
                  >
                    <LogOut className="h-5 w-5 text-brand-rose/80" />
                    Logout
                  </button>
                </>
              ) : !loading ? (
                <Link
                  href="/auth/login"
                  onClick={closeMobile}
                  className="inline-flex items-center gap-2 rounded-2xl px-4 py-3 text-base font-semibold text-brand-teal transition-colors duration-200 hover:bg-white/90"
                >
                  <Sparkles className="h-5 w-5 text-brand-lavender" />
                  Sign In
                </Link>
              ) : null}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
