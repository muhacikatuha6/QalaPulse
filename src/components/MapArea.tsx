"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import { useUIStore } from "@/lib/store";
import { X, BrainCircuit } from "lucide-react";

const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), { ssr: false });
const Circle = dynamic(() => import("react-leaflet").then((mod) => mod.Circle), { ssr: false });
const LTooltip = dynamic(() => import("react-leaflet").then((mod) => mod.Tooltip), { ssr: false });

export default function MapArea({ events, crimes, selectedId }: { events: any[], crimes: any[], selectedId: string | null }) {
  const [L, setL] = useState<any>(null);
  const { ecoOverlayOnMap, setEcoOverlayOnMap, oracleMode, setOracleMode } = useUIStore();

  useEffect(() => {
    import("leaflet").then((leaflet) => {
      setL(leaflet);
    });
  }, []);

  if (!L) return <div className="flex-1 bg-[var(--bg)]" />;

  const eventIcon = (type: string) => L.divIcon({
    className: 'custom-icon',
    html: `<div class="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-sm shadow-lg" style="background: ${type === 'music' ? '#a855f7' : type === 'sport' ? '#00e5a0' : type === 'food' ? '#f5a623' : '#4a9eff'}">📍</div>`,
    iconSize: [32, 32],
  });

  const crimeIcon = L.divIcon({
    className: 'custom-icon',
    html: `<div class="w-6 h-6 rounded-full bg-[var(--red)] border-2 border-white flex items-center justify-center text-[10px] shadow-lg pulse">🚨</div>`,
    iconSize: [24, 24],
  });

  const center: [number, number] = [43.238, 76.926];

  const ecoZones = [
    { center: [43.195, 76.915], radius: 2800, color: '#22c55e', name: 'Медеуский' },
    { center: [43.238, 76.926], radius: 2000, color: '#f97316', name: 'Алмалинский' },
    { center: [43.277, 76.945], radius: 2200, color: '#ef4444', name: 'Жетысуский' },
    { center: [43.340, 76.950], radius: 3500, color: '#b91c1c', name: 'Турксибский' },
  ];

  const predictions = [
    { center: [43.242, 76.933], radius: 800, prob: '87%', type: 'Traffic Jam', color: '#a855f7' },
    { center: [43.262, 76.930], radius: 600, prob: '64%', type: 'Crowd Surge', color: '#ec4899' },
    { center: [43.225, 76.905], radius: 1000, prob: '42%', type: 'Possible Incident', color: '#ef4444' }
  ];

  return (
    <div className="flex-1 relative overflow-hidden">
      <MapContainer center={center} zoom={13} style={{ height: "100%", width: "100%" }} zoomControl={false}>
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png"
          attribution='&copy; OpenStreetMap'
        />
        
        {ecoOverlayOnMap && ecoZones.map((zone, i) => (
          <Circle key={`eco-${i}`} center={zone.center as [number, number]} radius={zone.radius} pathOptions={{ fillColor: zone.color, color: zone.color, weight: 1, fillOpacity: 0.2 }} />
        ))}

        {oracleMode && predictions.map((p, i) => (
          <Circle 
            key={`oracle-${i}`} 
            center={p.center as [number, number]} 
            radius={p.radius} 
            pathOptions={{ fillColor: p.color, color: p.color, weight: 2, fillOpacity: 0.2, dashArray: '5, 10' }}
          >
            <LTooltip permanent direction="center" className="oracle-tooltip">
              <div className="flex flex-col items-center gap-0.5">
                <span className="text-[9px] font-bold uppercase opacity-70 tracking-tighter text-white">Prediction</span>
                <span className="text-[11px] font-black text-white whitespace-nowrap">{p.type} {p.prob}</span>
              </div>
            </LTooltip>
          </Circle>
        ))}

        {events.map(e => (
          <Marker key={e.id} position={[e.lat, e.lng]} icon={eventIcon(e.type)}>
            <Popup className="dark-popup">
              <div className="p-1 min-w-[150px]">
                <div className="font-semibold text-sm mb-1">{e.name}</div>
                <div className="text-xs text-gray-400">📍 {e.place}</div>
              </div>
            </Popup>
          </Marker>
        ))}

        {crimes.map(c => (
          <Marker key={c.id} position={[c.lat, c.lng]} icon={crimeIcon}>
            <Popup className="dark-popup">
              <div className="p-1 min-w-[150px]">
                <div className="font-semibold text-sm text-[var(--red)] mb-1">{c.type}</div>
                <div className="text-xs text-gray-300">{c.description}</div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Oracle Toggle UI */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-[500] flex gap-2">
        {ecoOverlayOnMap && (
          <div className="bg-[var(--bg2)] border border-[var(--accent)] rounded-2xl px-6 py-3 shadow-2xl flex items-center gap-4 backdrop-blur-md">
            <span className="text-sm font-bold uppercase tracking-widest text-[var(--accent)]">Eco Overlay</span>
            <button onClick={() => setEcoOverlayOnMap(false)} className="text-[var(--text3)] hover:text-white"><X size={18} /></button>
          </div>
        )}
        <button 
          onClick={() => setOracleMode(!oracleMode)}
          className={`px-6 py-3 rounded-2xl border transition-all flex items-center gap-3 shadow-2xl backdrop-blur-md
            ${oracleMode ? 'bg-purple-600 border-purple-400 text-white' : 'bg-[var(--bg2)] border-[var(--border)] text-[var(--text3)]'}
          `}
        >
          <BrainCircuit size={18} className={oracleMode ? 'animate-pulse' : ''} />
          <span className="text-sm font-bold uppercase tracking-widest">AI Oracle {oracleMode ? 'ON' : 'OFF'}</span>
        </button>
      </div>

      <div className="absolute bottom-4 left-4 bg-[var(--bg2)] border border-[var(--border)] rounded-[var(--r)] p-2.5 flex flex-col gap-1.5 z-[500]">
        <div className="flex items-center gap-2 text-[11px] text-[var(--text2)]">
          <div className="w-2 h-2 rounded-full bg-[var(--accent)]" /> События
        </div>
        <div className="flex items-center gap-2 text-[11px] text-[var(--text2)]">
          <div className="w-2 h-2 rounded-full bg-[var(--red)] pulse" /> Опасности
        </div>
        {oracleMode && (
          <div className="flex items-center gap-2 text-[11px] text-purple-400 border-t border-[var(--border)] pt-1 mt-1">
            <div className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_5px_purple]" /> Прогноз (2ч)
          </div>
        )}
      </div>
    </div>
  );
}
