"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Shield, ArrowRight } from "lucide-react";

export default function LoginPreview({ onComplete }) {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [step, setStep] = useState(0); // 0: type id, 1: type password, 2: wait/hover, 3: click

  const targetId = "john.doe@acme.corp";
  const targetPassword = "••••••••••••";

  useEffect(() => {
    let timeout;
    if (step === 0) {
      if (userId.length < targetId.length) {
        timeout = setTimeout(() => {
          setUserId(targetId.slice(0, userId.length + 1));
        }, 40 + Math.random() * 40);
      } else {
        timeout = setTimeout(() => setStep(1), 400);
      }
    } else if (step === 1) {
      if (password.length < targetPassword.length) {
        timeout = setTimeout(() => {
          setPassword(targetPassword.slice(0, password.length + 1));
        }, 40 + Math.random() * 40);
      } else {
        timeout = setTimeout(() => setStep(2), 500);
      }
    } else if (step === 2) {
      // Simulate hover on button before clicking
      timeout = setTimeout(() => setStep(3), 400);
    } else if (step === 3) {
      // Small delay after clicking before completing
      timeout = setTimeout(() => onComplete(), 500);
    }
    return () => clearTimeout(timeout);
  }, [userId, password, step, onComplete]);

  return (
    <div className="w-full max-w-[360px] bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200/60 dark:border-slate-800/60 p-8 relative">
      {/* Decorative top gradient */}
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-t-2xl opacity-80" />
      
      <div className="flex flex-col items-center mb-8 pt-2">
        <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center mb-4 border border-indigo-100 dark:border-indigo-800/50 shadow-sm">
          <Shield className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
        </div>
        <h3 className="text-xl font-semibold text-slate-900 dark:text-white tracking-tight">Sentinel Login</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Enterprise SSO Gateway</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5 ml-1">Work Email</label>
          <div className="relative">
            <div className={`absolute inset-0 rounded-lg border-2 pointer-events-none transition-colors duration-300 ${step === 0 ? "border-indigo-500/50" : "border-transparent"}`} />
            <input 
              readOnly 
              value={userId}
              className="w-full h-11 px-3 bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-lg text-sm text-slate-900 dark:text-white outline-none"
              placeholder=""
            />
            {step === 0 && userId.length < targetId.length && (
              <motion.span 
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                className="absolute w-0.5 h-4 bg-indigo-500 top-3.5"
                style={{ left: `${(userId.length * 7.5) + 14}px` }}
              />
            )}
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5 ml-1">Master Password</label>
          <div className="relative">
            <div className={`absolute inset-0 rounded-lg border-2 pointer-events-none transition-colors duration-300 ${step === 1 ? "border-indigo-500/50" : "border-transparent"}`} />
            <input 
              type="text"
              readOnly 
              value={password}
              className="w-full h-11 px-3 bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-lg text-sm text-slate-900 dark:text-white font-mono tracking-widest outline-none"
            />
            {step === 1 && password.length < targetPassword.length && (
              <motion.span 
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                className="absolute w-0.5 h-4 bg-indigo-500 top-3.5"
                style={{ left: `${(password.length * 8.5) + 14}px` }}
              />
            )}
          </div>
        </div>

        <div className="pt-2">
          <motion.button
            animate={
              step === 3 
                ? { scale: 0.96, backgroundColor: "#4338ca" } 
                : step === 2
                ? { backgroundColor: "#6366f1", scale: 1.01 }
                : { backgroundColor: "#4f46e5", scale: 1 }
            }
            className="w-full h-11 bg-indigo-600 text-white rounded-lg text-sm font-medium flex items-center justify-center space-x-2 shadow-md shadow-indigo-500/20 relative overflow-hidden"
          >
            {step === 3 && (
              <motion.div 
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: [0, 0.5, 0], scale: 2 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 bg-white rounded-lg"
              />
            )}
            <span className="relative z-10">Authenticate</span>
            <ArrowRight className="w-4 h-4 relative z-10" />
          </motion.button>
        </div>
      </div>
    </div>
  );
}
