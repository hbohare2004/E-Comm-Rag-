"use client";

import { useState, useRef, useEffect } from "react";
// Removed unused Link import
import { motion, AnimatePresence } from "framer-motion";
import { User, Package, LogOut, ChevronDown } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { CARTOON_AVATARS } from "@/lib/avatars";

import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export function ProfileDropdown({ onAction }: { onAction?: () => void }) {
  const { user, userRole, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [avatarSvg, setAvatarSvg] = useState<string | null>(null);
  const [avatarImgUrl, setAvatarImgUrl] = useState<string | null>(null);
  const [avatarImgError, setAvatarImgError] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!user) return;
    setAvatarImgError(false);

    function applyAvatar(avatarId: string | null | undefined): boolean {
      if (!avatarId) return false;
      const match = CARTOON_AVATARS.find((a) => a.id === avatarId);
      if (match) {
        setAvatarSvg(match.svg);
        setAvatarImgUrl(null);
        return true;
      } else if (avatarId.startsWith("http") || avatarId.startsWith("data:")) {
        setAvatarImgUrl(avatarId);
        setAvatarSvg(null);
        return true;
      }
      return false;
    }
    
    // Fast path: load from localStorage
    const stored = localStorage.getItem(`avatar-${user.id}`);
    let applied = applyAvatar(stored);

    // Fallback to user_metadata (like Google sign in) if missing
    if (!applied && user.user_metadata?.avatar_url) {
      applyAvatar(user.user_metadata.avatar_url);
    }

    // Async path: verify or fetch from DB
    async function fetchAvatar() {
      if (!user) return;
      const supabase = createClient();
      const { data } = await supabase
        .from("profiles")
        .select("avatar_url")
        .eq("id", user.id)
        .maybeSingle();

      if (data?.avatar_url) {
        localStorage.setItem(`avatar-${user.id}`, data.avatar_url);
        applyAvatar(data.avatar_url);
      } else if (user.user_metadata?.avatar_url) {
        // If profile doesn't have an avatar yet but metadata does, save it locally (so it's fast next time)
        localStorage.setItem(`avatar-${user.id}`, user.user_metadata.avatar_url);
      }
    }
    
    void fetchAvatar();
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
        className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-primary-200/80 bg-white/90 shadow-sm ring-1 ring-primary-100/60 transition-all duration-300 hover:border-primary-300 hover:bg-white hover:shadow-md hover:ring-primary-200/80"
        aria-label="Profile menu"
        aria-expanded={open}
      >
        {avatarImgUrl && !avatarImgError ? (
          <img
            src={avatarImgUrl}
            alt=""
            className="h-7 w-7 rounded-full object-cover"
            onError={() => setAvatarImgError(true)}
          />
        ) : avatarSvg ? (
          <div
            className="h-7 w-7 overflow-hidden rounded-full ring-1 ring-primary-200/50"
            dangerouslySetInnerHTML={{ __html: avatarSvg }}
          />
        ) : (
          <User className="h-5 w-5 text-primary-600" strokeWidth={2} aria-hidden />
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
                  {avatarImgUrl ? (
                    <img src={avatarImgUrl} alt="Avatar" className="h-full w-full object-cover" />
                  ) : avatarSvg ? (
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
