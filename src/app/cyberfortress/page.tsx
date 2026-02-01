import { CyberFortressHero } from "@/components/cyberfortress/hero";
import { CyberFortressValueProps } from "@/components/cyberfortress/value-props";
import { ArchitectureDiagram } from "@/components/cyberfortress/architecture";
import { ComplianceTrust } from "@/components/cyberfortress/compliance";
import { CTA } from "@/components/sections/cta"; // Reusing the global CTA for now, could be customized

export default function CyberFortressPage() {
    return (
        <main className="flex flex-col gap-0 bg-deep-navy text-white">
            <CyberFortressHero />
            <CyberFortressValueProps />
            <ArchitectureDiagram />
            <ComplianceTrust />
            <CTA />
        </main>
    );
}
