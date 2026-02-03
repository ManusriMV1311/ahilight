
import { Hero } from "@/components/sections/hero"
import { Problem } from "@/components/sections/problem"
import { Principles } from "@/components/sections/principles"
import { ResearchCredibility } from "@/components/sections/research-credibility"
import { CompanyRoadmap } from "@/components/sections/company-roadmap"
import { FinalCTA } from "@/components/sections/final-cta"

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <Hero />
      <Problem />
      <Principles />
      <ResearchCredibility />
      <CompanyRoadmap />
      <FinalCTA />
    </div>
  )
}
