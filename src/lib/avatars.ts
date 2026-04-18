export interface CartoonAvatar {
  id: string;
  label: string;
  svg: string;
  bg: string;
}

export const CARTOON_AVATARS: CartoonAvatar[] = [
  {
    id: "girl-pink",
    label: "Pink Girl",
    bg: "from-primary-100 to-primary-200",
    svg: `<svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="60" cy="60" r="56" fill="#FFD9E4"/><circle cx="60" cy="52" r="28" fill="#FFECD2"/><ellipse cx="60" cy="90" rx="32" ry="18" fill="#C2185B"/><circle cx="49" cy="48" r="3" fill="#3E1A24"/><circle cx="71" cy="48" r="3" fill="#3E1A24"/><path d="M54 58c3 3 9 3 12 0" stroke="#3E1A24" stroke-width="2" stroke-linecap="round"/><path d="M32 40c0-20 14-32 28-32s28 12 28 32c0 0-8-16-28-16S32 40 32 40z" fill="#880E4F"/><circle cx="36" cy="52" r="5" fill="#FFECD2"/><circle cx="84" cy="52" r="5" fill="#FFECD2"/></svg>`,
  },
  {
    id: "girl-purple",
    label: "Purple Girl",
    bg: "from-purple-100 to-purple-200",
    svg: `<svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="60" cy="60" r="56" fill="#E8DEF8"/><circle cx="60" cy="52" r="28" fill="#FFECD2"/><ellipse cx="60" cy="90" rx="32" ry="18" fill="#7C3AED"/><circle cx="49" cy="48" r="3" fill="#3E1A24"/><circle cx="71" cy="48" r="3" fill="#3E1A24"/><path d="M54 58c3 3 9 3 12 0" stroke="#3E1A24" stroke-width="2" stroke-linecap="round"/><path d="M30 38c2-22 16-30 30-30s28 8 30 30c-4-12-14-18-30-18S34 26 30 38z" fill="#5B21B6"/><path d="M34 38c0 0-6 4-6 12" stroke="#5B21B6" stroke-width="4" stroke-linecap="round"/><path d="M86 38c0 0 6 4 6 12" stroke="#5B21B6" stroke-width="4" stroke-linecap="round"/></svg>`,
  },
  {
    id: "boy-blue",
    label: "Blue Boy",
    bg: "from-blue-100 to-blue-200",
    svg: `<svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="60" cy="60" r="56" fill="#DBEAFE"/><circle cx="60" cy="52" r="28" fill="#FFECD2"/><ellipse cx="60" cy="90" rx="32" ry="18" fill="#2563EB"/><circle cx="49" cy="48" r="3" fill="#3E1A24"/><circle cx="71" cy="48" r="3" fill="#3E1A24"/><path d="M52 58c4 4 12 4 16 0" stroke="#3E1A24" stroke-width="2" stroke-linecap="round"/><path d="M32 36c4-22 14-28 28-28s24 6 28 28c-2-14-12-20-28-20S34 22 32 36z" fill="#1E40AF"/><circle cx="36" cy="52" r="5" fill="#FFECD2"/><circle cx="84" cy="52" r="5" fill="#FFECD2"/></svg>`,
  },
  {
    id: "girl-green",
    label: "Green Girl",
    bg: "from-emerald-100 to-emerald-200",
    svg: `<svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="60" cy="60" r="56" fill="#D1FAE5"/><circle cx="60" cy="52" r="28" fill="#FFECD2"/><ellipse cx="60" cy="90" rx="32" ry="18" fill="#059669"/><circle cx="49" cy="48" r="3" fill="#3E1A24"/><circle cx="71" cy="48" r="3" fill="#3E1A24"/><path d="M54 58c3 3 9 3 12 0" stroke="#3E1A24" stroke-width="2" stroke-linecap="round"/><path d="M28 42c4-24 16-34 32-34s28 10 32 34c-6-18-16-24-32-24S34 24 28 42z" fill="#065F46"/><path d="M40 32l-10 16" stroke="#065F46" stroke-width="3" stroke-linecap="round"/><path d="M80 32l10 16" stroke="#065F46" stroke-width="3" stroke-linecap="round"/></svg>`,
  },
  {
    id: "girl-orange",
    label: "Orange Girl",
    bg: "from-orange-100 to-orange-200",
    svg: `<svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="60" cy="60" r="56" fill="#FFEDD5"/><circle cx="60" cy="52" r="28" fill="#FFECD2"/><ellipse cx="60" cy="90" rx="32" ry="18" fill="#EA580C"/><circle cx="49" cy="48" r="3" fill="#3E1A24"/><circle cx="71" cy="48" r="3" fill="#3E1A24"/><path d="M54 58c3 3 9 3 12 0" stroke="#3E1A24" stroke-width="2" stroke-linecap="round"/><path d="M30 40c2-22 15-32 30-32s28 10 30 32c-4-16-14-22-30-22S34 24 30 40z" fill="#C2410C"/><circle cx="36" cy="52" r="5" fill="#FFECD2"/><circle cx="84" cy="52" r="5" fill="#FFECD2"/><circle cx="44" cy="56" r="4" fill="#FFCBA4" opacity="0.6"/><circle cx="76" cy="56" r="4" fill="#FFCBA4" opacity="0.6"/></svg>`,
  },
  {
    id: "boy-teal",
    label: "Teal Boy",
    bg: "from-teal-100 to-teal-200",
    svg: `<svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="60" cy="60" r="56" fill="#CCFBF1"/><circle cx="60" cy="52" r="28" fill="#FFECD2"/><ellipse cx="60" cy="90" rx="32" ry="18" fill="#0D9488"/><circle cx="49" cy="48" r="3" fill="#3E1A24"/><circle cx="71" cy="48" r="3" fill="#3E1A24"/><path d="M52 58c4 4 12 4 16 0" stroke="#3E1A24" stroke-width="2" stroke-linecap="round"/><rect x="32" y="18" width="56" height="24" rx="12" fill="#115E59"/><circle cx="36" cy="52" r="5" fill="#FFECD2"/><circle cx="84" cy="52" r="5" fill="#FFECD2"/></svg>`,
  },
  {
    id: "girl-rose",
    label: "Rose Girl",
    bg: "from-rose-100 to-rose-200",
    svg: `<svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="60" cy="60" r="56" fill="#FFE4E6"/><circle cx="60" cy="52" r="28" fill="#FFECD2"/><ellipse cx="60" cy="90" rx="32" ry="18" fill="#E11D48"/><circle cx="49" cy="48" r="3" fill="#3E1A24"/><circle cx="71" cy="48" r="3" fill="#3E1A24"/><path d="M54 58c3 3 9 3 12 0" stroke="#3E1A24" stroke-width="2" stroke-linecap="round"/><path d="M28 44c4-26 16-36 32-36s28 10 32 36" fill="#9F1239"/><path d="M42 10c-4 8 0 18 8 20M78 10c4 8 0 18-8 20" stroke="#9F1239" stroke-width="3" stroke-linecap="round"/><circle cx="36" cy="52" r="5" fill="#FFECD2"/><circle cx="84" cy="52" r="5" fill="#FFECD2"/></svg>`,
  },
  {
    id: "boy-amber",
    label: "Amber Boy",
    bg: "from-amber-100 to-amber-200",
    svg: `<svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="60" cy="60" r="56" fill="#FEF3C7"/><circle cx="60" cy="52" r="28" fill="#FFECD2"/><ellipse cx="60" cy="90" rx="32" ry="18" fill="#D97706"/><circle cx="49" cy="48" r="3" fill="#3E1A24"/><circle cx="71" cy="48" r="3" fill="#3E1A24"/><path d="M52 58c4 4 12 4 16 0" stroke="#3E1A24" stroke-width="2" stroke-linecap="round"/><path d="M34 34c4-18 12-26 26-26s22 8 26 26c-4-12-12-18-26-18S38 22 34 34z" fill="#92400E"/><circle cx="36" cy="52" r="5" fill="#FFECD2"/><circle cx="84" cy="52" r="5" fill="#FFECD2"/><rect x="44" y="4" width="32" height="6" rx="3" fill="#92400E"/></svg>`,
  },
];
