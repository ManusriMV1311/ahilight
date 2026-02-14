
import styles from '@/components/cyberfortress/CyberFortress.module.css';
import Link from 'next/link';
import { Shield, Eye, Brain, Zap, Lock, Activity, Server, Database, Network } from 'lucide-react';

export default function CyberFeaturesPage() {
    return (
        <div className={styles.pageContainer}>
            <div className="pt-24 pb-20">
                <div className={styles.container}>
                    {/* Header */}
                    <div className="mb-12 flex justify-between items-end">
                        <div className="max-w-2xl">
                            <div className={`${styles.statusIndicator} mb-4`}>
                                <span className={styles.statusDot}></span>
                                System Operational
                            </div>
                            <h1 className="text-5xl font-bold text-white mb-4">capabilities_overview</h1>
                            <p className="text-xl text-neutral-400">
                                Comprehensive autonomous security stack designed for machine-speed defense.
                            </p>
                        </div>
                        <div className="text-right hidden md:block">
                            <div className="text-sm text-neutral-500 font-mono">SEC-OPS-LEVEL-01</div>
                            <div className="text-2xl font-bold text-red-500">DEFCON 4</div>
                        </div>
                    </div>

                    {/* Bento Grid */}
                    <div className={styles.bentoGrid}>
                        {/* Core Engine - Large Card */}
                        <div className={`${styles.bentoCard} ${styles.colSpan8} ${styles.rowSpan2}`}>
                            <div className="absolute top-4 right-4 text-red-500/50">
                                <Database className="w-6 h-6" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">Unified Neural Engine</h3>
                            <p className="text-neutral-400 mb-6 max-w-lg">
                                The heart of CyberFortress. A centralized AI core that correlates signals from endpoints, network, and cloud to predict attacks before they happen.
                            </p>
                            <div className="mt-auto grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
                                <div>
                                    <div className="text-2xl font-bold text-white">4ms</div>
                                    <div className="text-xs text-neutral-500 uppercase tracking-wider">Analysis Time</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-white">100%</div>
                                    <div className="text-xs text-neutral-500 uppercase tracking-wider">Data Coverage</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-white">Zero</div>
                                    <div className="text-xs text-neutral-500 uppercase tracking-wider">Bias</div>
                                </div>
                            </div>
                        </div>

                        {/* Detection */}
                        <div className={`${styles.bentoCard} ${styles.colSpan4}`}>
                            <div className="flex items-center gap-3 mb-4">
                                <Eye className="w-5 h-5 text-red-500" />
                                <h3 className="text-lg font-bold text-white">Omni-Channel Vision</h3>
                            </div>
                            <p className="text-sm text-neutral-400">
                                Ingests telemetry from everywhere: EDR, NDR, Cloud Logs, and IDPs. No blind spots.
                            </p>
                        </div>

                        {/* Response */}
                        <div className={`${styles.bentoCard} ${styles.colSpan4}`}>
                            <div className="flex items-center gap-3 mb-4">
                                <Zap className="w-5 h-5 text-red-500" />
                                <h3 className="text-lg font-bold text-white">Autonomous Response</h3>
                            </div>
                            <p className="text-sm text-neutral-400">
                                Executes containment actions instantly. Isolates infected hosts and blocks malicious IPs.
                            </p>
                        </div>

                        {/* Behavior */}
                        <div className={`${styles.bentoCard} ${styles.colSpan4}`}>
                            <div className="flex items-center gap-3 mb-4">
                                <Brain className="w-5 h-5 text-red-500" />
                                <h3 className="text-lg font-bold text-white">Behavioral Profiling</h3>
                            </div>
                            <p className="text-sm text-neutral-400">
                                Learns "normal" for every user and device. Flags deviations instantly with high fidelity.
                            </p>
                        </div>

                        {/* Orchestration */}
                        <div className={`${styles.bentoCard} ${styles.colSpan4}`}>
                            <div className="flex items-center gap-3 mb-4">
                                <Network className="w-5 h-5 text-red-500" />
                                <h3 className="text-lg font-bold text-white">Cross-Stack Sync</h3>
                            </div>
                            <p className="text-sm text-neutral-400">
                                Coordinates defense across your entire stack. Firewall, Identity, and Cloud work as one.
                            </p>
                        </div>

                        {/* Governance */}
                        <div className={`${styles.bentoCard} ${styles.colSpan4}`}>
                            <div className="flex items-center gap-3 mb-4">
                                <Lock className="w-5 h-5 text-red-500" />
                                <h3 className="text-lg font-bold text-white">Governance & Audit</h3>
                            </div>
                            <p className="text-sm text-neutral-400">
                                Every autonomous decision is logged, explainable, and fully auditable for compliance.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
