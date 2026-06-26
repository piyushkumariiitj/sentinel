"use client";

import { useState } from "react";
import { cn } from "@/lib/utils"
import { Turnstile } from "@marsidev/react-turnstile";

export function SignupForm({ className, ...props }) {
  const [captcha, setCaptcha] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!captcha) {
      alert("Please complete captcha");
      return;
    }

    const res = await fetch("/api/signup", {
      method: "POST",
      body: JSON.stringify({
        captcha,
        // user details would go here
      }),
    });

    const data = await res.json();

    console.log(data);
  };

  return (
    <div className={cn("w-full flex flex-col items-center", className)} {...props}>
      <div className="w-full bg-white dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200 dark:border-slate-800 shadow-xl shadow-indigo-500/5 rounded-2xl p-6 md:p-8 mb-6 relative overflow-hidden">
        {/* Decorative top gradient */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-t-2xl opacity-80" />
        
        <div className="text-center mb-8 pt-2">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-2">Create an account</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Enter your information below to create your account
          </p>
        </div>
        
        <div className="flex flex-col gap-6">
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <div className="flex flex-col sm:flex-row gap-5">
              <div className="flex flex-col gap-1.5 flex-1">
                <label htmlFor="name" className="text-sm font-medium text-slate-700 dark:text-slate-300 ml-1">Full Name</label>
                <input 
                  id="name" 
                  type="text" 
                  placeholder="John Doe" 
                  className="w-full h-11 px-3 bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-lg text-sm text-slate-900 dark:text-white outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-slate-400" 
                  required 
                />
              </div>
              <div className="flex flex-col gap-1.5 flex-1">
                <label htmlFor="email" className="text-sm font-medium text-slate-700 dark:text-slate-300 ml-1">Email</label>
                <input 
                  id="email" 
                  type="email" 
                  placeholder="m@example.com" 
                  className="w-full h-11 px-3 bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-lg text-sm text-slate-900 dark:text-white outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-slate-400" 
                  required 
                />
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-5">
              <div className="flex flex-col gap-1.5 flex-1">
                <label htmlFor="password" className="text-sm font-medium text-slate-700 dark:text-slate-300 ml-1">Password</label>
                <input 
                  id="password" 
                  type="password" 
                  className="w-full h-11 px-3 bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-lg text-sm text-slate-900 dark:text-white outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all" 
                  required 
                />
              </div>
              <div className="flex flex-col gap-1.5 flex-1">
                <label htmlFor="confirm-password" className="text-sm font-medium text-slate-700 dark:text-slate-300 ml-1">Confirm Password</label>
                <input 
                  id="confirm-password" 
                  type="password" 
                  className="w-full h-11 px-3 bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-lg text-sm text-slate-900 dark:text-white outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all" 
                  required 
                />
              </div>
            </div>

            <div className="mt-2 flex justify-center w-full overflow-hidden rounded-lg">
              <Turnstile
                siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
                onSuccess={(token) => setCaptcha(token)}
              />
            </div>

            <button type="submit" className="w-full h-11 mt-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-semibold shadow-md shadow-indigo-500/20 transition-all">
              Create Account
            </button>
            
            <button type="button" className="w-full flex items-center justify-center gap-2 h-11 px-4 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white rounded-lg font-medium transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5">
                <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" fill="currentColor" />
              </svg>
              Sign up with Google
            </button>

            <div className="text-center text-sm text-slate-500 dark:text-slate-400 mt-2">
              Already have an account? <a href="/login" className="font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 transition-colors">Sign in</a>
            </div>
          </form>
        </div>
      </div>
      
      <div className="text-center text-xs text-slate-500 dark:text-slate-400 max-w-sm">
        By clicking continue, you agree to our <a href="#" className="font-medium text-slate-700 dark:text-slate-300 hover:underline">Terms of Service</a>{" "}
        and <a href="#" className="font-medium text-slate-700 dark:text-slate-300 hover:underline">Privacy Policy</a>.
      </div>
    </div>
  );
}
