"use client";

interface SplashScreenProps {
  onContinue: () => void;
}

export default function SplashScreen({ onContinue }: SplashScreenProps) {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden"
         style={{ background: "linear-gradient(145deg, #011C40 0%, #023859 55%, #26658C 100%)" }}>
      {/* Decorative blobs */}
      <div className="absolute top-[-80px] left-[-60px] w-56 h-56 rounded-full opacity-20 blur-3xl"
           style={{ background: "#54ACBF" }} />
      <div className="absolute bottom-[-60px] right-[-40px] w-72 h-72 rounded-full opacity-15 blur-3xl"
           style={{ background: "#A7EBF2" }} />

      {/* Brand name */}
      <p className="text-sm font-semibold tracking-[0.3em] uppercase mb-6"
         style={{ color: "#A7EBF2" }}>
        RxPhysis
      </p>

      {/* Medicine icon in white circle */}
      <div className="relative mb-8">
        <div className="w-36 h-36 rounded-full flex items-center justify-center shadow-[0_8px_40px_rgba(0,0,0,0.35)]"
             style={{ background: "rgba(167,235,242,0.2)" }}>
          <div className="w-28 h-28 rounded-full bg-white flex items-center justify-center">
            <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16">
              {/* Capsule pill — left half dark, right half medium */}
              <g transform="rotate(-45 40 40)">
                <rect x="10" y="28" width="60" height="24" rx="12" fill="#023859" />
                <rect x="40" y="28" width="30" height="24" rx="12" fill="#54ACBF" />
                <rect x="39" y="28" width="2"  height="24" fill="white" />
              </g>
              {/* Cross overlay */}
              <rect x="36" y="14" width="8" height="52" rx="4" fill="#011C40" opacity="0.12" />
              <rect x="14" y="36" width="52" height="8" rx="4" fill="#011C40" opacity="0.12" />
            </svg>
          </div>
        </div>
        {/* Glow ring */}
        <div className="absolute inset-0 rounded-full scale-110 border-4"
             style={{ borderColor: "rgba(167,235,242,0.35)" }} />
      </div>

      {/* WELCOME BACK heading */}
      <h1 className="text-white text-4xl font-extrabold tracking-[0.06em] uppercase text-center px-4">
        WELCOME BACK
      </h1>
      <p className="text-base mt-3 text-center px-8" style={{ color: "#A7EBF2" }}>
        Your trusted health &amp; pharmacy partner
      </p>

      {/* Get Started button */}
      <button
        onClick={onContinue}
        className="mt-14 bg-white font-bold text-base py-4 px-16 rounded-full shadow-[0_8px_24px_rgba(0,0,0,0.3)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.4)] active:scale-95 transition-all duration-200"
        style={{ color: "#023859" }}
      >
        Get Started
      </button>

      {/* Login link */}
      <p className="mt-6 text-sm" style={{ color: "rgba(167,235,242,0.7)" }}>
        Already have an account?{" "}
        <button
          onClick={onContinue}
          className="font-semibold underline underline-offset-2 text-white"
        >
          Log In
        </button>
      </p>
    </div>
  );
}
