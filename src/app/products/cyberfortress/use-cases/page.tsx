
import styles from '@/components/cyberfortress/CyberFortress.module.css';
import Link from 'next/link';

export default function CyberUseCasesPage() {
    return (
        <div className={styles.pageContainer}>
            <div className="pt-20">
                {/* HERO */}
                <section className={`${styles.hero} !pb-20 !pt-24 md:!pt-32`}>
                    <div className={styles.container}>
                        <p className={styles.trustLabel}>Use Cases</p>
                        <h1 className={`${styles.heroContent} text-3xl md:text-5xl font-bold font-heading mb-6 mt-4`}>
                            Designed for real security operations
                        </h1>
                        <p className={styles.subtitle}>
                            CyberFortress supports modern security teams by reducing noise,
                            accelerating response, and maintaining human control across
                            complex environments.
                        </p>
                    </div>
                </section>

                {/* USE CASES */}
                <section className={styles.problemStatement}>
                    <div className={styles.container}>
                        <h2 className={styles.sectionHeader + " !mb-12"}>
                            <span className="text-3xl font-bold text-white">Operational Use Cases</span>
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                            {/* USE CASE 1 */}
                            <div className={styles.problemCard}>
                                <h3>SOC Operations & Alert Fatigue</h3>
                                <p className="mb-4">
                                    CyberFortress correlates high volumes of security alerts into
                                    fewer, higher-confidence incidents, allowing SOC teams to
                                    focus on what matters most.
                                </p>
                                <ul className="list-disc pl-5 text-gray-400 space-y-2">
                                    <li>Noise reduction through correlation</li>
                                    <li>Context-rich incident grouping</li>
                                    <li>Analyst-driven escalation control</li>
                                </ul>
                            </div>

                            {/* USE CASE 2 */}
                            <div className={styles.problemCard}>
                                <h3>Cloud & Hybrid Infrastructure Security</h3>
                                <p className="mb-4">
                                    Designed to operate across cloud native, on prem, and hybrid
                                    environments while maintaining consistent policy enforcement.
                                </p>
                                <ul className="list-disc pl-5 text-gray-400 space-y-2">
                                    <li>Multi-cloud telemetry ingestion</li>
                                    <li>Identity and access context awareness</li>
                                    <li>Unified response orchestration</li>
                                </ul>
                            </div>

                            {/* USE CASE 3 */}
                            <div className={styles.problemCard}>
                                <h3>Incident Response & Containment</h3>
                                <p className="mb-4">
                                    Enables rapid, controlled response actions to contain threats
                                    while preserving analyst oversight and approval workflows.
                                </p>
                                <ul className="list-disc pl-5 text-gray-400 space-y-2">
                                    <li>Policy based response actions</li>
                                    <li>Human in the loop approvals</li>
                                    <li>Rollback and recovery support</li>
                                </ul>
                            </div>

                            {/* USE CASE 4 */}
                            <div className={styles.problemCard}>
                                <h3>Compliance-Driven Environments</h3>
                                <p className="mb-4">
                                    Supports organizations operating under strict regulatory
                                    requirements by providing full transparency and auditability.
                                </p>
                                <ul className="list-disc pl-5 text-gray-400 space-y-2">
                                    <li>Comprehensive audit trails</li>
                                    <li>Change tracking and attribution</li>
                                    <li>Alignment with SOC 2 and ISO controls</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className={`${styles.trustSection}`}>
                    <div className={styles.container}>
                        <h2 className="text-3xl font-bold mb-4">See how CyberFortress fits your environment</h2>
                        <p className={`${styles.subtitle} mx-auto mb-8`}>
                            Explore how CyberFortress supports your security workflows without
                            compromising control.
                        </p>
                        <div className={styles.ctaButtons + " justify-center"}>
                            <Link href="/products/cyberfortress/demo" className="btn-premium-dark">
                                Request Demo
                            </Link>
                            <Link href="/products/cyberfortress/features" className="btn-premium-outline">
                                View Features
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
