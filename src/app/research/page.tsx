"use client";

import { ResearchDNABackground } from "@/components/backgrounds/ResearchDNABackground";
import { Section } from "@/components/ui/section";
import { FileText, Microscope, FlaskConical, Atom, Download, LockKeyhole } from "lucide-react";
import { motion } from "framer-motion";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import { GlareCard } from "@/components/ui/glare-card";
import { Button } from "@/components/ui/button";

export default function ResearchPage() {
    return (
        <div className="flex flex-col gap-0 min-h-screen relative overflow-hidden">
            <ResearchDNABackground />

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
                                { text: "Pioneering", className: "text-white font-heading" },
                                { text: "New", className: "text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 pb-2 font-heading" },
                                { text: "Frontiers", className: "text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 pb-2 font-heading" },
                            ]}
                            className="text-5xl md:text-7xl font-bold tracking-tight inline-block py-4 leading-tight font-heading"
                            cursorClassName="bg-purple-500"
                        />
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed"
                    >
                        We share our findings to advance the state of enterprise software engineering.
                    </motion.p>
                </div>
            </Section>

            {/* Research Papers Grid */}
            <Section className="relative z-10 pb-32">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto px-4">
                    {[
                        {
                            title: "Optimizing Event Sourcing at Scale",
                            category: "Technical Whitepaper",
                            desc: "A deep dive into reducing latency in event-driven architectures using optimistic concurrency controls.",
                            readTime: "Jan 2026",
                            icon: Atom,
                            color: "from-purple-500 to-indigo-600"
                        },
                        {
                            title: "The Future of Autonomous Cyber-Defense",
                            category: "Technical Whitepaper",
                            desc: "Exploring the role of generative agents in identifying and neutralizing zero-day exploits.",
                            readTime: "Nov 2025",
                            icon: LockKeyhole,
                            color: "from-cyan-500 to-blue-600"
                        },
                        {
                            title: "Data Sovereignty in Multi-Cloud",
                            category: "Technical Whitepaper",
                            desc: "Strategies for maintaining compliance and control over data resident in disparate public cloud infrastructures.",
                            readTime: "Sep 2025",
                            icon: Microscope,
                            color: "from-emerald-500 to-teal-600"
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
                            <GlareCard className="flex flex-col h-full bg-navy-card/40 backdrop-blur-xl border border-white/10 p-1 relative overflow-hidden group">

                                <div className={`absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr ${paper.color} opacity-10 blur-2xl group-hover:opacity-30 transition-opacity duration-500`} />

                                <div className="h-full w-full bg-deep-navy/60 p-8 rounded-[14px] flex flex-col relative z-10">
                                    <div className="flex items-start justify-between mb-6">
                                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${paper.color} p-[1px] shadow-lg`}>
                                            <div className="w-full h-full bg-deep-navy rounded-xl flex items-center justify-center">
                                                <paper.icon className="w-6 h-6 text-white" />
                                            </div>
                                        </div>

                                    </div>

                                    <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-2">{paper.category}</h4>

                                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-300 transition-all">
                                        {paper.title}
                                    </h3>

                                    <p className="text-slate-300 leading-relaxed text-base mb-8 flex-grow">
                                        {paper.desc}
                                    </p>

                                    <Button variant="outline" className="w-full border-white/10 hover:bg-white/5 hover:text-white group-hover:border-white/30 transition-all">
                                        <FileText className="w-4 h-4 mr-2" />
                                        Read Paper
                                    </Button>
                                </div>
                            </GlareCard>
                        </motion.div>
                    ))}
                </div>
            </Section>
        </div>
    );
}
