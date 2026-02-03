"use client";

import { ResearchBackground } from "@/components/backgrounds/ResearchBackground";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { FileText, Download } from "lucide-react";
import { motion } from "framer-motion";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";

export default function ResearchPage() {
    return (
        <div className="flex flex-col gap-0">
            <ResearchBackground />
            {/* Hero Section */}
            <Section background="navy-gradient" className="pt-24 pb-12 md:pt-28 md:pb-16 lg:pt-32 lg:pb-20">
                <div className="text-center max-w-4xl mx-auto">
                    <div className="mb-6">
                        <TypewriterEffect
                            words={[
                                { text: "Pioneering", className: "text-white" },
                                { text: "New", className: "text-electric-blue" },
                                { text: "Frontiers", className: "text-electric-blue" },
                            ]}
                            className="text-5xl md:text-7xl font-bold tracking-tight"
                            cursorClassName="bg-electric-blue"
                        />
                    </div>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-xl text-slate-300"
                    >
                        We share our findings to advance the state of enterprise software engineering.
                    </motion.p>
                </div>
            </Section>

            {/* Publications List */}
            <Section className="">
                <div className="max-w-4xl mx-auto space-y-6">
                    {[
                        {
                            title: "Optimizing Event Sourcing at Scale",
                            date: "Jan 2026",
                            abstract: "A deep dive into reducing latency in event-driven architectures using optimistic concurrency controls."
                        },
                        {
                            title: "The Future of Autonomous Cyber-Defense",
                            date: "Nov 2025",
                            abstract: "Exploring the role of generative agents in identifying and neutralizing zero-day exploits."
                        },
                        {
                            title: "Data Sovereignty in Multi-Cloud Environments",
                            date: "Sep 2025",
                            abstract: "Strategies for maintaining compliance and control over data resident in disparate public cloud infrastructures."
                        }
                    ].map((paper, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-slate-900 border border-slate-800 p-6 rounded-xl transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-electric-blue/20 hover:bg-electric-blue hover:border-electric-blue hover:text-white group"
                        >
                            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <FileText className="w-5 h-5 text-electric-blue" />
                                        <h3 className="text-xl font-bold text-white">{paper.title}</h3>
                                    </div>
                                    <p className="text-slate-400 mb-2 group-hover:text-white/90">{paper.abstract}</p>
                                    <span className="text-sm text-slate-500 font-mono group-hover:text-white/70">{paper.date} • Technical Whitepaper</span>
                                </div>
                                <Button variant="outline" size="sm" className="shrink-0 group-hover:bg-white group-hover:text-electric-blue group-hover:border-white transition-colors">
                                    <Download className="w-4 h-4 mr-2" /> PDF
                                </Button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </Section>
        </div>
    );
}
