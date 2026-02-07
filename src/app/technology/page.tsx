"use client";

import { NeuralNetworkBackground } from "@/components/backgrounds/NeuralNetworkBackground";
import { Section } from "@/components/ui/section";
import { Cpu, Network, Lock, Code2 } from "lucide-react";
import { motion } from "framer-motion";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import { GlareCard } from "@/components/ui/glare-card";

export default function TechnologyPage() {
    return (
        <div className="flex flex-col gap-0 min-h-screen relative overflow-hidden">
            <NeuralNetworkBackground />

            {/* Hero Section */}
            <Section background="transparent" className="pt-32 pb-16 md:pt-40 md:pb-24 relative z-10">
                <div className="text-center max-w-5xl mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="mb-8"
                    >
                        <TypewriterEffect
                            words={[
                                { text: "Powered", className: "text-white font-heading" },
                                { text: "by", className: "text-white font-heading" },
                                { text: "Neural", className: "text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-electric-blue pb-2 font-heading" },
                                { text: "Architecture", className: "text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-electric-blue pb-2 font-heading" },
                            ]}
                            className="text-5xl md:text-7xl font-bold tracking-tight inline-block py-4 leading-tight font-heading"
                            cursorClassName="bg-electric-blue"
                        />
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed"
                    >
                        Our systems mimic biological intelligence, processing millions of signals through a decentralized neural mesh.
                    </motion.p>
                </div>
            </Section>

            {/* Tech Stack Grid - Neural Nodes Theme */}
            <Section className="relative z-10 pb-32">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto px-4">
                    {[
                        {
                            title: "Distributed Ledger",
                            desc: "Trustless synchronization across fragmented networks using advanced consensus algorithms.",
                            icon: Network,
                            color: "from-cyan-500 to-blue-600"
                        },
                        {
                            title: "Neural Threat Detection",
                            desc: "AI models processing millions of signals per second to identify anomalies in real-time.",
                            icon: Cpu,
                            color: "from-purple-500 to-indigo-600"
                        },
                        {
                            title: "Zero-Knowledge Proofs",
                            desc: "Privacy by design. Validating computations on encrypted data without exposing raw information.",
                            icon: Lock,
                            color: "from-emerald-400 to-cyan-500"
                        },
                        {
                            title: "Polyglot Microservices",
                            desc: "A resilient mesh of Rust, Go, and TypeScript services independently scalable and fault-tolerant.",
                            icon: Code2,
                            color: "from-orange-400 to-red-500"
                        }
                    ].map((tech, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.6 }}
                            className="h-full"
                        >
                            <GlareCard className="flex flex-col h-full bg-navy-card/40 backdrop-blur-xl border border-white/10 p-1 relative overflow-hidden group">
                                {/* Glowing corner accents */}
                                <div className={`absolute top-0 left-0 w-20 h-20 bg-gradient-to-br ${tech.color} opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-500`} />
                                <div className={`absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl ${tech.color} opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-500`} />

                                <div className="h-full w-full bg-deep-navy/50 p-8 rounded-[14px] flex flex-col relative z-10">
                                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${tech.color} p-[1px] mb-6 shadow-lg shadow-${tech.color.split('-')[1]}-500/20 group-hover:scale-110 transition-transform duration-300`}>
                                        <div className="w-full h-full bg-deep-navy rounded-2xl flex items-center justify-center">
                                            <tech.icon className="w-7 h-7 text-white" />
                                        </div>
                                    </div>

                                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-300 transition-all">
                                        {tech.title}
                                    </h3>

                                    <div className="w-12 h-1 bg-gradient-to-r from-white/20 to-transparent rounded-full mb-4 group-hover:w-full group-hover:from-electric-blue group-hover:to-cyan-accent transition-all duration-500" />

                                    <p className="text-slate-300 leading-relaxed text-base">
                                        {tech.desc}
                                    </p>
                                </div>
                            </GlareCard>
                        </motion.div>
                    ))}
                </div>
            </Section>
        </div>
    );
}
