"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Loader2, ShieldAlert } from "lucide-react";

export default function CaptchaAnimation({ onComplete }) {
  const [status, setStatus] = useState("checking"); // "checking" | "success"

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setStatus("success");
    }, 2500);

    const timer2 = setTimeout(() => {
      onComplete();
    }, 4000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onComplete]);

  return (
    <div className="w-full max-w-sm flex flex-col items-center justify-center p-6">
      <motion.div 
        layout
        className="w-full bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200/60 dark:border-slate-800/60 p-8 flex flex-col items-center justify-center relative overflow-hidden"
      >
        {/* Background pulse effect when checking */}
        {status === "checking" && (
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute inset-0 bg-indigo-500/10 dark:bg-indigo-500/5 rounded-2xl blur-xl"
          />
        )}
        
        {/* Background success glow */}
        {status === "success" && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-emerald-500/10 dark:bg-emerald-500/5 rounded-2xl blur-xl"
          />
        )}

        <div className="relative z-10 w-20 h-20 mb-6 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {status === "checking" ? (
              <motion.div
                key="checking"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="relative w-full h-full flex items-center justify-center bg-indigo-50 dark:bg-indigo-900/30 rounded-full border border-indigo-100 dark:border-indigo-800/50">
                  <ShieldAlert className="w-8 h-8 text-indigo-500 dark:text-indigo-400 absolute" />
                  {/* Rotating border */}
                  <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <motion.circle 
                      cx="50" cy="50" r="48" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="3"
                      strokeDasharray="301.59"
                      initial={{ strokeDashoffset: 301.59 }}
                      animate={{ strokeDashoffset: 0 }}
                      transition={{ duration: 2.5, ease: "linear" }}
                      className="text-indigo-500"
                    />
                  </svg>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="w-full h-full bg-emerald-100 dark:bg-emerald-900/40 rounded-full flex items-center justify-center border border-emerald-200 dark:border-emerald-800/50">
                  <Check className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />
                </div>
                
                {/* Success rings */}
                <motion.div 
                  initial={{ scale: 0.8, opacity: 1 }}
                  animate={{ scale: 1.5, opacity: 0 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="absolute inset-0 border-2 border-emerald-400 rounded-full"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.h4 layout className="text-xl font-semibold text-slate-900 dark:text-white relative z-10 text-center">
          <AnimatePresence mode="wait">
            <motion.span
              key={status}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="block"
            >
              {status === "checking" ? "Verifying Human" : "Captcha Verified"}
            </motion.span>
          </AnimatePresence>
        </motion.h4>
        
        <motion.p layout className="text-sm text-slate-500 dark:text-slate-400 mt-2 text-center relative z-10">
          <AnimatePresence mode="wait">
            <motion.span
              key={status}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="block"
            >
              {status === "checking" ? "Running behavioral risk analysis..." : "Security constraints satisfied."}
            </motion.span>
          </AnimatePresence>
        </motion.p>
      </motion.div>
    </div>
  );
}
