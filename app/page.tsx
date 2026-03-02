"use client";

import { useState, useEffect, useCallback } from "react";
import SplashScreen from "./components/SplashScreen";
import LocationScreen from "./components/LocationScreen";
import HomeScreen from "./components/HomeScreen";
import AccountScreen from "./components/AccountScreen";

type Screen = "splash" | "location" | "home" | "account";
type Direction = "forward" | "back";

export default function App() {
  const [screen, setScreen] = useState<Screen>("splash");
  const [direction, setDirection] = useState<Direction>("forward");
  const [animKey, setAnimKey] = useState(0);
  const [activeTab, setActiveTab] = useState("home");

  // Seed the initial history entry so the first back-press is trackable
  useEffect(() => {
    history.replaceState({ screen: "splash" }, "", "#splash");

    const handlePopState = (e: PopStateEvent) => {
      const target = e.state?.screen as Screen | undefined;
      if (target) {
        setDirection("back");
        setScreen(target);
        setAnimKey((k) => k + 1);
      }
      // If no in-app state the browser will navigate away naturally (exit / prev page)
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  /** Push a new screen onto the browser history stack */
  const navigate = useCallback((target: Screen) => {
    setDirection("forward");
    history.pushState({ screen: target }, "", "#" + target);
    setScreen(target);
    setAnimKey((k) => k + 1);
  }, []);

  /** Trigger a browser-native back (fires popstate → handled above) */
  const goBack = useCallback(() => {
    history.back();
  }, []);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    // Only push a history entry when actually switching screens (not when
    // re-selecting the Home tab while already on the Home screen)
    if (tab === "home" && screen !== "home") navigate("home");
  };

  const animClass =
    direction === "forward" ? "screen-slide-forward" : "screen-slide-back";

  return (
    <div className="flex items-start justify-center min-h-screen bg-gradient-to-br from-slate-200 to-slate-300">
      {/* Phone-shell container — full screen on mobile, centered card on desktop */}
      <div className="relative w-full max-w-sm min-h-screen bg-white shadow-[0_0_60px_rgba(0,0,0,0.2)] overflow-hidden md:my-0">
        {/* key forces React to remount the div on every navigation, re-triggering the animation */}
        <div key={animKey} className={animClass}>
          {screen === "splash" && (
            <SplashScreen onContinue={() => navigate("location")} />
          )}
          {screen === "location" && (
            <LocationScreen
              onAllow={() => navigate("home")}
              onSkip={() => navigate("home")}
            />
          )}
          {screen === "home" && (
            <HomeScreen
              activeTab={activeTab}
              setActiveTab={handleTabChange}
              onProfileClick={() => navigate("account")}
            />
          )}
          {screen === "account" && (
            <AccountScreen
              activeTab={activeTab}
              setActiveTab={handleTabChange}
              onBack={goBack}
            />
          )}
        </div>
      </div>
    </div>
  );
}

