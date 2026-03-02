"use client";

interface LocationScreenProps {
  onAllow: () => void;
  onSkip: () => void;
}

export default function LocationScreen({ onAllow, onSkip }: LocationScreenProps) {
  return (
    <div className="relative flex flex-col min-h-screen screen-enter">
      {/* Background — navy gradient simulating underlying app */}
      <div className="absolute inset-0"
           style={{ background: "linear-gradient(145deg, #011C40 0%, #023859 55%, #26658C 100%)" }} />
      {/* Dark semi-transparent overlay */}
      <div className="absolute inset-0 backdrop-blur-sm" style={{ background: "rgba(1,28,64,0.55)" }} />

      {/* Bottom-anchored card */}
      <div className="relative flex flex-col items-center justify-end min-h-screen pb-10 px-5">
        <div className="w-full bg-white rounded-3xl shadow-[0_-8px_40px_rgba(0,0,0,0.25)] px-6 pt-8 pb-8">

          {/* Location icon */}
          <div className="flex justify-center mb-5">
            <div className="w-20 h-20 rounded-full flex items-center justify-center shadow-inner"
                 style={{ background: "#A7EBF2" }}>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
                      fill="#023859" />
                <circle cx="12" cy="9" r="2.5" fill="white" />
              </svg>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-center text-2xl font-bold mb-3" style={{ color: "#011C40" }}>
            Enable Location Access
          </h2>
          <p className="text-center text-sm leading-relaxed mb-8 px-2 text-slate-500">
            Allow RxPhysis to access your location to find the{" "}
            <span className="font-semibold" style={{ color: "#023859" }}>nearest pharmacies</span>{" "}
            and provide faster delivery to your door.
          </p>

          {/* Feature highlights */}
          <div className="space-y-3 mb-8">
            {[
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" style={{ color: "#023859" }}>
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                ),
                text: "Find pharmacies near you",
              },
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" style={{ color: "#023859" }}>
                    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-8 2.75c1.24 0 2.25 1.01 2.25 2.25S13.24 11.25 12 11.25 9.75 10.24 9.75 9 10.76 6.75 12 6.75zM17 17H7v-.75c0-1.67 3.33-2.5 5-2.5s5 .83 5 2.5V17z" />
                  </svg>
                ),
                text: "Personalised health recommendations",
              },
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" style={{ color: "#023859" }}>
                    <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9 1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
                  </svg>
                ),
                text: "Accurate delivery estimates",
              },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 rounded-xl px-4 py-3"
                   style={{ background: "#A7EBF2" }}>
                {item.icon}
                <span className="text-sm font-medium" style={{ color: "#023859" }}>{item.text}</span>
              </div>
            ))}
          </div>

          {/* Allow button */}
          <button
            onClick={onAllow}
            className="w-full text-white font-bold py-4 rounded-2xl shadow-[0_6px_20px_rgba(2,56,89,0.4)] hover:shadow-[0_8px_28px_rgba(2,56,89,0.5)] active:scale-[0.98] transition-all duration-200 text-base mb-3"
            style={{ background: "linear-gradient(to right, #023859, #26658C)" }}
          >
            Allow Location Access
          </button>

          {/* Skip button */}
          <button
            onClick={onSkip}
            className="w-full font-semibold py-3 rounded-2xl border transition-all duration-200 text-sm active:scale-[0.98] hover:opacity-80"
            style={{ color: "#26658C", borderColor: "#54ACBF" }}
          >
            Maybe Later
          </button>
        </div>
      </div>
    </div>
  );
}
