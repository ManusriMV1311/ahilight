"use client";

import { TechnologyBackground } from "@/components/backgrounds/TechnologyBackground";
import { Section } from "@/components/ui/section";
import { Cpu, Network, Lock, Code2 } from "lucide-react";
import { motion } from "framer-motion";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import { GlareCard } from "@/components/ui/glare-card";

export default function TechnologyPage() {
    return (
        <div className="flex flex-col gap-0">
            <TechnologyBackground />
            {/* Hero Section */}
            <Section background="navy-gradient" className="pt-24 pb-12 md:pt-28 md:pb-16 lg:pt-32 lg:pb-20">
                <div className="text-center max-w-4xl mx-auto">
                    <div className="mb-6">
                        <TypewriterEffect
                            words={[
                                { text: "Powered", className: "text-white" },
                                { text: "by", className: "text-white" },
                                { text: "Advanced", className: "text-transparent bg-clip-text bg-gradient-to-r from-electric-blue to-cyan-accent pb-2" },
                                { text: "Research", className: "text-transparent bg-clip-text bg-gradient-to-r from-electric-blue to-cyan-accent pb-2" },
                            ]}
                            className="text-5xl md:text-7xl font-bold tracking-tight inline-block"
                            cursorClassName="bg-electric-blue"
                        />
                    </div>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-xl text-slate-300"
                    >
                        Our software is built upon proprietary algorithms in distributed computing and artificial intelligence.
                    </motion.p>
                </div>
            </Section>

            {/* Tech Stack Grid - Upgraded to GlareCards */}
            <Section className="relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
                    {[
                        {
                            title: "Distributed Ledger",
                            desc: "Trustless synchronization across fragmented networks using advanced consensus.",
                            icon: Network
                        },
                        {
                            title: "Neural Threat Detection",
                            desc: "AI models processing millions of signals per second to identify anomalies.",
                            icon: Cpu
                        },
                        {
                            title: "Zero-Knowledge",
                            desc: "Privacy by design. Computations on encrypted data without raw exposure.",
                            icon: Lock
                        },
                        {
                            title: "Polyglot Microservices",
                            desc: "Resilient mesh of Rust, Go, and TypeScript services.",
                            icon: Code2
                        }
                    ].map((tech, i) => (
                        <div key={i} className="flex justify-center">
                            <GlareCard className="flex flex-col items-center justify-center p-8 text-center bg-slate-900/60 backdrop-blur-md border border-white/10">
                                <tech.icon className="w-12 h-12 text-white mb-6" />
                                <h3 className="text-2xl font-bold text-white mb-4">{tech.title}</h3>
                                <p className="text-slate-200 leading-relaxed text-base">{tech.desc}</p>
                            </GlareCard>
                        </div>
                    ))}
                </div>
            </Section>
        </div>
    );
}
