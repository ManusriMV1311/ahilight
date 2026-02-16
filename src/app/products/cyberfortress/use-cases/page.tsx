
'use client';

import styles from '@/features/cyberfortress/components/CyberFortress.module.css';
import Link from 'next/link';
import { Shield, Activity, Layers, Zap, Scale, ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

const useCases = [
    {
        id: 'soc',
        badge: 'SOC OPS',
        title: 'SOC Operations & Alert Fatigue',
        description: 'CyberFortress correlates high volumes of security alerts into fewer, higher-confidence incidents, allowing SOC teams to focus on what matters most.',
        points: ['Noise reduction through correlation', 'Context-rich incident grouping', 'Analyst-driven escalation control'],
        icon: Activity,
        color: 'text-red-500',
        borderColor: 'border-red-500/30',
        glow: 'shadow-[0_0_30px_rgba(220,38,38,0.1)]'
    },
    {
        id: 'infra',
        badge: 'INFRASTRUCTURE',
        title: 'Cloud & Hybrid Security',
        description: 'Designed to operate across cloud native, on-prem, and hybrid environments while maintaining consistent policy enforcement across all assets.',
        points: ['Multi-cloud telemetry ingestion', 'Identity and access context', 'Unified response orchestration'],
        icon: Layers,
        color: 'text-red-500',
        borderColor: 'border-red-500/30',
        glow: 'shadow-[0_0_30px_rgba(220,38,38,0.1)]'
    },
    {
        id: 'response',
        badge: 'RESPONSE',
        title: 'Incident Response & Containment',
        description: 'Enables rapid, controlled response actions to contain threats while preserving analyst oversight and streamlined approval workflows.',
        points: ['Policy based response actions', 'Human-in-the-loop approvals', 'Rollback and recovery support'],
        icon: Zap,
        color: 'text-red-500',
        borderColor: 'border-red-500/30',
        glow: 'shadow-[0_0_30px_rgba(220,38,38,0.1)]'
    },
    {
        id: 'grc',
        badge: 'COMPLIANCE',
        title: 'Compliance-Driven Environments',
        description: 'Supports organizations operating under strict regulatory requirements by providing full transparency, auditability, and governance.',
        points: ['Comprehensive audit trails', 'Change tracking and attribution', 'Alignment with SOC 2 / ISO'],
        icon: Scale,
        color: 'text-red-500',
        borderColor: 'border-red-500/30',
        glow: 'shadow-[0_0_30px_rgba(220,38,38,0.1)]'
    }
];

import { DataTunnel } from '@/components/backgrounds/premium/DataTunnel';

export default function CyberUseCasesPage() {
    return (
        <div className="min-h-screen text-white font-sans overflow-hidden relative">
            {/* 3D Background */}
            <div className="fixed inset-0 z-0 opacity-50 pointer-events-none">
                <DataTunnel />
            </div>

            <div className="pt-6 relative z-10 pb-20">
                {/* HERO */}
                <section className={`${styles.hero} !pb-20 !pt-6 md:!pt-12 text-center`}>
                    <div className={styles.container}>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-red-500/30 bg-red-500/10 text-red-500 text-xs font-mono uppercase tracking-widest mb-6">
                            <Layers className="w-3 h-3" />
                            Use Cases
                        </div>
                        <h1 className={`${styles.heroContent} text-4xl md:text-6xl font-bold font-heading mb-6 mt-4`}>
                            Operational Workflows
                        </h1>
                        <p className={styles.subtitle + " mx-auto"}>
                            From detection to response, see how CyberFortress integrates into
                            your security ecosystem to drive autonomy.
                        </p>
                    </div>
                </section>

                {/* TIMELINE SECTION */}
                <div className="max-w-6xl mx-auto px-4 relative">
                    {/* Central Line */}
                    <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-white/10 md:-translate-x-1/2 hidden md:block">
                        <motion.div
                            className="w-full h-[200px] bg-gradient-to-b from-transparent via-red-500 to-transparent"
                            animate={{ top: ['-20%', '120%'] }}
                            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                            style={{ position: 'absolute' }}
                        />
                    </div>

                    <div className="space-y-12 md:space-y-24 relative">
                        {useCases.map((useCase, index) => (
                            <motion.div
                                key={useCase.id}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className={`flex flex-col md:flex-row gap-8 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
                            >
                                {/* TEXT CONTENT */}
                                <div className="flex-1 w-full md:w-1/2">
                                    <div className="p-0 md:p-4 group relative">
                                        <div className="flex items-center justify-between mb-4">
                                            <span className={`text-xs font-mono uppercase tracking-wider ${useCase.color} px-2 py-1 rounded bg-white/5 border border-white/5`}>
                                                {useCase.badge}
                                            </span>
                                            <useCase.icon className={`w-6 h-6 ${useCase.color}`} />
                                        </div>
                                        <h3 className="text-2xl font-bold font-heading mb-3 text-white group-hover:text-red-400 transition-colors">
                                            {useCase.title}
                                        </h3>
                                        <p className="text-neutral-400 mb-6 text-sm leading-relaxed">
                                            {useCase.description}
                                        </p>
                                        <ul className="space-y-3">
                                            {useCase.points.map((point, i) => (
                                                <li key={i} className="flex items-start gap-3 text-sm text-neutral-300">
                                                    <CheckCircle2 className={`w-4 h-4 mt-0.5 ${useCase.color} opacity-80`} />
                                                    <span>{point}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                {/* CENTER NODE (Desktop Only) */}
                                <div className="hidden md:flex items-center justify-center w-12 h-12 relative z-10 shrink-0">
                                    <div className={`w-4 h-4 rounded-full ${useCase.color.replace('text-', 'bg-')} shadow-[0_0_15px_currentColor] ring-4 ring-black`} />
                                </div>

                                {/* EMPTY SPACE for alternating alignment */}
                                <div className="flex-1 hidden md:block" />
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <section className={`${styles.trustSection} mt-24`}>
                    <div className={styles.container}>
                        <h2 className="text-3xl font-bold mb-4">Ready to automate your defense?</h2>
                        <p className={`${styles.subtitle} mx-auto mb-8`}>
                            Join the organizations securing their future with CyberFortress.
                        </p>
                        <div className={styles.ctaButtons + " justify-center"}>
                            <Link href="/products/cyberfortress/demo" className="btn-premium-dark flex items-center gap-2">
                                Request Demo <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
