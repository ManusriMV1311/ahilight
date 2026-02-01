import { Hero } from "@/components/sections/hero";
import { TrustSignals } from "@/components/sections/trust-signals";
import { ProblemStatement } from "@/components/sections/problem";
import { SolutionOverview } from "@/components/sections/solution";
import { SocialProof } from "@/components/sections/social-proof";
import { CTA } from "@/components/sections/cta";

export default function Home() {
  return (
    <div className="flex flex-col gap-0 relative">
      <div className="relative z-10">
        <Hero />
        <TrustSignals />
        <ProblemStatement />
        <SolutionOverview />
        <SocialProof />
        <CTA />
      </div>
    </div>
  );
}
