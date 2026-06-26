import SentinelHero from "../components/SentinelHero";
import AuthenticationShowcase from "../components/auth-showcase";
import BackgroundEffects from "../components/ui/background-effects";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 overflow-hidden">
      <BackgroundEffects />
      <div className="relative z-10 flex flex-col w-full">
        <AuthenticationShowcase />
        {/* logincard */}    
        <SentinelHero />
      </div>
    </main>
  );
}
