"use client";

import { useState } from "react";
import SplashScreen from "./components/SplashScreen";
import LocationScreen from "./components/LocationScreen";
import HomeScreen from "./components/HomeScreen";
import AccountScreen from "./components/AccountScreen";

type Screen = "splash" | "location" | "home" | "account";

export default function App() {
  const [screen, setScreen] = useState<Screen>("splash");
  const [activeTab, setActiveTab] = useState("home");

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (tab === "home") setScreen("home");
  };

  return (
    <div className="flex items-start justify-center min-h-screen bg-gradient-to-br from-slate-200 to-slate-300">
      {/* Phone-shell container — full screen on mobile, centered card on desktop */}
      <div className="relative w-full max-w-sm min-h-screen bg-white shadow-[0_0_60px_rgba(0,0,0,0.2)] overflow-hidden md:my-0">
        {screen === "splash" && (
          <SplashScreen onContinue={() => setScreen("location")} />
        )}
        {screen === "location" && (
          <LocationScreen
            onAllow={() => setScreen("home")}
            onSkip={() => setScreen("home")}
          />
        )}
        {screen === "home" && (
          <HomeScreen
            activeTab={activeTab}
            setActiveTab={handleTabChange}
            onProfileClick={() => setScreen("account")}
          />
        )}
        {screen === "account" && (
          <AccountScreen
            activeTab={activeTab}
            setActiveTab={handleTabChange}
            onBack={() => setScreen("home")}
          />
        )}
      </div>
    </div>
  );
}

