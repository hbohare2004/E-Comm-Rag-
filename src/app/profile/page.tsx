"use client";

import {
  useState,
  useEffect,
  useCallback,
  useRef,
  type FormEvent,
} from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Save,
  Camera,
  Loader2,
  Check,
  ArrowLeft,
  Search,
  Home,
  Building2,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { createClient } from "@/utils/supabase/client";
import { AvatarPicker } from "@/components/AvatarPicker";
import { CARTOON_AVATARS, type CartoonAvatar } from "@/lib/avatars";

const GENDER_OPTIONS = [
  { value: "", label: "Select gender" },
  { value: "female", label: "Female" },
  { value: "male", label: "Male" },
  { value: "non-binary", label: "Non-binary" },
  { value: "prefer-not-to-say", label: "Prefer not to say" },
];

const INDIAN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry",
];

interface AddressData {
  street: string;
  pincode: string;
  city: string;
  state: string;
  type: "home" | "work";
}

export default function ProfilePage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);

  const [fullName, setFullName] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState<AddressData>({
    street: "",
    pincode: "",
    city: "",
    state: "",
    type: "home",
  });
  const [avatarId, setAvatarId] = useState("");
  const [avatarSvg, setAvatarSvg] = useState("");
  const [avatarImgUrl, setAvatarImgUrl] = useState("");
  const [stateDropdownOpen, setStateDropdownOpen] = useState(false);
  const [stateSearch, setStateSearch] = useState("");
  const stateRef = useRef<HTMLDivElement>(null);

  const loadProfile = useCallback(async () => {
    if (!user) return;
    try {
      const supabase = createClient();
      const { data } = await supabase
        .from("profiles")
        .select("full_name, gender, email, mobile, address, avatar_url")
        .eq("id", user.id)
        .single();
      
      const processAvatar = (url: string | null | undefined) => {
        if (!url) return false;
        setAvatarId(url);
        const match = CARTOON_AVATARS.find((a) => a.id === url);
        if (match) {
          setAvatarSvg(match.svg);
          setAvatarImgUrl("");
          return true;
        } else if (url.startsWith("http") || url.startsWith("data:")) {
          setAvatarImgUrl(url);
          setAvatarSvg("");
          return true;
        }
        return false;
      };

      if (data) {
        setFullName(data.full_name || user.user_metadata?.full_name || "");
        setGender(data.gender || "");
        setEmail(data.email || user.email || "");
        setMobile(data.mobile || "");
        if (data.address) {
          try {
            const parsed = JSON.parse(data.address) as Partial<AddressData>;
            setAddress({
              street: parsed.street || "",
              pincode: parsed.pincode || "",
              city: parsed.city || "",
              state: parsed.state || "",
              type: parsed.type === "work" ? "work" : "home",
            });
          } catch {
            setAddress((prev) => ({ ...prev, street: data.address }));
          }
        }
        
        const applied = processAvatar(data.avatar_url);
        if (!applied) processAvatar(user.user_metadata?.avatar_url);
      } else {
        setEmail(user.email || "");
        setFullName(user.user_metadata?.full_name || "");
        processAvatar(user.user_metadata?.avatar_url);
      }
    } catch {
      setEmail(user.email || "");
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/auth/login");
      return;
    }
    if (user) void loadProfile();
  }, [user, authLoading, router, loadProfile]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (stateRef.current && !stateRef.current.contains(e.target as Node)) {
        setStateDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredStates = INDIAN_STATES.filter((s) =>
    s.toLowerCase().includes(stateSearch.toLowerCase())
  );

  const updateAddress = (field: keyof AddressData, value: string) => {
    setAddress((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    try {
      const supabase = createClient();
      await supabase
        .from("profiles")
        .update({
          full_name: fullName,
          gender,
          mobile,
          address: JSON.stringify(address),
          avatar_url: avatarId,
        })
        .eq("id", user.id);

      localStorage.setItem(`avatar-${user.id}`, avatarId);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch {
      // silently handle
    } finally {
      setSaving(false);
    }
  };

  const handleAvatarSelect = (avatar: CartoonAvatar) => {
    setAvatarId(avatar.id);
    setAvatarSvg(avatar.svg);
    if (user) localStorage.setItem(`avatar-${user.id}`, avatar.id);
    setShowAvatarPicker(false);
  };

  if (authLoading || loading) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary-500" />
      </div>
    );
  }

  if (!user) return null;

  const inputClass =
    "w-full rounded-2xl border border-primary-100 bg-white px-4 py-3 text-plum outline-none transition duration-300 placeholder:text-plum-400/50 focus:border-primary-300 focus:ring-2 focus:ring-primary-500/15";

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-ivory via-white to-primary-50/30">
      <div className="mx-auto max-w-2xl px-4 py-8 sm:py-12">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-plum-400 transition-colors hover:text-primary-500"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="overflow-hidden rounded-3xl border border-primary-100/30 bg-white/90 shadow-premium backdrop-blur-sm"
        >
          <div className="relative overflow-hidden bg-gradient-to-r from-primary-500 via-primary-400 to-accent-400 px-6 py-8 sm:px-8">
            <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10" />
            <div className="absolute -bottom-4 -left-4 h-20 w-20 rounded-full bg-white/10" />

            <div className="relative flex items-center gap-5">
              <button
                type="button"
                onClick={() => setShowAvatarPicker(true)}
                className="group relative"
              >
                <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-white/20 ring-4 ring-white/30 transition-transform duration-200 group-hover:scale-105 sm:h-24 sm:w-24">
                  {avatarImgUrl ? (
                    <img src={avatarImgUrl} alt="Avatar" className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                  ) : avatarSvg ? (
                    <div
                      className="h-full w-full"
                      dangerouslySetInnerHTML={{ __html: avatarSvg }}
                    />
                  ) : (
                    <User className="h-10 w-10 text-white/80" />
                  )}
                </div>
                <div className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-white text-primary-500 shadow-lg transition-transform duration-200 group-hover:scale-110">
                  <Camera className="h-4 w-4" />
                </div>
              </button>

              <div>
                <h1 className="text-xl font-bold text-white sm:text-2xl">
                  {fullName || "Your Profile"}
                </h1>
                <p className="mt-0.5 text-sm text-white/80">{email}</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSave} className="space-y-5 p-6 sm:p-8">
            <div>
              <label
                htmlFor="fullName"
                className="mb-1.5 flex items-center gap-2 text-sm font-medium text-plum"
              >
                <User className="h-4 w-4 text-primary-400" />
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className={inputClass}
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label
                htmlFor="gender"
                className="mb-1.5 flex items-center gap-2 text-sm font-medium text-plum"
              >
                <User className="h-4 w-4 text-primary-400" />
                Gender
              </label>
              <select
                id="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className={inputClass}
              >
                {GENDER_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-1.5 flex items-center gap-2 text-sm font-medium text-plum"
              >
                <Mail className="h-4 w-4 text-primary-400" />
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                readOnly
                className={`${inputClass} cursor-not-allowed bg-primary-50/40 text-plum-400`}
              />
              <p className="mt-1 text-xs text-plum-400">
                Email is linked to your account and cannot be changed here.
              </p>
            </div>

            <div>
              <label
                htmlFor="mobile"
                className="mb-1.5 flex items-center gap-2 text-sm font-medium text-plum"
              >
                <Phone className="h-4 w-4 text-primary-400" />
                Mobile Number
              </label>
              <input
                id="mobile"
                type="tel"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className={inputClass}
                placeholder="+91 98765 43210"
              />
            </div>

            <div className="space-y-4 rounded-2xl border border-primary-100/40 bg-primary-50/20 p-4 sm:p-5">
              <div className="flex items-center gap-2 text-sm font-semibold text-plum">
                <MapPin className="h-4 w-4 text-primary-400" />
                Address
              </div>

              <div>
                <label
                  htmlFor="street"
                  className="mb-1.5 block text-sm font-medium text-plum"
                >
                  Address (Area and Street)
                </label>
                <textarea
                  id="street"
                  rows={2}
                  value={address.street}
                  onChange={(e) => updateAddress("street", e.target.value)}
                  className={`${inputClass} resize-none`}
                  placeholder="House no., Building, Street, Area"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="pincode"
                    className="mb-1.5 block text-sm font-medium text-plum"
                  >
                    Pincode
                  </label>
                  <input
                    id="pincode"
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    value={address.pincode}
                    onChange={(e) =>
                      updateAddress(
                        "pincode",
                        e.target.value.replace(/\D/g, "")
                      )
                    }
                    className={inputClass}
                    placeholder="e.g. 110001"
                  />
                </div>

                <div>
                  <label
                    htmlFor="city"
                    className="mb-1.5 block text-sm font-medium text-plum"
                  >
                    City / District / Town
                  </label>
                  <input
                    id="city"
                    type="text"
                    value={address.city}
                    onChange={(e) => updateAddress("city", e.target.value)}
                    className={inputClass}
                    placeholder="e.g. Mumbai"
                  />
                </div>
              </div>

              <div ref={stateRef} className="relative">
                <label
                  htmlFor="state-btn"
                  className="mb-1.5 block text-sm font-medium text-plum"
                >
                  State
                </label>
                <button
                  id="state-btn"
                  type="button"
                  onClick={() => {
                    setStateDropdownOpen((o) => !o);
                    setStateSearch("");
                  }}
                  className={`${inputClass} flex items-center justify-between text-left`}
                >
                  <span
                    className={
                      address.state ? "text-plum" : "text-plum-400/50"
                    }
                  >
                    {address.state || "Select state"}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 text-plum-400 transition-transform duration-200 ${stateDropdownOpen ? "rotate-180" : ""}`}
                  />
                </button>

                <AnimatePresence>
                  {stateDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.15 }}
                      className="absolute left-0 right-0 top-full z-30 mt-1 overflow-hidden rounded-2xl border border-primary-100/40 bg-white shadow-premium"
                    >
                      <div className="border-b border-primary-100/30 p-2">
                        <div className="relative">
                          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-plum-400/60" />
                          <input
                            type="text"
                            value={stateSearch}
                            onChange={(e) => setStateSearch(e.target.value)}
                            className="w-full rounded-xl border border-primary-100 bg-primary-50/30 py-2 pl-9 pr-3 text-sm text-plum outline-none placeholder:text-plum-400/50 focus:border-primary-300 focus:ring-1 focus:ring-primary-500/15"
                            placeholder="Search state..."
                            autoFocus
                          />
                        </div>
                      </div>
                      <div className="max-h-48 overflow-y-auto overscroll-contain p-1">
                        {filteredStates.length === 0 ? (
                          <p className="px-3 py-4 text-center text-sm text-plum-400">
                            No states found
                          </p>
                        ) : (
                          filteredStates.map((s) => (
                            <button
                              key={s}
                              type="button"
                              onClick={() => {
                                updateAddress("state", s);
                                setStateDropdownOpen(false);
                                setStateSearch("");
                              }}
                              className={`flex w-full items-center rounded-xl px-3 py-2 text-left text-sm transition-colors duration-150 ${
                                address.state === s
                                  ? "bg-primary-50 font-medium text-primary-600"
                                  : "text-plum hover:bg-primary-50/60"
                              }`}
                            >
                              {address.state === s && (
                                <Check className="mr-2 h-3.5 w-3.5 text-primary-500" />
                              )}
                              {s}
                            </button>
                          ))
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-plum">
                  Address Type
                </label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => updateAddress("type", "home")}
                    className={`inline-flex flex-1 items-center justify-center gap-2 rounded-xl border-2 px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
                      address.type === "home"
                        ? "border-primary-400 bg-primary-50 text-primary-600 shadow-sm"
                        : "border-primary-100 bg-white text-plum-400 hover:border-primary-200 hover:bg-primary-50/40"
                    }`}
                  >
                    <Home className="h-4 w-4" />
                    Home
                  </button>
                  <button
                    type="button"
                    onClick={() => updateAddress("type", "work")}
                    className={`inline-flex flex-1 items-center justify-center gap-2 rounded-xl border-2 px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
                      address.type === "work"
                        ? "border-primary-400 bg-primary-50 text-primary-600 shadow-sm"
                        : "border-primary-100 bg-white text-plum-400 hover:border-primary-200 hover:bg-primary-50/40"
                    }`}
                  >
                    <Building2 className="h-4 w-4" />
                    Work
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-primary-500 to-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary-500/25 transition-all duration-300 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : saved ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
                {saving ? "Saving..." : saved ? "Saved!" : "Save Changes"}
              </button>

              {saved && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-sm font-medium text-emerald-600"
                >
                  Profile updated successfully
                </motion.span>
              )}
            </div>
          </form>
        </motion.div>
      </div>

      {showAvatarPicker && (
        <AvatarPicker
          currentAvatarId={avatarId}
          onSelect={handleAvatarSelect}
          onClose={() => setShowAvatarPicker(false)}
        />
      )}
    </div>
  );
}
