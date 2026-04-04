"use client";
import { UserButton } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { Activity, MapPin, Zap, Wind, Droplets, Thermometer, AlertTriangle, Navigation, PanelLeft, PanelRight } from "lucide-react";
import { useUIStore } from "@/lib/store";
import { motion } from "framer-motion";

export default function TopBar() {
  const [time, setTime] = useState("");
  const { activeMode, setActiveMode, sidebarOpen, setSidebarOpen, rightPanelOpen, setRightPanelOpen } = useUIStore();

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("ru-KZ", { hour: "2-digit", minute: "2-digit" }));
    };
    const timer = setInterval(tick, 1000);
    tick();
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-[72px] flex items-center justify-between px-8 border-b border-[var(--border)] bg-[var(--bg)]/80 backdrop-blur-md z-[100] shrink-0">
      <div className="flex items-center gap-6">
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className={`p-2 rounded-xl transition-all ${sidebarOpen ? 'bg-[var(--accentdim)] text-[var(--accent)]' : 'text-[var(--text3)] hover:bg-[var(--bg2)]'}`}
        >
          <PanelLeft size={20} />
        </button>
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[var(--accent2)] to-[var(--accent)] flex items-center justify-center text-white shadow-lg shadow-cyan-500/20">
            <Zap size={20} fill="currentColor" />
          </div>
          <div>
            <div className="text-lg font-bold font-['Unbounded'] tracking-tight flex items-center gap-2">
              QalaPulse
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--accentdim)] text-[var(--accent)] border border-[var(--accent2)]/20 uppercase tracking-widest font-medium">Alpha</span>
            </div>
            <div className="text-[11px] text-[var(--text3)] flex items-center gap-1">
              <MapPin size={10} /> Almaty City Monitoring
            </div>
          </div>
        </div>
      </div>

      {/* Mode Switcher */}
      <div className="bg-[var(--bg2)] border border-[var(--border)] p-1 rounded-2xl flex items-center gap-1 relative overflow-hidden">
        <motion.div 
          className="absolute h-[calc(100%-8px)] rounded-xl bg-gradient-to-r from-[var(--accent)] to-[var(--accent2)] shadow-lg shadow-cyan-500/20"
          initial={false}
          animate={{
            x: activeMode === 'city-pulse' ? 0 : 138,
            width: activeMode === 'city-pulse' ? 134 : 130
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
        <button 
          onClick={() => setActiveMode('city-pulse')}
          className={`relative z-10 px-4 py-2 text-[12px] font-bold uppercase tracking-wider transition-colors duration-300 flex items-center gap-2 ${activeMode === 'city-pulse' ? 'text-white' : 'text-[var(--text3)]'}`}
        >
          <Activity size={14} /> City Pulse
        </button>
        <button 
          onClick={() => setActiveMode('eco-pulse')}
          className={`relative z-10 px-4 py-2 text-[12px] font-bold uppercase tracking-wider transition-colors duration-300 flex items-center gap-2 ${activeMode === 'eco-pulse' ? 'text-white' : 'text-[var(--text3)]'}`}
        >
          <Wind size={14} /> Eco Pulse
        </button>
      </div>
      
      {/* KPIs based on mode */}
      <div className="hidden lg:flex gap-3 min-w-[340px] justify-end">
        {activeMode === 'city-pulse' ? (
          <>
            <div className="flex items-center gap-3 px-5 py-2 rounded-2xl bg-[var(--bg2)] border border-[var(--border)]">
              <div className="w-2 h-2 rounded-full bg-[var(--accent)] pulse shadow-[0_0_8px_var(--accent)]" />
              <div className="flex flex-col">
                <span className="text-[10px] text-[var(--text3)] uppercase font-bold tracking-tighter">Live Traffic</span>
                <span className="text-[12px] font-semibold">6 / 10 Points</span>
              </div>
            </div>
            <div className="flex items-center gap-3 px-5 py-2 rounded-2xl bg-[var(--bg2)] border border-[var(--border)]">
              <div className="w-2 h-2 rounded-full bg-[var(--red)] pulse shadow-[0_0_8px_var(--red)]" />
              <div className="flex flex-col">
                <span className="text-[10px] text-[var(--text3)] uppercase font-bold tracking-tighter">Active Reports</span>
                <span className="text-[12px] font-semibold text-[var(--red)]">3 Incidents</span>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center gap-3 px-5 py-2 rounded-2xl bg-[var(--bg2)] border border-[var(--border)]">
              <div className="w-2 h-2 rounded-full bg-orange-400 pulse shadow-[0_0_8px_orange]" />
              <div className="flex flex-col">
                <span className="text-[10px] text-[var(--text3)] uppercase font-bold tracking-tighter">AQI Index</span>
                <span className="text-[12px] font-semibold">68 Moderate</span>
              </div>
            </div>
            <div className="flex items-center gap-3 px-5 py-2 rounded-2xl bg-[var(--bg2)] border border-[var(--border)]">
              <Thermometer size={14} className="text-[var(--accent)]" />
              <div className="flex flex-col">
                <span className="text-[10px] text-[var(--text3)] uppercase font-bold tracking-tighter">Temperature</span>
                <span className="text-[12px] font-semibold">+23°C</span>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="flex items-center gap-4">
        <div className="flex flex-col items-end">
          <div className="font-['Unbounded'] text-sm font-semibold text-[var(--text)] tracking-wider">{time}</div>
          <div className="text-[10px] text-[var(--accent)] font-medium uppercase tracking-widest">Live</div>
        </div>
        <div className="h-8 w-[1px] bg-[var(--border)]" />
        <button 
          onClick={() => setRightPanelOpen(!rightPanelOpen)}
          className={`p-2 rounded-xl transition-all ${rightPanelOpen ? 'bg-[var(--accentdim)] text-[var(--accent)]' : 'text-[var(--text3)] hover:bg-[var(--bg2)]'}`}
        >
          <PanelRight size={20} />
        </button>
        <UserButton 
          appearance={{
            elements: {
              userButtonAvatarBox: "w-9 h-9 border-2 border-[var(--accent)]/30"
            }
          }}
        />
      </div>
    </div>
  );
}
