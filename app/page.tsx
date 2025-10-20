"use client"

import { useState } from "react"
import Navigation from "@/components/navigation"
import Hero from "@/components/hero"
import ServiceToggle from "@/components/service-toggle"
import TalentPool from "@/components/talent-pool"
import TrainingSection from "@/components/training-section"
import PartnersSection from "@/components/partners-section"
import Footer from "@/components/footer"
import AboutSection from "@/components/about-section"
import TeamCarousel from "@/components/team-carousel"

export default function Home() {
  const [userType, setUserType] = useState<"companies" | "individuals" | null>(null)

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <Hero onSelectUserType={setUserType} />
      {userType && <ServiceToggle userType={userType} onBack={() => setUserType(null)} />}
      <AboutSection />
      <TalentPool />
      <TrainingSection />
      <TeamCarousel />
      <PartnersSection />
      <Footer />
    </main>
  )
}
