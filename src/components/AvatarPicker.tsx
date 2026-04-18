"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check } from "lucide-react";
import { CARTOON_AVATARS, type CartoonAvatar } from "@/lib/avatars";

interface AvatarPickerProps {
  currentAvatarId: string;
  onSelect: (avatar: CartoonAvatar) => void;
  onClose: () => void;
}

export function AvatarPicker({
  currentAvatarId,
  onSelect,
  onClose,
}: AvatarPickerProps) {
  const [selected, setSelected] = useState(currentAvatarId);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-plum/40 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", duration: 0.4 }}
          className="mx-4 w-full max-w-md overflow-hidden rounded-3xl border border-primary-100/40 bg-white shadow-premium"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between border-b border-primary-100/30 px-6 py-4">
            <h3 className="text-lg font-bold text-plum">Choose Your Avatar</h3>
            <button
              type="button"
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-plum-400 transition-colors hover:bg-primary-50 hover:text-primary-500"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="grid grid-cols-4 gap-3 p-6">
            {CARTOON_AVATARS.map((avatar) => (
              <button
                key={avatar.id}
                type="button"
                onClick={() => setSelected(avatar.id)}
                className={`group relative flex flex-col items-center gap-1.5 rounded-2xl p-2 transition-all duration-200 ${
                  selected === avatar.id
                    ? "bg-primary-50 ring-2 ring-primary-400 shadow-glow"
                    : "hover:bg-primary-50/50"
                }`}
              >
                <div
                  className={`relative h-16 w-16 overflow-hidden rounded-full bg-gradient-to-br ${avatar.bg} p-0.5 transition-transform duration-200 group-hover:scale-105`}
                >
                  <div
                    className="h-full w-full rounded-full"
                    dangerouslySetInnerHTML={{ __html: avatar.svg }}
                  />
                  {selected === avatar.id && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary-500 ring-2 ring-white"
                    >
                      <Check className="h-3 w-3 text-white" strokeWidth={3} />
                    </motion.div>
                  )}
                </div>
                <span className="text-[10px] font-medium text-plum-400">
                  {avatar.label}
                </span>
              </button>
            ))}
          </div>

          <div className="flex gap-3 border-t border-primary-100/30 px-6 py-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl border border-primary-100 px-4 py-2.5 text-sm font-medium text-plum-400 transition-all hover:border-primary-300 hover:bg-primary-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                const avatar = CARTOON_AVATARS.find((a) => a.id === selected);
                if (avatar) onSelect(avatar);
              }}
              className="flex-1 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary-500/25 transition hover:shadow-xl"
            >
              Save Avatar
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
