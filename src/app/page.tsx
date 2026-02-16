
import { HomeBackground } from "@/components/backgrounds/HomeBackground";
import { Hero } from "@/features/landing/components/hero"
import { Problem } from "@/features/landing/components/problem"
import { Principles } from "@/features/landing/components/principles"
import { ResearchCredibility } from "@/features/landing/components/research-credibility"
import { CompanyRoadmap } from "@/features/landing/components/company-roadmap"
import { FinalCTA } from "@/features/landing/components/final-cta"

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <HomeBackground />
      <div className="relative z-10">
        <Hero />
        <Problem />
        <Principles />
        <ResearchCredibility />
        <CompanyRoadmap />
        <FinalCTA />
      </div>
    </div>
  )
}
