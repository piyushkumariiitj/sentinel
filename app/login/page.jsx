"use client"

import { LoginForm } from "@/components/login-form"
import { HugeiconsIcon } from "@hugeicons/react"
import { LayoutBottomIcon } from "@hugeicons/core-free-icons"
import BackgroundEffects from "@/components/ui/background-effects"
import { useState } from "react";
import { Turnstile } from "@marsidev/react-turnstile";

export default function Login() {
  const [captcha, setCaptcha] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!captcha) {
      alert("Please complete captcha");
      return;
    }

    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({
        captcha,
      }),
    });

    const data = await res.json();

    console.log(data);
  };
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-white dark:bg-slate-950 p-6 overflow-hidden">
      <BackgroundEffects />

      <div className="relative z-10 w-full max-w-[550px] flex flex-col gap-6">
        <a href="/" className="flex items-center gap-2 self-center font-medium text-slate-900 dark:text-white no-underline text-lg">
          <div className="flex items-center justify-center w-6 h-6 rounded-md bg-gradient-to-br from-indigo-500 to-indigo-600 text-white shadow-sm">
            <HugeiconsIcon icon={LayoutBottomIcon} strokeWidth={2} style={{ width: '16px', height: '16px' }} />
          </div>
          Sentinel
        </a>
        
        <LoginForm />
      </div>
    </div>
  );
}
