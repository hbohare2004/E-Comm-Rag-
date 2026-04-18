"use client";

import { useState, useRef, useEffect } from "react";
// Removed unused Link import
import { motion, AnimatePresence } from "framer-motion";
import { User, Package, LogOut, ChevronDown } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { CARTOON_AVATARS } from "@/lib/avatars";

import { useRouter } from "next/navigation";

export function ProfileDropdown({ onAction }: { onAction?: () => void }) {
  const { user, userRole, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [avatarSvg, setAvatarSvg] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!user) return;
    const stored = localStorage.getItem(`avatar-${user.id}`);
    if (stored) {
      const match = CARTOON_AVATARS.find((a) => a.id === stored);
      if (match) setAvatarSvg(match.svg);
    }
  }, [user]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!user) return null;

  const handleAction = (fn?: () => void) => {
    setOpen(false);
    onAction?.();
    fn?.();
  };

  const handleNavigation = (path: string) => {
    setOpen(false);
    onAction?.();
    router.push(path);
  };

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex h-10 w-10 items-center justify-center rounded-xl text-plum-400 transition-all duration-300 hover:bg-primary-50 hover:text-primary-500"
        aria-label="Profile menu"
        aria-expanded={open}
      >
        {avatarSvg ? (
          <div
            className="h-7 w-7 overflow-hidden rounded-full"
            dangerouslySetInnerHTML={{ __html: avatarSvg }}
          />
        ) : (
          <User className="h-5 w-5" strokeWidth={2} />
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -4 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute right-0 top-full z-50 mt-2 w-64 overflow-hidden rounded-2xl border border-primary-100/40 bg-white/95 shadow-premium backdrop-blur-xl"
          >
            <div className="border-b border-primary-100/30 px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-primary-100 to-primary-200">
                  {avatarSvg ? (
                    <div
                      className="h-10 w-10"
                      dangerouslySetInnerHTML={{ __html: avatarSvg }}
                    />
                  ) : (
                    <User className="h-5 w-5 text-primary-500" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-plum">
                    {user.user_metadata?.full_name || user.email?.split("@")[0] || "User"}
                  </p>
                  <p className="truncate text-xs text-plum-400">
                    {user.email}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-1.5">
              {userRole === "admin" && (
                <button
                  type="button"
                  onClick={() => handleNavigation("/admin")}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-primary-600 transition-colors duration-200 hover:bg-primary-50"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-50">
                    <ChevronDown className="h-4 w-4 rotate-[-90deg] text-primary-500" />
                  </div>
                  Admin Panel
                </button>
              )}

              <button
                type="button"
                onClick={() => handleNavigation("/profile")}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-plum transition-colors duration-200 hover:bg-primary-50 hover:text-primary-600"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-50/60">
                  <User className="h-4 w-4 text-primary-400" />
                </div>
                My Profile
              </button>

              <button
                type="button"
                onClick={() => handleNavigation("/profile/orders")}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-plum transition-colors duration-200 hover:bg-primary-50 hover:text-primary-600"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-50/60">
                  <Package className="h-4 w-4 text-primary-400" />
                </div>
                My Orders
              </button>

              <div className="my-1 h-px bg-gradient-to-r from-transparent via-primary-200 to-transparent" />

              <button
                type="button"
                onClick={() =>
                  handleAction(() => {
                    void signOut();
                  })
                }
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-plum transition-colors duration-200 hover:bg-red-50 hover:text-red-600"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50/60">
                  <LogOut className="h-4 w-4 text-red-400" />
                </div>
                Logout
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
