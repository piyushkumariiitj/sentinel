"use client";
import { useRouter } from "next/navigation";

export default function SentinelHero() {
  const router = useRouter();

  const handleExploreClick = () => {
    console.log("Explore Sentinel clicked");
  };

  const handleDemoClick = () => {
    router.push("/login");
  };

  return (
    <section className="relative w-full min-h-[540px] flex items-center">

      {/* The shield mark with a rotating dashed ring around it */}
      <div className="absolute right-[5%] top-1/2 -translate-y-1/2 pointer-events-none hidden md:block opacity-30 lg:opacity-100 z-0">
        <svg
          aria-hidden="true"
          className="w-[400px] h-[400px] drop-shadow-[0_0_40px_rgba(79,70,229,0.2)]"
          viewBox="0 0 400 400"
        >
          <defs>
            <linearGradient id="shieldGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#818cf8" />
              <stop offset="100%" stopColor="#4f46e5" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Glowing pulse ring */}
          <circle cx="200" cy="200" r="140" fill="none" stroke="#4f46e5" strokeWidth="2" style={{ transformOrigin: "200px 200px", animation: "sentinel-pulse 3s ease-in-out infinite alternate" }} />
          
          <circle cx="200" cy="200" r="140" fill="none" stroke="rgba(129, 140, 248, 0.2)" strokeWidth="1" />
          <circle cx="200" cy="200" r="100" fill="none" stroke="rgba(129, 140, 248, 0.4)" strokeWidth="1" />

          {/* This is the ring that spins slowly */}
          <circle
            cx="200"
            cy="200"
            r="100"
            fill="none"
            stroke="#818cf8"
            strokeWidth="2"
            strokeDasharray="10 30"
            opacity="0.8"
            style={{ transformOrigin: "200px 200px", animation: "sentinel-rotate 12s linear infinite" }}
          />

          {/* Shield outline */}
          <path
            d="M200 120 L244 135 L244 185 C244 215 224 240 200 255 C176 240 156 215 156 185 L156 135 Z"
            stroke="url(#shieldGradient)"
            strokeWidth="3"
            fill="rgba(248, 250, 252, 0.7)"
            className="dark:fill-slate-900/70"
            strokeLinejoin="round"
            strokeLinecap="round"
          />

          {/* Checkmark inside the shield */}
          <path
            d="M182 185 L196 199 L222 160"
            stroke="#818cf8"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#glow)"
          />
          <circle cx="200" cy="200" r="4" fill="#4f46e5" filter="url(#glow)" />
        </svg>
      </div>

      {/* Main text content */}
      <div className="relative z-10 px-8 py-20 md:px-16 lg:px-24 max-w-3xl">
        <div className="inline-flex items-center gap-3 px-4 py-2 bg-emerald-100/50 dark:bg-emerald-900/20 border border-emerald-200/50 dark:border-emerald-800/30 rounded-full mb-8 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_12px_#10b981]" />
          <span className="text-sm text-emerald-600 dark:text-emerald-400 font-semibold tracking-wider uppercase">All systems verified</span>
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-500 dark:from-white dark:to-slate-400 tracking-tight">
          Nothing gets through unverified.
        </h1>

        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed mb-10 max-w-2xl">
          Sentinel is the trust layer behind every login, every session, every request.
          Experience bank-grade security with a seamless user interface.
        </p>

        <div className="flex flex-wrap gap-4">
          <button 
            className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/30 transition-all hover:-translate-y-0.5" 
            onClick={handleExploreClick}
          >
            Explore Sentinel
          </button>
          <button 
            className="px-8 py-3.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-semibold rounded-xl border border-slate-200 dark:border-slate-700 transition-all hover:-translate-y-0.5" 
            onClick={handleDemoClick}
          >
            See it in action
          </button>
        </div>
      </div>

      <style>{`
        @keyframes sentinel-rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes sentinel-pulse {
          from { opacity: 0.1; transform: scale(0.95); }
          to { opacity: 0.3; transform: scale(1.05); }
        }
      `}</style>
    </section>
  );
}
