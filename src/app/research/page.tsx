"use client";

import { CodeMatrixBackground } from "@/components/backgrounds/CodeMatrixBackground";
import { Section } from "@/components/ui/section";
import { Terminal, Cpu, Shield, Database, ChevronRight, Play } from "lucide-react";
import { motion } from "framer-motion";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import { GlareCard } from "@/components/ui/glare-card";
import { Button } from "@/components/ui/button";

export default function ResearchPage() {
    return (
        <div className="flex flex-col gap-0 min-h-screen relative overflow-hidden bg-deep-navy">
            <CodeMatrixBackground />

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
                                { text: "Pioneering", className: "text-white font-mono" },
                                { text: "New", className: "text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 pb-2 font-mono" },
                                { text: "Frontiers", className: "text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 pb-2 font-mono" },
                            ]}
                            className="text-5xl md:text-7xl font-bold tracking-tight inline-block py-4 leading-tight font-mono"
                            cursorClassName="bg-cyan-500 h-10 md:h-16 w-[4px]"
                        />
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-mono"
                    >
                        <span className="text-cyan-500 mr-2">$</span>
                        We share our findings to advance the state of enterprise software engineering.
                        <span className="animate-pulse ml-1 inline-block w-2.5 h-5 bg-cyan-500 align-middle"></span>
                    </motion.p>
                </div>
            </Section>

            {/* Research Papers Grid - Terminal Theme */}
            <Section className="relative z-10 pb-32">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto px-4">
                    {[
                        {
                            title: "Optimizing Event Sourcing at Scale",
                            category: "Technical Whitepaper",
                            desc: "A deep dive into reducing latency in event-driven architectures using optimistic concurrency controls.",
                            icon: Database,
                            cmd: "run optimization.sh"
                        },
                        {
                            title: "The Future of Autonomous Cyber-Defense",
                            category: "Technical Whitepaper",
                            desc: "Exploring the role of generative agents in identifying and neutralizing zero-day exploits.",
                            icon: Shield,
                            cmd: "g++ defense_v2.cpp"
                        },
                        {
                            title: "Data Sovereignty in Multi-Cloud",
                            category: "Technical Whitepaper",
                            desc: "Strategies for maintaining compliance and control over data resident in disparate public cloud infrastructures.",
                            icon: Terminal,
                            cmd: "sudo access_control --audit"
                        }
                    ].map((paper, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.6 }}
                            className="h-full"
                        >
                            <GlareCard className="flex flex-col h-full bg-[#0d1117]/80 backdrop-blur-xl border border-slate-700/50 p-0 relative overflow-hidden group hover:border-cyan-500/50 transition-colors duration-500">
                                {/* Terminal Header */}
                                <div className="h-10 bg-slate-800/50 border-b border-white/5 flex items-center px-4 space-x-2 w-full">
                                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                                    <div className="ml-4 text-xs font-mono text-slate-400 flex items-center">
                                        <Terminal className="w-3 h-3 mr-2" />
                                        bash
                                    </div>
                                </div>

                                <div className="h-full w-full p-6 flex flex-col relative z-10 font-mono">
                                    {/* Command Line Input Effect */}
                                    <div className="flex items-center text-sm mb-6 text-cyan-400/80 bg-black/20 p-2 rounded border border-white/5">
                                        <ChevronRight className="w-4 h-4 mr-1" />
                                        <span className="opacity-70">user@ahilight:~$</span>
                                        <span className="ml-2 text-white">{paper.cmd}</span>
                                    </div>

                                    <div className="flex items-center space-x-3 mb-4">
                                        <div className="p-2 bg-slate-800 rounded-lg group-hover:bg-cyan-500/20 group-hover:text-cyan-400 transition-colors">
                                            <paper.icon className="w-6 h-6" />
                                        </div>
                                        <h4 className="text-xs uppercase tracking-widest text-slate-500 font-semibold">{paper.category}</h4>
                                    </div>

                                    <h3 className="text-xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors">
                                        {paper.title}
                                    </h3>

                                    <p className="text-slate-400 leading-relaxed text-sm mb-8 flex-grow">
                                        // {paper.desc}
                                    </p>

                                    {/* Compile Progress Bar Animation */}
                                    <div className="relative mt-auto">
                                        <div className="flex justify-between text-xs text-slate-500 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <span>COMPILING...</span>
                                            <span>100%</span>
                                        </div>
                                        <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                                            <div className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 w-0 group-hover:w-full transition-all duration-[1.5s] ease-in-out" />
                                        </div>

                                        <Button
                                            variant="ghost"
                                            className="w-full mt-4 border border-slate-700 hover:bg-cyan-500/10 hover:text-cyan-400 hover:border-cyan-500/50 text-slate-300 font-mono text-xs uppercase tracking-wider"
                                        >
                                            <Play className="w-3 h-3 mr-2" />
                                            Execute
                                        </Button>
                                    </div>
                                </div>
                            </GlareCard>
                        </motion.div>
                    ))}
                </div>
            </Section>
        </div>
    );
}
