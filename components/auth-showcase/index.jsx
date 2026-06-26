"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BrowserWindow from "./browser-window";
import WorkflowTimeline from "./workflow-timeline";
import FeatureCard from "./feature-card";

// Animations
import LoginPreview from "./animations/login-preview";
import CaptchaAnimation from "./animations/captcha-animation";
import VerificationAnimation from "./animations/verification-animation";
import EmailAnimation from "./animations/email-animation";
import SuccessAnimation from "./animations/success-animation";

const steps = [
  { id: "login", title: "Login", component: LoginPreview },
  { id: "captcha", title: "Captcha", component: CaptchaAnimation },
  { id: "verification", title: "Verification", component: VerificationAnimation },
  { id: "email", title: "Email", component: EmailAnimation },
  { id: "success", title: "Access Granted", component: SuccessAnimation },
];

const features = [
  { title: "Captcha Verification", description: "Automated risk analysis and bot protection." },
  { title: "Credential Authentication", description: "Zero-knowledge proofs for password validation." },
  { title: "Secure Email Notification", description: "Instant alerts on new device logins." },
  { title: "Session Protection", description: "Hardware-backed token generation." },
  { title: "Multi-layer Security", description: "Defense in depth for enterprise needs." },
];

export default function AuthenticationShowcase() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Resume auto-play if no manual interaction for a while
  useEffect(() => {
    if (!isAutoPlaying) {
      const timer = setTimeout(() => setIsAutoPlaying(true), 10000);
      return () => clearTimeout(timer);
    }
  }, [isAutoPlaying]);

  const handleNextStep = () => {
    if (isAutoPlaying) {
      if (currentStepIndex < steps.length - 1) {
        setCurrentStepIndex((prev) => prev + 1);
      } else {
        // Reset after a delay on the success screen
        setTimeout(() => setCurrentStepIndex(0), 4000);
      }
    }
  };

  const setStep = (index) => {
    setIsAutoPlaying(false);
    setCurrentStepIndex(index);
  };

  const CurrentComponent = steps[currentStepIndex].component;

  return (
    <section className="relative w-full py-24">

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-8 items-center">
          
          {/* Left Column (40%) */}
          <div className="w-full lg:w-5/12 flex flex-col gap-10">
            <div>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-500 dark:from-white dark:to-slate-400"
              >
                Enterprise Authentication Workflow
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed"
              >
                Sentinel combines multi-layer authentication, captcha verification, encrypted credential validation, and instant email notifications to deliver a secure enterprise login experience.
              </motion.p>
            </div>

            <div className="flex flex-col gap-3">
              {features.map((feature, idx) => (
                <FeatureCard 
                  key={idx} 
                  title={feature.title} 
                  index={idx}
                />
              ))}
            </div>
          </div>

          {/* Right Column (60%) */}
          <div className="w-full lg:w-7/12 flex flex-col gap-8">
            <BrowserWindow>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStepIndex}
                  initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="w-full h-full flex flex-col items-center justify-center min-h-[400px] md:min-h-[500px]"
                >
                  <CurrentComponent onComplete={handleNextStep} />
                </motion.div>
              </AnimatePresence>
            </BrowserWindow>

            <WorkflowTimeline 
              steps={steps} 
              currentIndex={currentStepIndex} 
              onSelectStep={setStep} 
            />
          </div>

        </div>
      </div>
    </section>
  );
}
