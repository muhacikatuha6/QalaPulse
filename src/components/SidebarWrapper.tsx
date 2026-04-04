"use client";
import Sidebar from "./Sidebar";
import { useRouter } from "next/navigation";

export default function SidebarWrapper({ initialEvents }: { initialEvents: any[] }) {
  const router = useRouter();

  const handleSelect = (id: string) => {
    router.push(`/?eventId=${id}`);
  };

  return <Sidebar events={initialEvents} onSelect={handleSelect} />;
}
