"use client"

import { motion } from "framer-motion"
import { ScanSearch, Zap, Fingerprint, FileCode } from "lucide-react"
import { Section } from "@/components/ui/section"
import { Card } from "@/components/ui/card"

const features = [
    {
        icon: ScanSearch,
        title: "Behavioral Detection",
        description: "Move beyond signatures. Our graph neural networks identify malicious intent through behavioral anomalies in real-time.",
        stat: "99.9% Accuracy"
    },
    {
        icon: Zap,
        title: "Automated Response",
        description: "Isolate threats at machine speed. Policy-driven orchestration ensures instant mitigation without business disruption.",
        stat: "< 15ms Response"
    },
    {
        icon: Fingerprint,
        title: "Deception Engines",
        description: "Deploy dynamic honeypots that evolve with your infrastructure to lure and study advanced persistent threats.",
        stat: "Zero Day Capture"
    },
    {
        icon: FileCode,
        title: "Immutable Audit",
        description: "Every action, alert, and remediation is cryptographically signed and stored in a tamper-proof ledger.",
        stat: "Forensic Grade"
    }
]

export function CyberFortressValueProps() {
    return (
        <Section background="default" className="py-24">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 font-heading">
                        The World's Most Advanced <br />
                        <span className="text-cyan-accent">Defensive Architecture</span>
                    </h2>
                    <p className="text-slate-400 text-lg">
                        CyberFortress unifies detection, response, and resilience into a single, autonomous platform.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, i) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <Card className="h-full bg-white/5 border-white/10 hover:border-electric-blue/50 hover:bg-white/10 transition-all p-6 group">
                                <div className="w-12 h-12 bg-electric-blue/20 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <feature.icon className="w-6 h-6 text-electric-blue" />
                                </div>
                                <h3 className="text-lg font-bold text-white mb-3">{feature.title}</h3>
                                <p className="text-slate-400 text-sm leading-relaxed mb-6">{feature.description}</p>
                                <div className="mt-auto pt-4 border-t border-white/5">
                                    <div className="text-cyan-accent font-mono font-bold">{feature.stat}</div>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </Section>
    )
}
