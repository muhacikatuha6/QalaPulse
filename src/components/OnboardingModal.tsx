"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Target, CloudRain, ShieldAlert, Users, MapPin, Clock, 
  ChevronRight, Sparkles 
} from "lucide-react";
import { saveOnboarding } from "@/app/actions";

const questions = [
  {
    id: "priority",
    title: "1. Что для тебя важнее всего?",
    subtitle: "Чтобы ИИ понимал твои главные приоритеты",
    icon: <Target className="text-rose-400" />,
    options: [
      "Безопасность (избегать опасных зон)",
      "Комфорт (меньше людей)",
      "Интерес (популярные/живые места)",
      "Погода (только комфортные условия)"
    ]
  },
  {
    id: "weather",
    title: "2. Как ты относишься к погоде?",
    subtitle: "Твоя готовность к прогулкам под открытым небом",
    icon: <CloudRain className="text-blue-400" />,
    options: [
      "Хожу в любую погоду",
      "Избегаю дождя/снега",
      "Люблю только тёплую погоду",
      "Главное — чтобы не было экстремально"
    ]
  },
  {
    id: "caution",
    title: "3. Уровень осторожности",
    subtitle: "Насколько сильно ИИ должен тебя предупреждать?",
    icon: <ShieldAlert className="text-amber-400" />,
    options: [
      "Максимальный (избегать любых рисков)",
      "Средний (предупреждать, но не ограничивать)",
      "Минимальный (показывать всё, решу сам)"
    ]
  },
  {
    id: "social",
    title: "4. Отношение к людям",
    subtitle: "Твои предпочтения по плотности толпы",
    icon: <Users className="text-purple-400" />,
    options: [
      "Не люблю толпы",
      "Нормально, если не слишком много",
      "Люблю движ и активные места"
    ]
  },
  {
    id: "placeType",
    title: "5. Тип мест, куда хочешь ходить",
    subtitle: "Какая атмосфера тебе ближе всего?",
    icon: <MapPin className="text-emerald-400" />,
    options: [
      "Спокойные (парки, тихие зоны)",
      "Развлекательные (ТРЦ, кино, игры)",
      "Активные (спорт, прогулки)",
      "Случайные рекомендации от ИИ"
    ]
  },
  {
    id: "timing",
    title: "6. Когда нужны рекомендации?",
    subtitle: "Твой типичный график планирования",
    icon: <Clock className="text-cyan-400" />,
    options: [
      "Прямо сейчас",
      "Планировать заранее",
      "Только выходные",
      "В любое время"
    ]
  }
];

export default function OnboardingModal({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const currentQuestion = questions[step];

  const handleSelect = async (option: string) => {
    const newAnswers = { ...answers, [currentQuestion.id]: option };
    setAnswers(newAnswers);

    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setLoading(true);
      try {
        await saveOnboarding(newAnswers);
        onComplete();
      } catch (error) {
        console.error("Save error:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/90 backdrop-blur-2xl p-4 overflow-hidden">
      <motion.div 
        initial={{ scale: 0.95, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        className="w-full max-w-xl bg-[var(--bg2)] border border-[var(--border2)] rounded-[40px] overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.6)] relative"
      >
        {/* Background Glow */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-[var(--accent)] opacity-10 blur-[100px] pointer-events-none" />
        
        <div className="p-10">
          {/* Header */}
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[var(--bg3)] border border-[var(--border)] flex items-center justify-center shadow-lg">
                {currentQuestion.icon}
              </div>
              <div>
                <h3 className="text-sm font-bold text-[var(--text3)] uppercase tracking-[3px]">{currentQuestion.title}</h3>
                <div className="h-1.5 w-40 bg-[var(--bg)] rounded-full mt-3 overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent2)]" 
                    initial={{ width: 0 }}
                    animate={{ width: `${((step + 1) / questions.length) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-lg font-['Unbounded'] font-bold text-[var(--accent)]">
                {step + 1}<span className="text-[var(--text3)] text-sm">/{questions.length}</span>
              </span>
            </div>
          </div>

          <h2 className="text-3xl font-bold font-['Unbounded'] mb-10 leading-tight tracking-tight text-white">
            {currentQuestion.subtitle}
          </h2>

          <div className="space-y-3 max-h-[400px] overflow-y-auto custom-scrollbar pr-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ x: 30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -30, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="space-y-3"
              >
                {currentQuestion.options.map((option, i) => (
                  <button
                    key={i}
                    disabled={loading}
                    onClick={() => handleSelect(option)}
                    className="w-full p-6 text-left rounded-3xl bg-[var(--bg)] border border-[var(--border)] hover:border-[var(--accent)] hover:bg-[var(--bg3)] transition-all group flex items-center justify-between active:scale-[0.98] relative overflow-hidden"
                  >
                    <div className="relative z-10 flex items-center gap-4">
                      <div className="w-2 h-2 rounded-full bg-[var(--border)] group-hover:bg-[var(--accent)] transition-colors" />
                      <span className="text-[15px] font-semibold text-[var(--text2)] group-hover:text-white transition-colors">{option}</span>
                    </div>
                    <ChevronRight size={20} className="text-[var(--text3)] group-hover:text-[var(--accent)] group-hover:translate-x-1 transition-all relative z-10" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[var(--accentdim)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="bg-[var(--bg3)]/50 p-8 border-t border-[var(--border)] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Sparkles size={16} className="text-[var(--accent)]" />
            <p className="text-[11px] text-[var(--text3)] max-w-[280px] leading-relaxed uppercase font-bold tracking-wider">
              Твой профиль готов на {Math.round(((step + 1) / questions.length) * 100)}%
            </p>
          </div>
          <div className="flex gap-1.5">
            {questions.map((_, i) => (
              <div key={i} className={`w-2 h-2 rounded-full transition-all duration-300 ${i === step ? 'w-6 bg-[var(--accent)]' : i < step ? 'bg-[var(--accentdim)]' : 'bg-[var(--border)]'}`} />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
