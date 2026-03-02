"use client";

import BottomNav from "./BottomNav";

interface HomeScreenProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onProfileClick: () => void;
}

const quickActions = [
  {
    id: "prescription",
    label: "Order via\nPrescription",
    bg: "#A7EBF2",
    iconBg: "rgba(2,56,89,0.12)",
    iconColor: "#023859",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
        <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
      </svg>
    ),
  },
  {
    id: "doctor",
    label: "Doctor\nConsult",
    bg: "rgba(84,172,191,0.2)",
    iconBg: "rgba(38,101,140,0.15)",
    iconColor: "#26658C",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
      </svg>
    ),
  },
  {
    id: "store",
    label: "Pharmacy\nStore",
    bg: "rgba(38,101,140,0.1)",
    iconBg: "rgba(1,28,64,0.12)",
    iconColor: "#011C40",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
        <path d="M20 4H4v2l8 5 8-5V4zm0 4.236l-8 5-8-5V20h16V8.236z" />
      </svg>
    ),
  },
];

const medicines = [
  { id: 1, name: "Paracetamol", brand: "Panadol",   price: "$2.50", unit: "20 tabs", bg: "#A7EBF2", pill: "#023859" },
  { id: 2, name: "Amoxicillin", brand: "Amoxil",    price: "$8.99", unit: "14 caps", bg: "rgba(84,172,191,0.25)", pill: "#26658C" },
  { id: 3, name: "Ibuprofen",   brand: "Advil",     price: "$5.99", unit: "30 tabs", bg: "rgba(38,101,140,0.15)", pill: "#54ACBF" },
  { id: 4, name: "Vitamin C",   brand: "Redoxon",   price: "$3.50", unit: "30 tabs", bg: "rgba(167,235,242,0.4)", pill: "#011C40" },
];

export default function HomeScreen({ activeTab, setActiveTab, onProfileClick }: HomeScreenProps) {
  return (
    <div className="flex flex-col min-h-screen" style={{ background: "#eaf6f8" }}>

      {/* ── Header ─────────────────────────────────────── */}
      <div className="px-5 pt-14 pb-16 relative overflow-hidden"
           style={{ background: "linear-gradient(145deg, #011C40 0%, #023859 55%, #26658C 100%)" }}>
        <div className="absolute top-[-40px] right-[-40px] w-40 h-40 rounded-full opacity-20"
             style={{ background: "#54ACBF" }} />
        <div className="absolute bottom-[-20px] left-[-20px] w-24 h-24 rounded-full opacity-15"
             style={{ background: "#A7EBF2" }} />

        <div className="relative flex items-center justify-between mb-1">
          <div>
            <p className="text-sm font-medium" style={{ color: "#A7EBF2" }}>Good Morning 🌤</p>
            <h2 className="text-white text-2xl font-bold mt-0.5">Hi, John! 👋</h2>
          </div>
          <div className="flex items-center gap-3">
            {/* Notification bell */}
            <button className="relative">
              <div className="w-9 h-9 rounded-full flex items-center justify-center"
                   style={{ background: "rgba(167,235,242,0.2)" }}>
                <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5 opacity-90">
                  <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
                </svg>
              </div>
              <span className="absolute top-0 right-0 w-2.5 h-2.5 rounded-full bg-red-500 border-2"
                    style={{ borderColor: "#023859" }} />
            </button>
            {/* Profile avatar */}
            <button
              onClick={onProfileClick}
              className="w-11 h-11 rounded-full border-2 overflow-hidden flex items-center justify-center shadow-md"
              style={{ borderColor: "#A7EBF2", background: "linear-gradient(135deg, #54ACBF, #023859)" }}
              aria-label="Profile"
            >
              <svg viewBox="0 0 24 24" fill="white" className="w-7 h-7">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </button>
          </div>
        </div>
        <p className="text-xs mt-1" style={{ color: "rgba(167,235,242,0.7)" }}>How are you feeling today?</p>
      </div>

      {/* ── Scrollable body ─────────────────────────────── */}
      <div className="flex-1 overflow-y-auto px-5 pb-28 -mt-8 relative">
        {/* Search bar */}
        <div className="flex items-center gap-3 bg-white rounded-2xl shadow-[0_4px_20px_rgba(1,28,64,0.12)] px-4 py-3.5 mb-6">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
               className="w-5 h-5 shrink-0" style={{ color: "#54ACBF" }}>
            <path strokeLinecap="round" strokeLinejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search for medicines, doctors..."
            className="flex-1 text-sm bg-transparent outline-none placeholder-slate-400"
            style={{ color: "#011C40" }}
          />
          <button
            className="text-white rounded-xl px-3 py-1.5 text-xs font-semibold shrink-0"
            style={{ background: "#023859" }}
          >
            Search
          </button>
        </div>

        {/* Quick Actions */}
        <div className="mb-6">
          <h3 className="font-bold text-base mb-3" style={{ color: "#011C40" }}>Quick Actions</h3>
          <div className="grid grid-cols-3 gap-3">
            {quickActions.map((action) => (
              <button
                key={action.id}
                className="rounded-2xl p-4 flex flex-col items-center gap-2.5 shadow-sm hover:shadow-md active:scale-95 transition-all duration-200"
                style={{ background: action.bg }}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-sm"
                     style={{ background: action.iconBg, color: action.iconColor }}>
                  {action.icon}
                </div>
                <span className="text-xs font-semibold text-center leading-tight whitespace-pre-line"
                      style={{ color: "#023859" }}>
                  {action.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Promo banner */}
        <div className="rounded-2xl p-4 mb-6 flex items-center justify-between shadow-md overflow-hidden relative"
             style={{ background: "linear-gradient(to right, #023859, #26658C)" }}>
          <div className="absolute right-0 top-0 w-24 h-24 rounded-full opacity-20 translate-x-8 -translate-y-4"
               style={{ background: "#A7EBF2" }} />
          <div>
            <p className="text-xs font-medium" style={{ color: "#A7EBF2" }}>Limited Offer</p>
            <p className="text-white font-bold text-base mt-0.5">20% OFF on</p>
            <p className="text-white font-bold text-base">First Order!</p>
            <button className="mt-2 bg-white text-xs font-bold py-1.5 px-4 rounded-full"
                    style={{ color: "#023859" }}>
              Order Now
            </button>
          </div>
          <div className="relative z-10 flex items-center justify-center w-20 h-20">
            <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-90">
              <g transform="rotate(-30 40 40)">
                <rect x="12" y="30" width="56" height="20" rx="10" fill="white" opacity="0.9" />
                <rect x="40" y="30" width="28" height="20" rx="10" fill="rgba(167,235,242,0.6)" />
                <line x1="40" y1="30" x2="40" y2="50" stroke="rgba(2,56,89,0.4)" strokeWidth="1.5" />
              </g>
            </svg>
          </div>
        </div>

        {/* Popular Medicines */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-base" style={{ color: "#011C40" }}>Popular Medicines</h3>
            <button className="text-sm font-semibold" style={{ color: "#023859" }}>See All →</button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {medicines.map((med) => (
              <div key={med.id}
                   className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
                {/* Medicine image placeholder */}
                <div className="h-28 flex items-center justify-center" style={{ background: med.bg }}>
                  <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-14 h-14">
                    <g transform="rotate(-45 30 30)">
                      <rect x="8" y="22" width="44" height="16" rx="8" fill={med.pill} opacity="0.85" />
                      <rect x="30" y="22" width="22" height="16" rx="8" fill={med.pill} opacity="0.4" />
                      <line x1="30" y1="22" x2="30" y2="38" stroke="white" strokeWidth="1.5" />
                    </g>
                  </svg>
                </div>
                <div className="p-3">
                  <p className="font-bold text-sm" style={{ color: "#011C40" }}>{med.name}</p>
                  <p className="text-xs mt-0.5 text-slate-400">{med.brand} · {med.unit}</p>
                  <div className="flex items-center justify-between mt-2.5">
                    <span className="font-extrabold text-sm" style={{ color: "#023859" }}>{med.price}</span>
                    <button
                      className="w-7 h-7 rounded-full text-white flex items-center justify-center text-lg leading-none font-bold hover:opacity-80 active:scale-95 transition-all"
                      style={{ background: "#023859" }}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Nav */}
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}
