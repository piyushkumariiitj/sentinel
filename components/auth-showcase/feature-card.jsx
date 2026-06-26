"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export default function FeatureCard({ title, description, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
      className="group relative flex items-start p-5 rounded-2xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-indigo-200 dark:hover:border-indigo-500/30 transition-all"
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500/0 via-indigo-500/0 to-indigo-500/5 dark:to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="mt-0.5 mr-4 shrink-0 text-indigo-500 dark:text-indigo-400 group-hover:scale-110 transition-transform">
        <CheckCircle2 className="w-5 h-5" />
      </div>
      
      <div className="relative z-10">
        <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-1">
          {title}
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
}
