"use client";
import { useState } from "react";
import { Search, Filter, Music, Trophy, Soup, Palette, Cpu, Clock, Users } from "lucide-react";

export default function Sidebar({ events, onSelect }: { events: any[], onSelect: (id: string) => void }) {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = events.filter(e => {
    const matchType = filter === "all" || e.type === filter;
    const matchSearch = e.name.toLowerCase().includes(search.toLowerCase()) || 
                      e.place.toLowerCase().includes(search.toLowerCase());
    return matchType && matchSearch;
  });

  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'music': return <Music size={12} />;
      case 'sport': return <Trophy size={12} />;
      case 'food': return <Soup size={12} />;
      case 'art': return <Palette size={12} />;
      case 'tech': return <Cpu size={12} />;
      default: return null;
    }
  };

  return (
    <div className="w-[300px] h-full border-r border-[var(--border)] bg-[var(--bg)] flex flex-col overflow-hidden shrink-0">
      <div className="p-6 pb-4">
        <div className="text-[10px] text-[var(--text3)] uppercase font-bold tracking-[2px] mb-4 flex items-center gap-2">
          <Filter size={10} /> Discovery Hub
        </div>
        
        <div className="relative group mb-6">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-[var(--text3)] group-focus-within:text-[var(--accent)] transition-colors">
            <Search size={14} />
          </div>
          <input 
            className="w-full bg-[var(--bg2)] border border-[var(--border)] rounded-xl pl-10 pr-4 py-2.5 text-sm text-[var(--text)] placeholder:text-[var(--text3)] outline-none focus:border-[var(--accent2)] focus:ring-1 focus:ring-[var(--accentdim)] transition-all"
            placeholder="Find events or venues..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {["all", "music", "sport", "food", "art", "tech"].map(type => (
            <button 
              key={type}
              onClick={() => setFilter(type)}
              className={`px-4 py-1.5 rounded-xl text-[12px] font-medium border transition-all whitespace-nowrap
                ${filter === type 
                  ? "bg-[var(--accent)] border-[var(--accent2)] text-black shadow-lg shadow-cyan-500/20" 
                  : "bg-[var(--bg2)] border-[var(--border)] text-[var(--text2)] hover:border-[var(--text3)] hover:text-[var(--text)]"
                }`}
            >
              {type === "all" ? "Explore" : type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-6 space-y-3 custom-scrollbar">
        {filtered.map(e => (
          <div 
            key={e.id}
            onClick={() => onSelect(e.id)}
            className="group p-4 rounded-2xl border border-[var(--border)] bg-[var(--bg2)]/50 cursor-pointer card-hover hover:bg-[var(--bg3)] fadein"
          >
            <div className="flex justify-between items-start gap-3 mb-3">
              <div className="flex-1">
                <div className="text-sm font-bold leading-snug group-hover:text-[var(--accent)] transition-colors">{e.name}</div>
                <div className="text-[11px] text-[var(--text3)] mt-1 flex items-center gap-1">
                  <MapPin size={10} /> {e.place}
                </div>
              </div>
              <div className={`p-1.5 rounded-lg border flex items-center justify-center shrink-0
                ${e.type === 'music' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' :
                  e.type === 'sport' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                  e.type === 'food' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                  'bg-sky-500/10 text-sky-400 border-sky-500/20'}
              `}>
                {getTypeIcon(e.type)}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[10px] text-[var(--text2)] font-medium">
              <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-[var(--bg)]/50">
                <Clock size={10} className="text-[var(--text3)]" /> {e.time}
              </div>
              <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-[var(--bg)]/50">
                <Users size={10} className="text-[var(--text3)]" /> {e.attending}
              </div>
            </div>

            <div className="mt-4 flex items-center gap-3">
              <div className="flex-1 h-1 bg-[var(--bg)] rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full transition-all duration-700 ease-out"
                  style={{ 
                    width: `${e.crowdLevel}%`,
                    backgroundColor: e.crowdLevel > 80 ? 'var(--red)' : e.crowdLevel > 50 ? 'var(--amber)' : 'var(--accent)'
                  }}
                />
              </div>
              <span className="text-[10px] font-bold text-[var(--text3)]">{e.crowdLevel}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const MapPin = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
);
