"use client";
import { useState, useRef, useEffect } from "react";
import { 
  Info, Bot, ShieldAlert, MapPin, Clock, Users, 
  AlertTriangle, Send, Sparkles, Star
} from "lucide-react";
import { chatWithAI } from "@/app/actions";
import { useUIStore } from "@/lib/store";
import { motion, AnimatePresence } from "framer-motion";

export default function RightPanel({ selectedEvent, crimes, allEvents }: { 
  selectedEvent: any | null, 
  crimes: any[], 
  allEvents: any[] 
}) {
  const [tab, setTab] = useState("ai");
  const { activeMode, companionMode, setCompanionMode } = useUIStore();
  const [messages, setMessages] = useState<{ role: string, content: string }[]>([
    { role: 'assistant', content: "Привет! Я QalaPulse AI. Знаю всё о событиях и безопасности в Алматы прямо сейчас. Чем могу помочь? 🏙️" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  useEffect(() => {
    if (companionMode && messages.length === 1) {
      setMessages([{ role: 'assistant', content: "Салем! Твой личный компаньон на связи. Я помню, что ты любишь, и уже подобрал пару идей для тебя! 🏔️✨" }]);
    } else if (!companionMode && messages.length === 1) {
      setMessages([{ role: 'assistant', content: "Привет! Я QalaPulse AI. Знаю всё о событиях и безопасности в Алматы прямо сейчас. Чем могу помочь? 🏙️" }]);
    }
  }, [companionMode]);

  const handleSend = async (text: string) => {
    if (!text.trim() || isTyping) return;
    const userMsg = { role: 'user', content: text };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);
    try {
      const response = await chatWithAI([...messages, userMsg], allEvents, crimes, activeMode);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'assistant', content: "Ошибка связи с сервером." }]);
    } finally {
      setIsTyping(false);
    }
  };

  const quickQuestions = companionMode 
    ? ["Что посоветуешь на вечер?", "Где сегодня меньше людей?", "Как погода в горах?"]
    : ["Что происходит в городе?", "Где сейчас опасно?", "Пробки на дорогах?"];

  return (
    <div className="w-[360px] h-full border-l border-[var(--border)] bg-[var(--bg)] flex flex-col overflow-hidden shrink-0">
      <div className="flex px-4 pt-4 gap-1">
        {[
          { id: "ai", label: "AI Chat", icon: <Bot size={14} /> },
          { id: "crimes", label: "Safety", icon: <ShieldAlert size={14} /> },
        ].map(t => (
          <button 
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-[12px] font-bold rounded-xl transition-all
              ${tab === t.id ? "bg-[var(--bg3)] text-[var(--accent)] border border-[var(--border2)] shadow-lg" : "text-[var(--text3)] hover:text-[var(--text2)]"}
            `}
          >
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar relative">
        {tab === "ai" && (
          <div className="flex flex-col h-full bg-[var(--bg2)]/30">
            {/* Companion Toggle */}
            <div className={`p-4 border-b border-[var(--border)] flex items-center justify-between transition-colors ${companionMode ? 'bg-[var(--accentdim)]/20' : 'bg-[var(--bg)]/50'}`}>
              <div className="flex items-center gap-2">
                <Sparkles size={14} className={companionMode ? "text-[var(--accent)] animate-pulse" : "text-[var(--text3)]"} />
                <span className={`text-[10px] font-bold uppercase tracking-widest ${companionMode ? "text-[var(--accent)]" : "text-[var(--text3)]"}`}>
                  Companion Mode
                </span>
              </div>
              <button 
                onClick={() => setCompanionMode(!companionMode)}
                className={`w-9 h-5 rounded-full relative transition-all ${companionMode ? 'bg-[var(--accent)]' : 'bg-[var(--bg3)]'}`}
              >
                <motion.div 
                  animate={{ x: companionMode ? 18 : 2 }}
                  className="absolute top-1 w-3 h-3 rounded-full bg-white shadow-sm"
                />
              </button>
            </div>

            <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto space-y-4 custom-scrollbar">
              <AnimatePresence>
                {messages.map((m, i) => (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    key={i}
                    className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[85%] p-3.5 rounded-2xl text-[13px] leading-relaxed shadow-sm
                      ${m.role === 'user' 
                        ? 'bg-[var(--accent)] text-black font-medium' 
                        : companionMode ? 'bg-white text-black font-medium' : 'bg-[var(--bg3)] text-[var(--text)] border border-[var(--border)]'}
                    `}>
                      {m.content}
                    </div>
                  </motion.div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-[var(--bg3)] p-3 rounded-2xl flex gap-1">
                      <span className="w-1 h-1 bg-[var(--accent)] rounded-full animate-bounce" />
                      <span className="w-1 h-1 bg-[var(--accent)] rounded-full animate-bounce [animation-delay:0.2s]" />
                      <span className="w-1 h-1 bg-[var(--accent)] rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                )}
              </AnimatePresence>
            </div>

            <div className="p-4 border-t border-[var(--border)] bg-[var(--bg)]">
              <div className="flex flex-wrap gap-2 mb-4">
                {quickQuestions.map(q => (
                  <button 
                    key={q}
                    onClick={() => handleSend(q)}
                    className="text-[9px] font-bold px-3 py-1.5 rounded-full border border-[var(--border)] hover:border-[var(--accent)] text-[var(--text3)] hover:text-[var(--accent)] transition-all uppercase tracking-tighter"
                  >
                    {q}
                  </button>
                ))}
              </div>
              <div className="relative group">
                <input 
                  className="w-full bg-[var(--bg2)] border border-[var(--border)] rounded-2xl pl-4 pr-12 py-3 text-sm focus:border-[var(--accent)] outline-none transition-all"
                  placeholder={companionMode ? "Спроси друга..." : "Запросить данные..."}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
                />
                <button 
                  onClick={() => handleSend(input)}
                  className="absolute right-2 top-2 p-1.5 bg-[var(--accent)] text-black rounded-xl hover:scale-105 transition-all shadow-lg"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </div>
        )}

        {tab === "crimes" && (
          <div className="fadein space-y-4 p-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-[var(--text3)]">Safety Reports</h3>
            {crimes.map(c => (
              <div key={c.id} className="p-4 bg-[var(--bg2)] border border-[var(--border)] rounded-2xl card-hover">
                <div className="flex items-center gap-2 text-[13px] font-bold text-[var(--red)] mb-2">
                  <AlertTriangle size={14} /> {c.type}
                </div>
                <p className="text-[12px] text-[var(--text2)]">{c.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
