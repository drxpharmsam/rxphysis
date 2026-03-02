"use client";

import BottomNav from "./BottomNav";

interface AccountScreenProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onBack: () => void;
}

export default function AccountScreen({ activeTab, setActiveTab, onBack }: AccountScreenProps) {
  return (
    <div className="flex flex-col min-h-screen" style={{ background: "#eaf6f8" }}>

      {/* ── Header ──────────────────────────────────────── */}
      <div className="px-5 pt-14 pb-20 relative overflow-hidden"
           style={{ background: "linear-gradient(145deg, #011C40 0%, #023859 55%, #26658C 100%)" }}>
        <div className="absolute top-[-40px] right-[-40px] w-40 h-40 rounded-full opacity-20"
             style={{ background: "#54ACBF" }} />
        <div className="flex items-center gap-3 mb-2">
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-full flex items-center justify-center hover:opacity-80 transition"
            style={{ background: "rgba(167,235,242,0.2)" }}
            aria-label="Go back"
          >
            <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
              <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6z" />
            </svg>
          </button>
          <h1 className="text-white text-xl font-bold">Account</h1>
        </div>
      </div>

      {/* ── Profile card ────────────────────────────────── */}
      <div className="flex flex-col items-center -mt-14 px-5 mb-4 relative z-10">
        <div className="w-24 h-24 rounded-full border-4 border-white shadow-lg flex items-center justify-center overflow-hidden mb-3"
             style={{ background: "linear-gradient(135deg, #54ACBF, #023859)" }}>
          <svg viewBox="0 0 24 24" fill="white" className="w-14 h-14">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
        </div>
        <h2 className="text-xl font-bold" style={{ color: "#011C40" }}>John Doe</h2>
        <p className="text-sm mt-0.5 text-slate-500">john.doe@example.com</p>
        <button
          className="mt-3 text-sm font-semibold px-6 py-1.5 rounded-full border transition hover:opacity-80"
          style={{ color: "#023859", borderColor: "#54ACBF" }}
        >
          Edit Profile
        </button>
      </div>

      {/* ── Body ─────────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto px-5 pb-28">

        {/* Account Settings */}
        <SectionLabel text="Account Settings" />
        <MenuCard>
          <MenuItem
            iconBg="#A7EBF2" iconColor="#023859"
            icon={<svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" /></svg>}
            title="Update Email"
            subtitle="john.doe@example.com"
          />
          <MenuItem
            iconBg="rgba(84,172,191,0.2)" iconColor="#26658C"
            icon={<svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM12 17c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" /></svg>}
            title="Change Password"
            subtitle="Last changed 30 days ago"
          />
        </MenuCard>

        {/* Orders & Activity */}
        <SectionLabel text="Orders & Activity" />
        <MenuCard>
          <MenuItem
            iconBg="rgba(38,101,140,0.12)" iconColor="#26658C"
            icon={<svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14l-5-5 1.41-1.41L12 14.17l7.59-7.59L21 8l-9 9z" /></svg>}
            title="My Orders"
            subtitle="3 active orders"
          />
          <MenuItem
            iconBg="rgba(1,28,64,0.08)" iconColor="#011C40"
            icon={<svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z" /></svg>}
            title="Saved Medicines"
            subtitle="12 items saved"
          />
        </MenuCard>

        {/* Support */}
        <SectionLabel text="Support" />
        <MenuCard>
          <MenuItem
            iconBg="rgba(84,172,191,0.15)" iconColor="#26658C"
            icon={<svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z" /></svg>}
            title="Help & Support"
            subtitle="FAQs and contact"
          />
        </MenuCard>

        {/* Logout */}
        <div className="mb-6 mt-2">
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <button className="w-full flex items-center gap-4 px-5 py-4 hover:bg-red-50 transition group">
              <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center shrink-0">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-red-500">
                  <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
                </svg>
              </div>
              <span className="flex-1 text-left text-red-500 font-semibold text-sm">Log Out</span>
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-red-200 group-hover:text-red-400 transition">
                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
              </svg>
            </button>
          </div>
        </div>

        <p className="text-center text-slate-400 text-xs pb-2">RxPhysis v1.0.0</p>
      </div>

      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} onHomeClick={onBack} />
    </div>
  );
}

/* ── Small reusable sub-components ─────────────────── */

function SectionLabel({ text }: { text: string }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-wider mb-2 px-1 mt-5" style={{ color: "#54ACBF" }}>
      {text}
    </p>
  );
}

function MenuCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden divide-y divide-slate-100 mb-1">
      {children}
    </div>
  );
}

function MenuItem({
  icon, iconBg, iconColor, title, subtitle,
}: {
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  title: string;
  subtitle: string;
}) {
  return (
    <button className="w-full flex items-center gap-4 px-5 py-4 hover:bg-slate-50 transition group">
      <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
           style={{ background: iconBg, color: iconColor }}>
        {icon}
      </div>
      <div className="flex-1 text-left">
        <p className="font-semibold text-sm" style={{ color: "#011C40" }}>{title}</p>
        <p className="text-xs mt-0.5 text-slate-400">{subtitle}</p>
      </div>
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-slate-300 group-hover:text-slate-400 transition">
        <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
      </svg>
    </button>
  );
}
