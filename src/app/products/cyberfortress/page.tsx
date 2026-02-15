import { CyberHero } from "@/components/cyberfortress/new/CyberHero";
import { NewsTicker } from "@/components/cyberfortress/new/NewsTicker";
import { ProblemStatement } from "@/components/cyberfortress/new/ProblemStatement";
import { CyberFeatures } from "@/components/cyberfortress/new/CyberFeatures";
import { ProductHighlight } from "@/components/cyberfortress/new/ProductHighlight";
import { TrustSection } from "@/components/cyberfortress/new/TrustSection";
import { CyberOverviewBackground } from "@/components/cyberfortress/new/CyberOverviewBackground";
import styles from "@/components/cyberfortress/CyberFortress.module.css";

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

