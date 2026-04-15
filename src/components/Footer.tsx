"use client";

import Link from "next/link";
import { Heart, Mail, Phone, ExternalLink } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-plum-700/20 bg-gradient-to-br from-plum via-plum-600 to-plum-700">
      {/* Decorative glow */}
      <div className="absolute -right-40 -top-40 h-80 w-80 rounded-full bg-primary-500/10 blur-[100px]" />
      <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-accent-400/8 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-primary-400 text-white shadow-lg shadow-primary-500/20">
                <Heart className="h-5 w-5" strokeWidth={2.25} fill="currentColor" />
              </span>
              <span className="text-xl font-bold text-white">
                Pure<span className="text-primary-300">Care</span>
              </span>
            </Link>
            <p className="mt-5 text-sm leading-relaxed text-white/50">
              Premium feminine wellness products crafted with care.
              Safe, comfortable, and eco-friendly — because every woman deserves the best.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a href="#" className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-white/60 transition-all duration-300 hover:bg-primary-500 hover:text-white" aria-label="Social">
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/70">
              Shop
            </h3>
            <ul className="mt-5 space-y-3">
              {[
                { label: "Sanitary Pads", href: "/#pads" },
                { label: "Diapers", href: "/#diapers" },
                { label: "New Arrivals", href: "/#pads" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/40 transition-colors duration-300 hover:text-primary-300"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/70">
              Account
            </h3>
            <ul className="mt-5 space-y-3">
              {[
                { label: "Sign In", href: "/auth/login" },
                { label: "Cart", href: "/cart" },
                { label: "Create Account", href: "/auth/signup" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/40 transition-colors duration-300 hover:text-primary-300"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/70">
              Contact
            </h3>
            <ul className="mt-5 space-y-3">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary-400" />
                <span className="text-sm text-white/40">support@purecare.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary-400" />
                <span className="text-sm text-white/40">+91 98765 43210</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Gradient divider */}
        <div className="mt-14 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="mt-8 flex flex-col items-center gap-2 text-center">
          <p className="text-sm text-white/30">
            &copy; {new Date().getFullYear()} PureCare. All rights reserved.
          </p>
          <p className="flex items-center gap-1 text-xs text-white/20">
            Made with <Heart className="h-3 w-3 text-primary-400" fill="currentColor" /> for every woman
          </p>
        </div>
      </div>
    </footer>
  );
}
