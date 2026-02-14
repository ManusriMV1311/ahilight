
import styles from '@/components/cyberfortress/CyberFortress.module.css';
import Link from 'next/link';
import { Shield, Server, Box, Cpu, Activity, Share2, Layers } from 'lucide-react';

export default function CyberArchitecturePage() {
    return (
        <div className={styles.pageContainer}>
            <div className="pt-24 pb-20">
                <div className={styles.container}>
                    {/* Header */}
                    <div className="mb-16 text-center max-w-3xl mx-auto">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-red-500/30 bg-red-500/10 text-red-500 text-xs font-mono uppercase tracking-widest mb-6">
                            <Activity className="w-3 h-3" />
                            System Architecture
                        </div>
                        <h1 className="text-5xl font-bold text-white mb-6">
                            Modular Defense Architecture
                        </h1>
                        <p className="text-xl text-neutral-400">
                            A layered approach to autonomous security, decoupling detection from decision-making for maximum control and auditability.
                        </p>
                    </div>

                    {/* Visual Architecture Diagram */}
                    <div className="mb-24 relative">
                        {/* Connecting Lines (Simulated with absolute divs for now) */}
                        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-900/50 to-transparent -z-10"></div>

                        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center relative z-10">
                            {/* Layer 1 */}
                            <div className={`${styles.bentoCard} bg-black/80 !border-red-900/30 flex flex-col items-center text-center !p-6`}>
                                <div className="p-3 bg-red-900/10 rounded-full mb-4 text-red-500 rounded border border-red-900/30">
                                    <Server className="w-6 h-6" />
                                </div>
                                <h4 className="text-white font-bold mb-2">Ingestion</h4>
                                <p className="text-xs text-neutral-500">Normalizes telemetry from endpoints, network & cloud.</p>
                            </div>

                            {/* Layer 2 */}
                            <div className={`${styles.bentoCard} bg-black/80 !border-red-900/30 flex flex-col items-center text-center !p-6`}>
                                <div className="p-3 bg-red-900/10 rounded-full mb-4 text-red-500 rounded border border-red-900/30">
                                    <Share2 className="w-6 h-6" />
                                </div>
                                <h4 className="text-white font-bold mb-2">Correlation</h4>
                                <p className="text-xs text-neutral-500">Links related events to form high-fidelity incidents.</p>
                            </div>

                            {/* Core - The Brain */}
                            <div className="relative flex flex-col items-center justify-center">
                                <div className="w-32 h-32 rounded-full border-2 border-red-500 shadow-[0_0_50px_rgba(255,51,51,0.4)] bg-black flex items-center justify-center relative z-20">
                                    <Cpu className="w-12 h-12 text-white animate-pulse" />
                                </div>
                                <div className="mt-4 text-center">
                                    <h4 className="text-red-500 font-bold uppercase tracking-widest text-sm">Decision Engine</h4>
                                </div>
                            </div>

                            {/* Layer 3 */}
                            <div className={`${styles.bentoCard} bg-black/80 !border-red-900/30 flex flex-col items-center text-center !p-6`}>
                                <div className="p-3 bg-red-900/10 rounded-full mb-4 text-red-500 rounded border border-red-900/30">
                                    <Shield className="w-6 h-6" />
                                </div>
                                <h4 className="text-white font-bold mb-2">Policies</h4>
                                <p className="text-xs text-neutral-500">Matches risk against defined autonomy policies.</p>
                            </div>

                            {/* Layer 4 */}
                            <div className={`${styles.bentoCard} bg-black/80 !border-red-900/30 flex flex-col items-center text-center !p-6`}>
                                <div className="p-3 bg-red-900/10 rounded-full mb-4 text-red-500 rounded border border-red-900/30">
                                    <Layers className="w-6 h-6" />
                                </div>
                                <h4 className="text-white font-bold mb-2">Response</h4>
                                <p className="text-xs text-neutral-500">Executes containment actions across the stack.</p>
                            </div>
                        </div>
                    </div>


                    {/* Deep Dive Grid */}
                    <div className={styles.bentoGrid}>
                        <div className={`${styles.bentoCard} ${styles.colSpan6}`}>
                            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                <Box className="w-5 h-5 text-red-500" />
                                Untrusted Ingestion Layer
                            </h3>
                            <p className="text-neutral-400 text-sm">
                                All incoming data is treated as untrusted until validated. The ingestion layer handles parsing, normalization, and semantic enrichment without executing any payloads.
                            </p>
                        </div>
                        <div className={`${styles.bentoCard} ${styles.colSpan6}`}>
                            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                <Activity className="w-5 h-5 text-red-500" />
                                Atomic Decision Units
                            </h3>
                            <p className="text-neutral-400 text-sm">
                                Decisions are made by independent, stateless units that evaluate specific risk vectors (e.g., File Integrity, User Behavior), ensuring isolation and speed.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
