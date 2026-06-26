"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LockKeyhole, Fingerprint, Server, CheckCircle2 } from "lucide-react";

export default function VerificationAnimation({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("verifying"); // "verifying" | "success"

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += Math.random() * 8 + 4;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setStatus("success");
        setTimeout(() => onComplete(), 1800);
      }
      setProgress(current);
    }, 150);

    return () => clearInterval(interval);
  }, [onComplete]);

  // Generate some random floating particles
  const particles = Array.from({ length: 12 }).map((_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    x: Math.random() * 200 - 100,
    y: Math.random() * 100 - 50,
    duration: Math.random() * 2 + 1,
    delay: Math.random() * 1
  }));

  return (
    <div className="w-full max-w-[400px] flex flex-col items-center p-6">
      
      {/* Main visualization area */}
      <div className="relative w-64 h-48 flex items-center justify-center mb-8">
        
        {/* Connecting lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
          <motion.path
            d="M 40,96 C 80,96 80,96 128,96 C 176,96 176,96 216,96"
            fill="none"
            stroke={status === "success" ? "#10b981" : "#6366f1"}
            strokeWidth="2"
            strokeDasharray="4 4"
            animate={{
              strokeDashoffset: [0, -24],
            }}
            transition={{
              repeat: Infinity,
              duration: 1,
              ease: "linear"
            }}
            className="transition-colors duration-500"
          />
        </svg>

        {/* Left Node: Client */}
        <div className="absolute left-0 z-10 flex flex-col items-center gap-2">
          <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center shadow-sm">
            <Fingerprint className="w-6 h-6 text-slate-500" />
          </div>
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Client</span>
        </div>

        {/* Center Node: Shield */}
        <div className="absolute left-1/2 -translate-x-1/2 z-20">
          <AnimatePresence mode="wait">
            {status === "verifying" ? (
              <motion.div
                key="verifying"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1.2, opacity: 0 }}
                className="w-16 h-16 rounded-2xl bg-indigo-600 shadow-xl shadow-indigo-500/30 flex items-center justify-center relative"
              >
                {/* Pulse ring */}
                <motion.div
                  animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="absolute inset-0 rounded-2xl border-2 border-indigo-400"
                />
                <LockKeyhole className="w-7 h-7 text-white" />
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", bounce: 0.5 }}
                className="w-16 h-16 rounded-2xl bg-emerald-500 shadow-xl shadow-emerald-500/30 flex items-center justify-center relative"
              >
                {/* Pulse ring */}
                <motion.div
                  initial={{ scale: 1, opacity: 0.5 }}
                  animate={{ scale: 1.6, opacity: 0 }}
                  transition={{ duration: 1 }}
                  className="absolute inset-0 rounded-2xl border-2 border-emerald-400"
                />
                <CheckCircle2 className="w-7 h-7 text-white" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Node: Server */}
        <div className="absolute right-0 z-10 flex flex-col items-center gap-2">
          <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center shadow-sm">
            <Server className="w-6 h-6 text-slate-500" />
          </div>
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Server</span>
        </div>

        {/* Encrypted Particles */}
        {status === "verifying" && (
          <div className="absolute inset-0 z-15 pointer-events-none">
            {particles.map((p) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, x: 0, y: 0 }}
                animate={{ 
                  opacity: [0, 1, 0], 
                  x: p.x, 
                  y: p.y,
                  scale: [0.5, 1, 0.5]
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: p.duration,
                  delay: p.delay,
                  ease: "easeInOut"
                }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-indigo-400 rounded-full"
                style={{ width: p.size, height: p.size }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Progress Bar & Text */}
      <div className="w-full max-w-[280px]">
        <div className="flex justify-between items-end mb-2">
          <motion.span 
            layout
            className="text-sm font-medium text-slate-900 dark:text-white"
          >
            {status === "verifying" ? "Authenticating User" : "Credentials Verified"}
          </motion.span>
          <span className="text-xs font-mono text-slate-500">{Math.round(progress)}%</span>
        </div>
        
        <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
          <motion.div 
            className={`h-full rounded-full ${status === "success" ? "bg-emerald-500" : "bg-indigo-600"}`}
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "linear", duration: 0.1 }}
          />
        </div>
        
        <p className="text-xs text-slate-400 dark:text-slate-500 mt-3 text-center">
          {status === "verifying" ? "Exchanging cryptographic keys over TLS 1.3" : "Secure session token generated"}
        </p>
      </div>

    </div>
  );
}
