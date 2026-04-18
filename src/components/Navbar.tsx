"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  Heart,
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
      className={`sticky top-0 z-50 transition-all duration-500 ease-out ${
        scrolled
          ? "border-b border-primary-100/40 bg-white/70 shadow-lg shadow-primary-500/5 backdrop-blur-2xl"
          : "border-b border-transparent bg-ivory/60 shadow-none backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 flex-1 items-center gap-10">
          <Link
            href="/"
            className="group flex shrink-0 items-center gap-2.5 transition-opacity duration-200 hover:opacity-90"
            onClick={closeMobile}
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-primary-400 text-white shadow-lg shadow-primary-500/25 transition-transform duration-300 group-hover:scale-105">
              <Heart className="h-5 w-5" strokeWidth={2.25} fill="currentColor" aria-hidden />
            </span>
            <span className="text-xl font-bold tracking-tight text-plum">
              Pure<span className="gradient-text">Care</span>
            </span>
          </Link>

          <nav
            className="hidden md:flex md:items-center md:gap-1"
            aria-label="Main"
          >
            {navLinks.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="group relative rounded-xl px-4 py-2.5 text-sm font-medium text-plum-400 transition-colors duration-300 hover:text-primary-500"
              >
                {label}
                <span className="absolute bottom-1 left-1/2 h-0.5 w-0 -translate-x-1/2 rounded-full bg-gradient-to-r from-primary-500 to-primary-300 transition-all duration-300 group-hover:w-2/3" />
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
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-plum-400 transition-colors duration-200 hover:bg-primary-50 hover:text-primary-500 sm:hidden"
                aria-label="Sign in"
              >
                <User className="h-5 w-5" strokeWidth={2} />
              </Link>
              <Link
                href="/auth/login"
                className="hidden items-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-semibold text-primary-500 transition-all duration-200 hover:bg-primary-50 sm:inline-flex"
              >
                <User className="h-4 w-4" aria-hidden />
                Sign In
              </Link>
            </>
          ) : (
            <div
              className="hidden h-9 w-10 animate-pulse-soft rounded-xl bg-primary-50 sm:block"
              aria-hidden
            />
          )}

          <Link
            href="/cart"
            className="relative flex h-10 w-10 items-center justify-center rounded-xl text-plum-400 transition-all duration-300 hover:bg-primary-50 hover:text-primary-500"
            aria-label={`Shopping cart${totalItems > 0 ? `, ${totalItems} items` : ""}`}
          >
            <ShoppingCart className="h-5 w-5" strokeWidth={2} />
            <AnimatePresence>
              {totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-gradient-to-r from-primary-500 to-primary-400 px-1 text-[10px] font-bold text-white shadow-sm shadow-primary-500/30 ring-2 ring-white"
                >
                  {totalItems > 99 ? "99+" : totalItems}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-plum transition-colors duration-200 hover:bg-primary-50 hover:text-primary-500 md:hidden"
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
            className="overflow-hidden border-t border-primary-100/30 bg-white/95 backdrop-blur-2xl md:hidden"
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
                  className="rounded-2xl px-4 py-3 text-base font-medium text-plum transition-colors duration-200 hover:bg-primary-50 hover:text-primary-500"
                >
                  {label}
                </Link>
              ))}
              <div className="my-2 h-px bg-gradient-to-r from-transparent via-primary-200 to-transparent" />
              {!loading && user ? (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      closeMobile();
                      router.push("/profile");
                    }}
                    className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-base font-medium text-plum transition-colors duration-200 hover:bg-primary-50 hover:text-primary-500"
                  >
                    <User className="h-5 w-5 text-primary-500" />
                    My Profile
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      closeMobile();
                      router.push("/profile/orders");
                    }}
                    className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-base font-medium text-plum transition-colors duration-200 hover:bg-primary-50 hover:text-primary-500"
                  >
                    <Package className="h-5 w-5 text-primary-500" />
                    My Orders
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      closeMobile();
                      void signOut();
                    }}
                    className="flex items-center gap-3 rounded-2xl px-4 py-3 text-left text-base font-medium text-plum transition-colors duration-200 hover:bg-red-50 hover:text-red-600"
                  >
                    <LogOut className="h-5 w-5 text-red-400" />
                    Logout
                  </button>
                </>
              ) : !loading ? (
                <Link
                  href="/auth/login"
                  onClick={closeMobile}
                  className="inline-flex items-center gap-2 rounded-2xl px-4 py-3 text-base font-semibold text-primary-500 transition-colors duration-200 hover:bg-primary-50"
                >
                  <Sparkles className="h-5 w-5" />
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
