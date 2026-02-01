"use client"

import { Database, Layers, Workflow } from "lucide-react"
import { motion } from "framer-motion"
import { Section } from "@/components/ui/section"
import { Card } from "@/components/ui/card"
import { TypewriterText } from "@/components/ui/typewriter-text"

const problems = [
    {
        icon: Layers,
        title: "Operational Complexity",
        description: "Enterprise systems have become too complex for human-scale management, creating operational friction and inefficiency.",
    },
    {
        icon: Database,
        title: "Data Silos",
        description: "Critical intelligence is trapped in disconnected operational silos, preventing unified decision-making.",
    },
    {
        icon: Workflow,
        title: "Fragile Infrastructure",
        description: "Legacy infrastructure lacks the resilience required for next-generation automated workflows.",
    },
]

export function ProblemStatement() {
    return (
        <Section background="transparent" className="relative overflow-hidden">
            {/* Background Blob for depth */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[800px] h-[800px] bg-electric-blue/10 rounded-full blur-3xl pointer-events-none" />

            <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-12 leading-tight">
                        <TypewriterText text="The Fundamental Limit is" className="block" cursor={false} />
                        <span className="text-electric-blue">
                            <TypewriterText text="Human-Scale Operations" delay={1} />
                        </span>
                    </h2>

                    <div className="space-y-6">
                        {problems.map((problem, idx) => (
                            <motion.div
                                key={problem.title}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.2 }}
                            >
                                <Card className="p-6 flex items-start gap-4">
                                    <div className="p-3 rounded-lg bg-electric-blue/20 text-electric-blue group-hover:bg-white/20 group-hover:text-white transition-colors">
                                        <problem.icon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-white mb-2">{problem.title}</h3>
                                        <p className="text-slate-400 leading-relaxed group-hover:text-white/90 transition-colors">{problem.description}</p>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Right Side Visualization */}
                <div className="relative h-[600px] bg-gradient-to-br from-white/5 to-transparent rounded-2xl border border-white/10 flex items-center justify-center overflow-hidden backdrop-blur-sm">
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />

                    {/* Abstract Graph/Viz - representing connection/unification */}
                    <div className="relative z-10 text-center">
                        <div className="w-64 h-64 mx-auto mb-8 rounded-full border border-electric-blue/20 flex items-center justify-center relative">
                            <div className="absolute inset-0 border-t-4 border-r-4 border-electric-blue rounded-full animate-[spin_3s_linear_infinite]" />
                            <div className="absolute inset-8 border-b-4 border-cyan-accent/50 rounded-full animate-[spin_4s_linear_infinite_reverse]" />
                            <div className="text-5xl font-mono text-white font-bold tracking-tighter">100%</div>
                        </div>
                        <p className="text-slate-400 text-sm tracking-widest uppercase">System Unification</p>
                    </div>
                </div>
            </div>
        </Section>
    )
}
