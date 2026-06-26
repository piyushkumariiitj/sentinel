"use client";

import { motion } from "framer-motion";
import { Lock } from "lucide-react";

export default function BrowserWindow({ children }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative w-full rounded-2xl overflow-hidden border border-slate-200/50 dark:border-slate-800/50 shadow-2xl shadow-indigo-500/10 dark:shadow-indigo-500/5 bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl"
    >
      {/* Browser Chrome */}
      <div className="flex items-center px-4 h-12 border-b border-slate-200/50 dark:border-slate-800/50 bg-slate-50/50 dark:bg-slate-950/50">
        
        {/* macOS window controls */}
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-slate-300 dark:bg-slate-700 hover:bg-red-400 dark:hover:bg-red-500 transition-colors" />
          <div className="w-3 h-3 rounded-full bg-slate-300 dark:bg-slate-700 hover:bg-amber-400 dark:hover:bg-amber-500 transition-colors" />
          <div className="w-3 h-3 rounded-full bg-slate-300 dark:bg-slate-700 hover:bg-green-400 dark:hover:bg-green-500 transition-colors" />
        </div>

        {/* Address Bar */}
        <div className="flex-1 flex justify-center px-4">
          <div className="flex items-center space-x-2 px-3 h-7 rounded-md bg-white dark:bg-slate-900 shadow-sm border border-slate-200 dark:border-slate-800 max-w-[280px] w-full text-xs text-slate-500 dark:text-slate-400">
            <Lock className="w-3 h-3" />
            <span className="truncate">sentinel.io/auth</span>
          </div>
        </div>

        {/* Placeholder for right side to balance flex layout */}
        <div className="w-14"></div>
      </div>

      {/* Browser Body */}
      <div className="relative bg-slate-50/50 dark:bg-slate-950/50 overflow-hidden">
        {children}
      </div>
    </motion.div>
  );
}
