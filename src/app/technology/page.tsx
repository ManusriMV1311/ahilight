"use client";

import { Section } from "@/components/ui/section";
import { Cpu, Network, Lock, Code2 } from "lucide-react";
import { motion } from "framer-motion";
import { TypewriterText } from "@/components/ui/typewriter-text";

export default function TechnologyPage() {
    return (
        <div className="flex flex-col gap-0">
            {/* Hero Section */}
            <Section background="navy-gradient" className="pt-32 pb-20">
                <div className="text-center max-w-4xl mx-auto">
                    <div className="mb-6">
                        <TypewriterText
                            text="Powered by "
                            className="text-5xl md:text-7xl font-bold tracking-tight text-white inline-block mr-4"
                            cursor={false}
                        />
                        <div className="inline-block">
                            <TypewriterText
                                text="Advanced Research"
                                delay={1}
                                cursor={true}
                                className="text-5xl md:text-7xl font-bold tracking-tight text-cyan-accent"
                            />
                        </div>
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

            {/* Tech Stack Grid */}
            <Section className="">
                <div className="grid md:grid-cols-2 gap-12">
                    {[
                        {
                            title: "Distributed Ledger Intelligence",
                            desc: "We utilize advanced consensus mechanisms to ensure data integrity across fragmented networks, enabling trustless synchronization.",
                            icon: Network
                        },
                        {
                            title: "Neural Threat Detection",
                            desc: "Our proprietary AI models process millions of signals per second to identify anomalies before they become breaches.",
                            icon: Cpu
                        },
                        {
                            title: "Zero-Knowledge Architecture",
                            desc: "Privacy by design. Our systems perform computations on encrypted data without ever exposing the raw information.",
                            icon: Lock
                        },
                        {
                            title: "Polyglot Microservices",
                            desc: "A resilient mesh of services written in Rust, Go, and TypeScript, optimized for low-latency performance.",
                            icon: Code2
                        }
                    ].map((tech, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.2 }}
                            className="flex gap-6"
                        >
                            <div className="p-4 rounded-xl bg-slate-800 text-electric-blue shrink-0 h-fit">
                                <tech.icon className="w-8 h-8" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-white mb-3">{tech.title}</h3>
                                <p className="text-slate-400 leading-relaxed text-lg">{tech.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </Section>
        </div>
    );
}
