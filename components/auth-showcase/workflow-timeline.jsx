"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import clsx from "clsx";

export default function WorkflowTimeline({ steps, currentIndex, onSelectStep }) {
  return (
    <div className="w-full overflow-x-auto pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      <div className="flex items-center min-w-max space-x-3 md:space-x-4 px-1 py-1">
        {steps.map((step, index) => {
          const isActive = index === currentIndex;
          const isPast = index < currentIndex;

          return (
            <div key={step.id} className="flex items-center">
              <button
                onClick={() => onSelectStep(index)}
                className={clsx(
                  "relative flex items-center justify-center h-10 px-4 md:px-5 rounded-full text-sm font-medium transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-indigo-500",
                  isActive
                    ? "text-white shadow-lg shadow-indigo-500/25"
                    : isPast
                    ? "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/40"
                    : "bg-slate-100 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
                )}
              >
                {/* Animated active background */}
                {isActive && (
                  <motion.div
                    layoutId="timeline-active-step"
                    className="absolute inset-0 rounded-full bg-indigo-600 dark:bg-indigo-500"
                    initial={false}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                
                <span className="relative z-10 whitespace-nowrap">{step.title}</span>
              </button>

              {/* Arrow connector */}
              {index < steps.length - 1 && (
                <div className="ml-3 md:ml-4 text-slate-300 dark:text-slate-700">
                  <ArrowRight className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
