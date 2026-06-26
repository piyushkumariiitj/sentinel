"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

export default function SuccessAnimation({ onComplete }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 4500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="flex flex-col items-center justify-center p-8 text-center relative w-full h-full min-h-[300px]">
      {/* Background glowing effects */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-emerald-500/15 dark:bg-emerald-500/10 rounded-full blur-[60px] pointer-events-none"
      />

      <div className="relative z-10 flex flex-col items-center">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.1
          }}
          className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/40 rounded-[28px] flex items-center justify-center mb-8 shadow-xl shadow-emerald-500/20 border border-emerald-200 dark:border-emerald-800/50 relative"
        >
          {/* Animated SVG Checkmark */}
          <svg className="w-10 h-10 text-emerald-600 dark:text-emerald-400" viewBox="0 0 50 50">
            <motion.path
              fill="transparent"
              strokeWidth="4"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M 14,26 L 22,34 L 38,16"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            />
          </svg>
          
          {/* Subtle pulse ring */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: [0, 1, 0], scale: [1, 1.5, 2] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: 1 }}
            className="absolute inset-0 rounded-[28px] border-2 border-emerald-400"
          />
        </motion.div>

        <motion.h3
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, type: "spring", damping: 15 }}
          className="text-3xl font-bold text-slate-900 dark:text-white mb-2 tracking-tight"
        >
          Welcome Back, John
        </motion.h3>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-base text-slate-500 dark:text-slate-400 mb-8"
        >
          Secure Session Established
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="inline-flex items-center px-4 py-2 rounded-full bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-600 dark:text-slate-300 shadow-sm"
        >
          <ShieldCheck className="w-4 h-4 text-emerald-500 mr-2" />
          Protected by Sentinel Security Platform
        </motion.div>
      </div>
    </div>
  );
}
