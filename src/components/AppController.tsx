"use client";
import { useState } from "react";
import OnboardingModal from "./OnboardingModal";

export default function AppController({ needsOnboarding }: { needsOnboarding: boolean }) {
  const [showModal, setShowModal] = useState(needsOnboarding);

  const handleComplete = () => {
    setShowModal(false);
  };

  if (!showModal) return null;

  return <OnboardingModal onComplete={handleComplete} />;
}
