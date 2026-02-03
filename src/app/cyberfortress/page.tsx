import { CyberFortressBackground } from "@/components/backgrounds/CyberFortressBackground";
import { Hero } from "@/components/cyberfortress/sections/hero";
import { TrustSignals } from "@/components/cyberfortress/sections/trust-signals";
import { ProblemStatement } from "@/components/cyberfortress/sections/problem";
import { ValuePillars } from "@/components/sections/value-pillars";
import { ProductDemo } from "@/components/sections/product-demo";
import { TechnicalCredibility } from "@/components/sections/technical-credibility";
import { AISkepticism } from "@/components/sections/ai-skepticism";
import { Roadmap } from "@/components/sections/roadmap";
import { EarlyAccessCTA } from "@/components/sections/early-access-cta";
import { StickyCTA } from "@/components/layout/sticky-cta";

export default function CyberFortressPage() {
    return (
        <div className="flex flex-col gap-0 relative">
            <CyberFortressBackground />
            <div className="relative z-10">
                <Hero />
                <TrustSignals />
                <ProblemStatement />
                <ValuePillars />
                <ProductDemo />
                <TechnicalCredibility />
                <AISkepticism />
                <Roadmap />
                <EarlyAccessCTA />
            </div>
            <StickyCTA />
        </div>
    );
}
