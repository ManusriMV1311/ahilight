import { CyberHero } from "@/features/cyberfortress/components/new/CyberHero";
import { NewsTicker } from "@/features/cyberfortress/components/new/NewsTicker";
import { ProblemStatement } from "@/features/cyberfortress/components/new/ProblemStatement";
import { CyberFeatures } from "@/features/cyberfortress/components/new/CyberFeatures";
import { ProductHighlight } from "@/features/cyberfortress/components/new/ProductHighlight";
import { TrustSection } from "@/features/cyberfortress/components/new/TrustSection";
import { CyberOverviewBackground } from "@/features/cyberfortress/components/new/CyberOverviewBackground";
import styles from "@/features/cyberfortress/components/CyberFortress.module.css";

export default function CyberFortressPage() {
    return (
        <div className={styles.pageContainer}>
            <CyberOverviewBackground />
            <div> {/* Removed pt-20 to allow hero to reach top */}
                <CyberHero />
                <NewsTicker />
                <ProblemStatement />
                <CyberFeatures />
                <ProductHighlight />
                <TrustSection />
            </div>
        </div>
    );
}

