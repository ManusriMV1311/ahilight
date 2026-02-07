"use client";

import { CircuitBoardBackground } from "@/components/backgrounds/CircuitBoardBackground";
import { Section } from "@/components/ui/section";
import { Cpu, Network, Lock, Code2 } from "lucide-react";
import { motion } from "framer-motion";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";

export default function TechnologyPage() {
    return (
        <div className="flex flex-col gap-0 relative">
            <CircuitBoardBackground />

            {/* Hero Section */}
            <Section background="transparent" className="pt-24 pb-12 md:pt-28 md:pb-16 lg:pt-32 lg:pb-20 relative z-10">
                <div className="text-center max-w-4xl mx-auto">
                    <div className="mb-6">
                        <TypewriterEffect
                            words={[
                                { text: "Powered", className: "text-white font-heading" },
                                { text: "by", className: "text-white font-heading" },
                                { text: "Advanced", className: "text-transparent bg-clip-text bg-gradient-to-r from-electric-blue to-cyan-accent pb-2 font-heading" },
                                { text: "Research", className: "text-transparent bg-clip-text bg-gradient-to-r from-electric-blue to-cyan-accent pb-2 font-heading" },
                            ]}
                            className="text-5xl md:text-7xl font-bold tracking-tight inline-block py-4 leading-tight font-heading"
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

            {/* Tech Stack Grid - Circuit Board Style */}
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
                        <CircuitCard key={i} tech={tech} index={i} />
                    ))}
                </div>
            </Section>
        </div>
    );
}

function CircuitCard({ tech, index }: { tech: any; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
                duration: 0.6,
                delay: index * 0.15,
                type: "spring",
                stiffness: 100
            }}
            whileHover={{
                scale: 1.02,
                transition: { duration: 0.2 }
            }}
            className="group relative"
        >
            {/* Main Card */}
            <div className="relative bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-md rounded-xl p-8 overflow-hidden border border-cyan-500/20 shadow-[0_0_30px_rgba(0,242,255,0.1)] hover:shadow-[0_0_50px_rgba(0,242,255,0.3)] transition-all duration-300">

                {/* Circuit trace decoration */}
                <svg className="absolute inset-0 w-full h-full opacity-30 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id={`gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" style={{ stopColor: '#00F2FF', stopOpacity: 0.3 }} />
                            <stop offset="100%" style={{ stopColor: '#7D5FFF', stopOpacity: 0.3 }} />
                        </linearGradient>
                    </defs>
                    {/* Border traces */}
                    <rect x="2" y="2" width="calc(100% - 4px)" height="calc(100% - 4px)" fill="none" stroke={`url(#gradient-${index})`} strokeWidth="1" rx="10" />
                    {/* Inner circuit paths */}
                    <path d="M 20 20 L 60 20 L 60 40 M 60 20 L 100 20" stroke="#00F2FF" strokeWidth="1" fill="none" opacity="0.3" />
                    <path d="M 20 60 L 40 60 L 40 80 L 70 80" stroke="#00F2FF" strokeWidth="1" fill="none" opacity="0.3" />
                </svg>

                {/* Animated electricity flow */}
                <motion.div
                    className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-transparent via-cyan-400 to-transparent"
                    animate={{
                        y: ['-100%', '200%'],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.3,
                        ease: "linear"
                    }}
                />

                {/* Corner circuit nodes */}
                <div className="absolute top-3 left-3 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(0,242,255,0.8)]"></div>
                <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(0,242,255,0.8)]"></div>
                <div className="absolute bottom-3 left-3 w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_8px_rgba(125,95,255,0.8)]"></div>
                <div className="absolute bottom-3 right-3 w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_8px_rgba(125,95,255,0.8)]"></div>

                {/* Content */}
                <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-4">
                        <motion.div
                            className="w-14 h-14 rounded-lg bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center border border-cyan-500/40 shadow-[0_0_15px_rgba(0,242,255,0.3)]"
                            whileHover={{
                                rotate: 360,
                                transition: { duration: 0.6 }
                            }}
                        >
                            <tech.icon className="w-7 h-7 text-cyan-400" />
                        </motion.div>
                        <h3 className="text-2xl font-bold text-white">{tech.title}</h3>
                    </div>

                    <p className="text-slate-300 leading-relaxed">
                        {tech.desc}
                    </p>
                </div>

                {/* Hover glow overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/0 via-cyan-500/0 to-purple-500/0 group-hover:from-cyan-500/5 group-hover:via-purple-500/5 group-hover:to-cyan-500/5 transition-all duration-500 pointer-events-none rounded-xl"></div>
            </div>
        </motion.div>
    );
}
