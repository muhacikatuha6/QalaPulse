"use client";
import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, Calendar, Clock, Users, Ticket, Share2, Star } from "lucide-react";

export default function FloatingDetailCard({ event, onClose }: { event: any | null, onClose: () => void }) {
  if (!event) return null;

  return (
    <motion.div
      initial={{ x: -20, opacity: 0, scale: 0.95 }}
      animate={{ x: 0, opacity: 1, scale: 1 }}
      exit={{ x: -20, opacity: 0, scale: 0.95 }}
      className="absolute left-[320px] top-6 bottom-6 w-[340px] z-[9999] pointer-events-auto"
    >
      <div className="h-full bg-[var(--bg2)]/80 backdrop-blur-2xl border border-[var(--border2)] rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden">
        {/* Header Image/Glow */}
        <div className={`h-32 w-full relative overflow-hidden bg-gradient-to-br
          ${event.type === 'music' ? 'from-purple-600/20 to-purple-900/40' :
            event.type === 'sport' ? 'from-emerald-600/20 to-emerald-900/40' :
            event.type === 'food' ? 'from-amber-600/20 to-amber-900/40' :
            'from-blue-600/20 to-blue-900/40'}
        `}>
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white transition-all backdrop-blur-md"
          >
            <X size={16} />
          </button>
          <div className="absolute bottom-4 left-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-md">
              <Star size={10} fill="currentColor" /> Featured {event.type}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar space-y-6">
          <div className="space-y-2">
            <h2 className="text-xl font-bold font-['Unbounded'] leading-tight text-white">{event.name}</h2>
            <div className="flex items-center gap-2 text-[12px] text-[var(--text3)]">
              <MapPin size={14} className="text-[var(--accent)]" /> {event.address}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3.5 rounded-2xl bg-[var(--bg3)] border border-[var(--border)]">
              <div className="flex items-center gap-2 mb-1">
                <Calendar size={12} className="text-[var(--text3)]" />
                <span className="text-[9px] font-bold text-[var(--text3)] uppercase">Date</span>
              </div>
              <div className="text-xs font-bold">{event.date}</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-[var(--bg3)] border border-[var(--border)]">
              <div className="flex items-center gap-2 mb-1">
                <Ticket size={12} className="text-[var(--accent)]" />
                <span className="text-[9px] font-bold text-[var(--text3)] uppercase">Price</span>
              </div>
              <div className="text-xs font-bold text-[var(--accent)]">{event.price}</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[var(--bg3)] border border-[var(--border)] space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-bold text-[var(--text3)] uppercase tracking-widest">Live Capacity</span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${event.crowdLevel > 70 ? 'bg-red-500/10 text-red-400' : 'bg-green-500/10 text-green-400'}`}>
                {event.crowdLevel > 70 ? 'High' : 'Optimal'}
              </span>
            </div>
            <div className="space-y-2">
              <div className="h-1.5 w-full bg-[var(--bg)] rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${event.crowdLevel}%` }}
                  className="h-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent2)]"
                />
              </div>
              <div className="flex justify-between text-[10px] font-bold text-[var(--text3)]">
                <div className="flex items-center gap-1"><Users size={12} /> {event.attending} visitors</div>
                <div className="flex items-center gap-1"><Clock size={12} /> {event.time}</div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-[10px] font-bold text-[var(--text3)] uppercase tracking-widest">Intelligence Report</span>
            <p className="text-[12px] leading-relaxed text-[var(--text2)] italic">
              "{event.description}"
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 bg-[var(--bg3)]/50 border-t border-[var(--border)] flex gap-3">
          <button className="flex-1 py-3.5 bg-[var(--accent)] text-black rounded-2xl font-['Unbounded'] text-[11px] font-bold uppercase tracking-wider hover:bg-[#00ff9d] transition-all transform active:scale-95 shadow-lg shadow-cyan-500/20">
            Get Tickets
          </button>
          <button className="p-3.5 bg-[var(--bg)] border border-[var(--border)] text-[var(--text3)] hover:text-white rounded-2xl transition-all">
            <Share2 size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
