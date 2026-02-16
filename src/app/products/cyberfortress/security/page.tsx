
import styles from '@/features/cyberfortress/components/CyberFortress.module.css';
import Link from 'next/link';
import { CyberBackground } from '@/features/cyberfortress/components/new/CyberBackground';
import { Shield, Lock, Eye, FileCheck, Server, Users, Activity, FileText, Fingerprint, Cloud, Scale } from 'lucide-react';

export default function CyberSecurityPage() {
    return (
        <div className={styles.pageContainer}>
            <CyberBackground />
            <div className="pt-6">
                {/* HERO */}
                <section className={`${styles.hero} !pb-20 !pt-6 md:!pt-12`}>
                    <div className={styles.container}>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-red-500/30 bg-red-500/10 text-red-500 text-xs font-mono uppercase tracking-widest mb-6">
                            <Shield className="w-3 h-3" />
                            Security Model
                        </div>
                        <h1 className={`${styles.heroContent} text-3xl md:text-5xl font-bold font-heading mb-6 mt-4`}>
                            Security by design, not by assumption
                        </h1>
                        <p className={styles.subtitle}>
                            CyberFortress is built with a defense in depth approach that
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

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className={styles.bentoCard}>
                                <div className="p-3 bg-red-600/10 rounded-lg w-fit mb-4 text-red-500 border border-red-500/20">
                                    <Fingerprint className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">Least Privilege</h3>
                                <p className="text-neutral-400 text-sm">
                                    Access is granted strictly on a need-to-know basis using
                                    role based access control and scoped permissions.
                                </p>
                            </div>

                            <div className={styles.bentoCard}>
                                <div className="p-3 bg-red-600/10 rounded-lg w-fit mb-4 text-red-500 border border-red-500/20">
                                    <Users className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">Human Authorization</h3>
                                <p className="text-neutral-400 text-sm">
                                    High impact actions require explicit human approval to prevent
                                    unintended consequences.
                                </p>
                            </div>

                            <div className={styles.bentoCard}>
                                <div className="p-3 bg-red-600/10 rounded-lg w-fit mb-4 text-red-500 border border-red-500/20">
                                    <Shield className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">Defense in Depth</h3>
                                <p className="text-neutral-400 text-sm">
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
                                confidentiality, integrity, and availability.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className={styles.bentoCard}>
                                <div className="p-3 bg-red-600/10 rounded-lg w-fit mb-4 text-red-500 border border-red-500/20">
                                    <Server className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">Data Isolation</h3>
                                <p className="text-neutral-400 text-sm">
                                    Customer data is logically isolated per tenant and per
                                    deployment environment.
                                </p>
                            </div>

                            <div className={styles.bentoCard}>
                                <div className="p-3 bg-red-600/10 rounded-lg w-fit mb-4 text-red-500 border border-red-500/20">
                                    <Lock className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">Encryption</h3>
                                <p className="text-neutral-400 text-sm">
                                    Data is encrypted in transit and at rest using industry
                                    standard cryptographic controls.
                                </p>
                            </div>

                            <div className={styles.bentoCard}>
                                <div className="p-3 bg-red-600/10 rounded-lg w-fit mb-4 text-red-500 border border-red-500/20">
                                    <FileCheck className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">Minimal Retention</h3>
                                <p className="text-neutral-400 text-sm">
                                    Only required security telemetry is retained, following
                                    customer-defined retention policies.
                                </p>
                            </div>

                            <div className={styles.bentoCard}>
                                <div className="p-3 bg-red-600/10 rounded-lg w-fit mb-4 text-red-500 border border-red-500/20">
                                    <Cloud className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">Customer Deployment</h3>
                                <p className="text-neutral-400 text-sm">
                                    Supports on premises and isolated cloud deployments to meet
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

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className={styles.bentoCard}>
                                <div className="p-3 bg-red-600/10 rounded-lg w-fit mb-4 text-red-500 border border-red-500/20">
                                    <Activity className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">Action Logging</h3>
                                <p className="text-neutral-400 text-sm">
                                    Every detection, decision, and response action is logged with
                                    full contextual metadata.
                                </p>
                            </div>

                            <div className={styles.bentoCard}>
                                <div className="p-3 bg-red-600/10 rounded-lg w-fit mb-4 text-red-500 border border-red-500/20">
                                    <FileText className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">Change Tracking</h3>
                                <p className="text-neutral-400 text-sm">
                                    Configuration and policy changes are tracked and attributable
                                    to individual users.
                                </p>
                            </div>

                            <div className={styles.bentoCard}>
                                <div className="p-3 bg-red-600/10 rounded-lg w-fit mb-4 text-red-500 border border-red-500/20">
                                    <Scale className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">Compliance Support</h3>
                                <p className="text-neutral-400 text-sm">
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
                            <Link href="/contact" className="btn-premium-outline">
                                Report a Vulnerability
                            </Link>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className={`${styles.trustSection}`}>
                    <div className={styles.container}>
                        <h2 className="text-3xl font-bold mb-4">Build security with confidence</h2>
                        <p className={`${styles.subtitle} mx-auto mb-8`}>
                            Learn how CyberFortress fits into your security and compliance
                            strategy.
                        </p>
                        <div className={styles.ctaButtons + " justify-center"}>
                            <Link href="/products/cyberfortress/demo" className="btn-premium-dark">
                                Request Demo
                            </Link>
                            <Link href="/products/cyberfortress/use-cases" className="btn-premium-outline">
                                View Use Cases
                            </Link>
                            <Link href="/products/cyberfortress/architecture" className="btn-premium-outline">
                                Back to Architecture
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
