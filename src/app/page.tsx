import TopBar from "@/components/TopBar";
import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import AppController from "@/components/AppController";
import MainContent from "@/components/MainContent";

export default async function Home({
  searchParams,
}: {
  searchParams: { eventId?: string };
}) {
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  // Fetch data from DB
  const events = await prisma.event.findMany({
    orderBy: { createdAt: 'desc' }
  });
  
  const crimes = await prisma.crime.findMany({
    orderBy: { timestamp: 'desc' },
    take: 10
  });

  const resolvedSearchParams = await searchParams;
  const selectedEventId = resolvedSearchParams.eventId || null;
  const selectedEvent = selectedEventId ? events.find(e => e.id === selectedEventId) : null;

  const dbUser = await prisma.user.findUnique({
    where: { clerkId: user.id }
  });

  const needsOnboarding = !dbUser?.onboarding;

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[var(--bg)] text-[var(--text)]">
      <AppController needsOnboarding={needsOnboarding} />
      <TopBar />
      <MainContent 
        events={events} 
        crimes={crimes} 
        selectedEventId={selectedEventId} 
        selectedEvent={selectedEvent} 
      />
    </div>
  );
}
