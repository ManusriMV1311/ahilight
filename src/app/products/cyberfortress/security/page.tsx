
import styles from '@/components/cyberfortress/CyberFortress.module.css';
import Link from 'next/link';

export default function CyberSecurityPage() {
    return (
        <div className={styles.pageContainer}>
            <div className="pt-20">
                {/* HERO */}
                <section className={`${styles.hero} !pb-20 !pt-32`}>
                    <div className={styles.container}>
                        <p className={styles.trustLabel}>Security Model</p>
                        <h1 className={`${styles.heroContent} text-5xl font-bold mb-6 mt-4`}>
                            Security by design, not by assumption
                        </h1>
                        <p className={styles.subtitle}>
                            CyberFortress is built with a defense-in-depth approach that
                            prioritizes data protection, controlled automation, and complete
                            transparency across all actions.
                        </p>
                    </div>
                </section>

                {/* SECURITY PRINCIPLES */}
                <section className={styles.problemStatement}>
                    <div className={styles.container}>
                        <h2 className={styles.sectionHeader + " !mb-12"}>
                            <span className="text-3xl font-bold text-white">Core Security Principles</span>
                        </h2>

                        <div className={styles.problemGrid}>
                            <div className={styles.problemCard}>
                                <h3>Least Privilege</h3>
                                <p>
                                    Access is granted strictly on a need-to-know basis using
                                    role-based access control and scoped permissions.
                                </p>
                            </div>

                            <div className={styles.problemCard}>
                                <h3>Human Authorization</h3>
                                <p>
                                    High-impact actions require explicit human approval to prevent
                                    unintended consequences.
                                </p>
                            </div>

                            <div className={styles.problemCard}>
                                <h3>Defense in Depth</h3>
                                <p>
                                    Security controls are applied at every layer of the platform
                                    to reduce blast radius and operational risk.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* DATA PROTECTION */}
                <section className={styles.problemStatement}>
                    <div className={styles.container}>
                        <div className={styles.sectionHeader}>
                            <h2>Data Protection</h2>
                            <p>
                                CyberFortress is designed to minimize data exposure and ensure
                                confidentiality, integrity, and availability across deployments.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className={styles.problemCard}>
                                <h3>Data Isolation</h3>
                                <p>
                                    Customer data is logically isolated per tenant and per
                                    deployment environment.
                                </p>
                            </div>

                            <div className={styles.problemCard}>
                                <h3>Encryption</h3>
                                <p>
                                    Data is encrypted in transit and at rest using industry-
                                    standard cryptographic controls.
                                </p>
                            </div>

                            <div className={styles.problemCard}>
                                <h3>Minimal Retention</h3>
                                <p>
                                    Only required security telemetry is retained, following
                                    customer-defined retention policies.
                                </p>
                            </div>

                            <div className={styles.problemCard}>
                                <h3>Customer-controlled Deployment</h3>
                                <p>
                                    Supports on-premises and isolated cloud deployments to meet
                                    regulatory and operational requirements.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* AUDIT & VISIBILITY */}
                <section className={styles.problemStatement}>
                    <div className={styles.container}>
                        <h2 className={styles.sectionHeader + " !mb-12"}>
                            <span className="text-3xl font-bold text-white">Auditability & Visibility</span>
                        </h2>

                        <div className={styles.problemGrid}>
                            <div className={styles.problemCard}>
                                <h3>Action Logging</h3>
                                <p>
                                    Every detection, decision, and response action is logged with
                                    full contextual metadata.
                                </p>
                            </div>

                            <div className={styles.problemCard}>
                                <h3>Change Tracking</h3>
                                <p>
                                    Configuration and policy changes are tracked and attributable
                                    to individual users.
                                </p>
                            </div>

                            <div className={styles.problemCard}>
                                <h3>Compliance Support</h3>
                                <p>
                                    Audit trails support compliance initiatives such as SOC 2,
                                    ISO 27001, and internal governance programs.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* RESPONSIBLE DISCLOSURE */}
                <section className={`${styles.trustSection} !py-20`}>
                    <div className={styles.container}>
                        <h2 className="text-3xl font-bold mb-6 text-white">Responsible Disclosure</h2>
                        <p className={`${styles.subtitle} mx-auto mb-8`}>
                            AhiLight maintains a responsible disclosure program and welcomes
                            reports from the security research community.
                        </p>

                        <div className={styles.ctaButtons + " justify-center"}>
                            {/* Note: Linking to Contact for now as disclosure policy page might not exist */}
                            <Link href="/contact" className={styles.btnOutline + " " + styles.btn}>
                                Report a Vulnerability
                            </Link>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className={`${styles.trustSection} bg-black/30`}>
                    <div className={styles.container}>
                        <h2 className="text-3xl font-bold mb-4">Build security with confidence</h2>
                        <p className={`${styles.subtitle} mx-auto mb-8`}>
                            Learn how CyberFortress fits into your security and compliance
                            strategy.
                        </p>
                        <div className={styles.ctaButtons + " justify-center"}>
                            <Link href="/products/cyberfortress/demo" className={styles.btnPrimary + " " + styles.btn}>
                                Request Demo
                            </Link>
                            <Link href="/products/cyberfortress/use-cases" className={styles.btnOutline + " " + styles.btn}>
                                View Use Cases
                            </Link>
                            <Link href="/products/cyberfortress/architecture" className={styles.btnOutline + " " + styles.btn}>
                                Back to Architecture
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
