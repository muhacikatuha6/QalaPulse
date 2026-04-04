"use client";
import RightPanel from "./RightPanel";

export default function RightPanelWrapper({ initialSelectedEvent, initialCrimes, allEvents }: { initialSelectedEvent: any | null, initialCrimes: any[], allEvents: any[] }) {
  return <RightPanel selectedEvent={initialSelectedEvent} crimes={initialCrimes} allEvents={allEvents} />;
}
