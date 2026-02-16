"use client"

import { motion } from "framer-motion"
import { FlaskConical, Scale, Zap, ShieldCheck } from "lucide-react"
import { Section } from "@/components/ui/section"
import { Card } from "@/components/ui/card"

const solutions = [
    {
        icon: FlaskConical,
        title: "Research-First",
        description: "We solve hard problems through fundamental research, not by assembling off-the-shelf components.",
        stat: "Deep Tech",
    },
    {
        icon: Scale,
        title: "Domain Agnostic",
        description: "Building scalable architectures that apply across security, infrastructure, and logistics.",
        stat: "Universal Core",
    },
    {
        icon: Zap,
        title: "First-Principles",
        description: "Engineered from the ground up for performance, resilience, and absolute correctness.",
        stat: "High Performance",
    },
    {
        icon: ShieldCheck,
        title: "Mission Critical",
        description: "Designed for environments where failure is not an option and trust is non-negotiable.",
        stat: "Enterprise Grade",
    },
]

export function SolutionOverview() {
    return (
        <Section background="default" className="pt-0">
            <div className="text-center max-w-3xl mx-auto mb-20">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-heading">
                    Research-Backed. <br />
                    <span className="text-cyan-accent">Engineering-Driven.</span>
                </h2>
                <p className="text-slate-400 text-lg">
                    We build the foundational software systems that power the next generation of enterprise autonomy.
                </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {solutions.map((item, idx) => (
                    <motion.div
                        key={item.title}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                    >
                        <Card className="h-full p-8 bg-gradient-to-br from-white/10 to-transparent border-white/10 hover:border-electric-blue/50 group">
                            <div className="w-14 h-14 bg-gradient-to-br from-electric-blue to-cyan-accent rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                                <item.icon className="w-7 h-7 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                            <p className="text-slate-400 mb-8 leading-relaxed h-[72px]">{item.description}</p>

                            <div className="pt-6 border-t border-white/5">
                                <p className="text-cyan-accent font-mono font-bold text-lg">{item.stat}</p>
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </Section>
    )
}
