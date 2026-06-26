"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Send, CheckCircle2, ArrowRight } from "lucide-react";

export default function EmailAnimation({ onComplete }) {
  const [step, setStep] = useState("composing"); // "composing" | "sending" | "delivered"

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setStep("sending");
    }, 1500);

    const timer2 = setTimeout(() => {
      setStep("delivered");
    }, 3200);

    const timer3 = setTimeout(() => {
      onComplete();
    }, 4500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  return (
    <div className="w-full max-w-sm flex flex-col items-center justify-center p-6 relative h-64">
      
      {/* Background aesthetic */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-50 dark:opacity-20">
        <div className="w-64 h-64 rounded-full border border-dashed border-slate-300 dark:border-slate-700 animate-[spin_30s_linear_infinite]" />
        <div className="absolute w-48 h-48 rounded-full border border-dashed border-slate-300 dark:border-slate-700 animate-[spin_20s_linear_infinite_reverse]" />
      </div>

      <AnimatePresence mode="wait">
        {step !== "delivered" ? (
          <motion.div
            key="card"
            initial={{ y: 20, opacity: 0, scale: 0.95 }}
            animate={{ 
              y: step === "sending" ? -40 : 0, 
              opacity: step === "sending" ? 0 : 1, 
              scale: step === "sending" ? 0.8 : 1 
            }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="w-full bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 p-5 relative z-10"
          >
            <div className="flex items-center gap-3 mb-4 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                <Mail className="w-5 h-5 text-slate-500" />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium mb-0.5">New Login Detected</p>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">john.doe@acme.corp</p>
              </div>
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full" />
              <div className="w-5/6 h-2 bg-slate-100 dark:bg-slate-800 rounded-full" />
              <div className="w-4/6 h-2 bg-slate-100 dark:bg-slate-800 rounded-full" />
            </div>

            <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
              <span className="text-xs text-slate-400">Sentinel Mailer</span>
              <div className="flex items-center text-xs font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 px-2 py-1 rounded-md">
                <Send className="w-3 h-3 mr-1.5" />
                Preparing
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="delivered"
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", bounce: 0.4 }}
            className="w-full max-w-[280px] bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50 rounded-xl p-5 flex flex-col items-center text-center shadow-lg relative z-10"
          >
            <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center mb-3">
              <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h4 className="text-sm font-semibold text-emerald-900 dark:text-emerald-300 mb-1">
              Confirmation Sent
            </h4>
            <p className="text-xs text-emerald-700/70 dark:text-emerald-400/70">
              Alert delivered to john.doe@acme.corp
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Animated Paper Plane overlay when sending */}
      <AnimatePresence>
        {step === "sending" && (
          <motion.div
            initial={{ x: -100, y: 100, opacity: 0, scale: 0.5 }}
            animate={{ 
              x: [ -50, 50, 150 ],
              y: [ 50, -50, -150 ],
              opacity: [0, 1, 0],
              scale: [0.8, 1.2, 0.8]
            }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute z-20 pointer-events-none"
          >
            <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center shadow-xl shadow-indigo-500/30">
              <Send className="w-5 h-5 text-white ml-0.5 mt-0.5" />
            </div>
            
            {/* Trail */}
            <motion.div 
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: [0, 0.5, 0] }}
              transition={{ duration: 1.5 }}
              className="absolute top-1/2 right-full w-24 h-0.5 bg-gradient-to-l from-indigo-500 to-transparent origin-right"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
