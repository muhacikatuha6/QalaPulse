"use client";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area, BarChart, Bar, Cell 
} from 'recharts';
import { Wind, Droplets, Thermometer, Info, AlertTriangle, TrendingUp, Map as MapIcon } from "lucide-react";
import { useUIStore } from "@/lib/store";
import { motion } from "framer-motion";

const data = [
  { time: '00:00', aqi: 45, pm25: 18, temp: 18 },
  { time: '04:00', aqi: 52, pm25: 22, temp: 16 },
  { time: '08:00', aqi: 78, pm25: 35, temp: 19 },
  { time: '12:00', aqi: 68, pm25: 28, temp: 23 },
  { time: '16:00', aqi: 62, pm25: 25, temp: 25 },
  { time: '20:00', aqi: 72, pm25: 31, temp: 21 },
  { time: '23:59', aqi: 58, pm25: 24, temp: 19 },
];

const districtData = [
  { name: 'Медеуский', value: 82, color: '#ef4444' },
  { name: 'Алмалинский', value: 74, color: '#f97316' },
  { name: 'Бостандыкский', value: 65, color: '#facc15' },
  { name: 'Ауэзовский', value: 58, color: '#facc15' },
  { name: 'Жетысуский', value: 45, color: '#22c55e' },
];

export default function EcoPulse() {
  const { setEcoOverlayOnMap, setActiveMode } = useUIStore();

  return (
    <div className="flex-1 p-6 overflow-y-auto bg-[var(--bg)] custom-scrollbar">
      <div className="grid grid-cols-12 gap-6 max-w-7xl mx-auto">
        
        {/* Main AQI Chart */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="col-span-12 lg:col-span-8 bg-[var(--bg2)] border border-[var(--border)] rounded-3xl p-6 relative overflow-hidden"
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-xl font-bold font-['Unbounded'] mb-1">Качество воздуха (AQI)</h2>
              <p className="text-sm text-[var(--text3)]">Динамика PM2.5 и индекса AQI за последние 24 часа</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[var(--accent)]" />
                <span className="text-xs font-medium text-[var(--text3)] uppercase tracking-wider">AQI Index</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-cyan-400" />
                <span className="text-xs font-medium text-[var(--text3)] uppercase tracking-wider">PM 2.5</span>
              </div>
            </div>
          </div>

          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorAqi" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--accent)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--accent)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="time" stroke="rgba(255,255,255,0.3)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="rgba(255,255,255,0.3)" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: '12px' }}
                  itemStyle={{ fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="aqi" stroke="var(--accent)" fillOpacity={1} fill="url(#colorAqi)" strokeWidth={3} />
                <Area type="monotone" dataKey="pm25" stroke="#22d3ee" fill="transparent" strokeWidth={2} strokeDasharray="5 5" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-6 p-4 rounded-2xl bg-[var(--accentdim)] border border-[var(--accent2)]/20 flex items-start gap-3">
            <Info size={18} className="text-[var(--accent)] mt-0.5" />
            <p className="text-xs text-[var(--text2)] leading-relaxed">
              <span className="font-bold text-[var(--accent)] uppercase mr-2">Анализ:</span> 
              Текущий уровень PM2.5 (28 µg/m³) превышает норму ВОЗ в 1.8 раза. 
              Слабый ветер (3 км/ч) способствует накоплению смога в нижней части города.
            </p>
          </div>
        </motion.div>

        {/* Weather & Wind Side Cards */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-[var(--bg2)] to-[var(--bg)] border border-[var(--border)] rounded-3xl p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs font-bold text-[var(--text3)] uppercase tracking-widest">Метеоусловия</span>
              <Thermometer size={18} className="text-[var(--accent)]" />
            </div>
            <div className="flex items-end justify-between">
              <div>
                <div className="text-4xl font-bold font-['Unbounded']">+23°C</div>
                <div className="text-sm text-[var(--text3)] mt-1">Ощущается как +21°C</div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-2 text-[var(--text2)] mb-1">
                  <Droplets size={14} className="text-cyan-400" />
                  <span className="text-sm font-medium">42% Влажность</span>
                </div>
                <div className="flex items-center gap-2 text-[var(--text2)]">
                  <Wind size={14} className="text-cyan-400" />
                  <span className="text-sm font-medium">3 км/ч Ветер</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-[var(--bg2)] border border-[var(--border)] rounded-3xl p-6 flex-1"
          >
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs font-bold text-[var(--text3)] uppercase tracking-widest">По районам</span>
              <TrendingUp size={18} className="text-orange-400" />
            </div>
            <div className="space-y-4">
              {districtData.map((d, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="flex-1">
                    <div className="flex justify-between text-[11px] mb-1.5 uppercase font-bold tracking-tight">
                      <span>{d.name}</span>
                      <span style={{ color: d.color }}>{d.value} AQI</span>
                    </div>
                    <div className="h-1.5 w-full bg-[var(--border)] rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${d.value}%` }}
                        className="h-full"
                        style={{ backgroundColor: d.color }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Overlay Action Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="col-span-12 bg-gradient-to-r from-[var(--accentdim)] to-transparent border border-[var(--accent2)]/20 rounded-3xl p-8 flex items-center justify-between overflow-hidden relative"
        >
          <div className="relative z-10 max-w-2xl">
            <h3 className="text-2xl font-bold font-['Unbounded'] mb-2">Кросс-анализ систем</h3>
            <p className="text-[var(--text2)] mb-6 leading-relaxed">
              Наложите тепловую карту загрязнения на карту города, чтобы увидеть связь между трафиком, событиями и качеством воздуха в реальном времени.
            </p>
            <button 
              onClick={() => {
                setEcoOverlayOnMap(true);
                setActiveMode('city-pulse');
              }}
              className="px-6 py-3 rounded-xl bg-[var(--accent)] text-white font-bold text-sm uppercase tracking-wider shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all active:scale-95 flex items-center gap-2"
            >
              <MapIcon size={18} /> Наложить на карту
            </button>
          </div>
          <div className="absolute right-[-20px] top-[-20px] opacity-10 pointer-events-none">
            <MapIcon size={300} strokeWidth={1} className="text-[var(--accent)]" />
          </div>
        </motion.div>

      </div>
    </div>
  );
}
