"use client"

import { Clock, Layers, ShieldAlert } from "lucide-react"
import { motion } from "framer-motion"
import { Section } from "@/components/ui/section"
import { Card } from "@/components/ui/card"

const problems = [
    {
        icon: Clock,
        title: "Machines are faster",
        description: "By the time you see the alert, the data is already gone. Machine speed attacks require machine speed defense.",
    },
    {
        icon: Layers,
        title: "Your tools don't talk",
        description: "You have 30 point solutions. You are the glue. That's why you're burnout.",
    },
    {
        icon: ShieldAlert,
        title: "Waiting to get hit",
        description: "Most defenses wait for a signature. Adversaries don't wait for permission.",
    },
]

export function ProblemStatement() {
    return (
        <Section background="transparent" className="relative overflow-hidden pt-32">
            {/* Background Blob for depth */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[800px] h-[800px] bg-electric-blue/5 rounded-full blur-3xl pointer-events-none" />

            <div className="container mx-auto px-4">
                <div className="max-w-3xl mb-20 text-center md:text-left">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight font-heading">
                        It&apos;s not a skills gap. <br />
                        <span className="text-electric-blue">It&apos;s a noise gap.</span>
                    </h2>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {problems.map((problem, idx) => (
                        <motion.div
                            key={problem.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.2 }}
                        >
                            <Card className="p-8 h-full border border-white/10 bg-white/5 hover:bg-white/10 transition-colors group">
                                <div className="mb-6 p-4 rounded-xl bg-deep-navy w-fit border border-white/10 group-hover:border-electric-blue/50 transition-colors">
                                    <problem.icon className="w-8 h-8 text-electric-blue" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-4">{problem.title}</h3>
                                <p className="text-slate-400 leading-relaxed">
                                    {problem.description}
                                </p>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </Section>
    )
}
