"use client";
import { useState } from "react";
import { X } from "lucide-react";

export default function PreferenceModal({ onSave }: { onSave: (prefs: string[]) => void }) {
  const [prefs, setPrefs] = useState<string[]>([]);

  const toggle = (p: string) => {
    setPrefs(prev => prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p]);
  };

  const categories = ["Music", "Sport", "Food", "Art", "Tech", "Quiet Places", "Parties", "Outdoor"];

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[1000] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[var(--bg2)] border border-[var(--border2)] rounded-[var(--r2)] shadow-2xl overflow-hidden fadein">
        <div className="p-6">
          <div className="font-['Unbounded'] text-lg font-semibold mb-2">Ваши предпочтения</div>
          <div className="text-[13px] text-[var(--text2)] mb-6">Выберите категории, которые вам интересны, чтобы AI мог давать лучшие рекомендации по Алматы.</div>
          
          <div className="grid grid-cols-2 gap-2 mb-8">
            {categories.map(c => (
              <button
                key={c}
                onClick={() => toggle(c)}
                className={`p-3 rounded-[var(--r)] border text-sm transition-all text-left
                  ${prefs.includes(c) 
                    ? "bg-[var(--accentdim)] border-[var(--accent)] text-[var(--accent)]" 
                    : "bg-[var(--bg3)] border-[var(--border)] text-[var(--text2)] hover:border-[var(--border2)]"
                  }
                `}
              >
                {c}
              </button>
            ))}
          </div>

          <button 
            disabled={prefs.length === 0}
            onClick={() => onSave(prefs)}
            className="w-full py-3.5 bg-[var(--accent)] text-black rounded-[var(--r)] font-['Unbounded'] text-[12px] font-semibold tracking-wide disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#00ff9d] transition-all"
          >
            Сохранить и продолжить
          </button>
        </div>
      </div>
    </div>
  );
}
