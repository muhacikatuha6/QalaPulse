"use client";
import SidebarWrapper from "@/components/SidebarWrapper";
import MapArea from "@/components/MapArea";
import EcoPulse from "@/components/EcoPulse";
import RightPanelWrapper from "@/components/RightPanelWrapper";
import { useUIStore } from "@/lib/store";
import { motion, AnimatePresence } from "framer-motion";

import FloatingDetailCard from "./FloatingDetailCard";
import { useRouter } from "next/navigation";

export default function MainContent({ 
  events, 
  crimes, 
  selectedEventId, 
  selectedEvent 
}: { 
  events: any[], 
  crimes: any[], 
  selectedEventId: string | null,
  selectedEvent: any
}) {
  const { activeMode, sidebarOpen, rightPanelOpen } = useUIStore();
  const router = useRouter();

  return (
    <main className="flex-1 flex overflow-hidden relative">
      <AnimatePresence initial={false}>
        {sidebarOpen && (
          <motion.div
            initial={{ x: -320, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -320, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="z-20 h-full"
          >
            <SidebarWrapper initialEvents={events} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Detail Card - Always available when event is selected */}
      <AnimatePresence>
        {selectedEvent && (
          <FloatingDetailCard 
            event={selectedEvent} 
            onClose={() => router.push('/')} 
          />
        )}
      </AnimatePresence>
      
      <div className="flex-1 flex flex-col relative overflow-hidden h-full">
        {activeMode === 'city-pulse' ? (
          <MapArea events={events} crimes={crimes} selectedId={selectedEventId} />
        ) : (
          <EcoPulse />
        )}
      </div>

      <AnimatePresence initial={false}>
        {rightPanelOpen && (
          <motion.div
            initial={{ x: 360, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 360, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="z-20 h-full"
          >
            <RightPanelWrapper 
              initialSelectedEvent={selectedEvent} 
              initialCrimes={crimes} 
              allEvents={events} 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
