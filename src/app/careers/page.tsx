"use client";

import { CareersBackground } from "@/components/backgrounds/CareersBackground";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Globe, Radio } from "lucide-react";
import { motion } from "framer-motion";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import { GlareCard } from "@/components/ui/glare-card";

export default function CareersPage() {
    return (
        <div className="flex flex-col gap-0 min-h-screen relative overflow-hidden">
            <CareersBackground />

            {/* Hero Section */}
            <Section background="transparent" className="pt-24 pb-12 md:pt-28 md:pb-16 lg:pt-32 lg:pb-20 relative z-10">
                <div className="text-center max-w-4xl mx-auto">
                    <div className="mb-6">
                        <TypewriterEffect
                            words={[
                                { text: "We", className: "text-white font-heading" },
                                { text: "are", className: "text-white font-heading" },
                                { text: "looking", className: "text-white font-heading" },
                                { text: "for", className: "text-white font-heading" },
                                { text: "builders.", className: "text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 font-heading" },
                            ]}
                            className="text-5xl md:text-7xl font-bold tracking-tight py-4 leading-tight font-heading"
                            cursorClassName="bg-cyan-500"
                        />
                    </div>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-xl text-slate-300 relative inline-block"
                    >
                        <span className="absolute -left-6 top-1/2 -translate-y-1/2 w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
                        We work on hard problems. If you like easy ones, you will hate it here.
                        <span className="absolute -right-6 top-1/2 -translate-y-1/2 w-2 h-2 bg-cyan-500 rounded-full animate-pulse" />
                    </motion.p>
                </div>
            </Section>

            {/* Open Positions */}
            <Section className="relative z-10 pb-32">
                <div className="max-w-5xl mx-auto">
                    <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-4">
                        <h2 className="text-3xl font-bold text-white font-heading flex items-center">
                            <Radio className="w-6 h-6 mr-3 text-cyan-400 animate-pulse" />
                            Open Positions
                        </h2>
                        <span className="text-xs font-mono text-cyan-500 border border-cyan-500/30 px-2 py-1 rounded bg-cyan-500/10">
                            LIVE FEED • GLOBAL
                        </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            { title: "Senior Systems Engineer", dept: "Engineering", loc: "Remote / New York" },
                            { title: "AI Research Scientist", dept: "Research", loc: "London, UK" },
                            { title: "Product Designer", dept: "Product", loc: "Remote" },
                            { title: "Frontend Developer (React/Next.js)", dept: "Engineering", loc: "Remote" }
                        ].map((job, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="h-full"
                            >
                                <GlareCard className="flex flex-col h-full bg-navy-card/40 backdrop-blur-xl border border-white/10 p-1 relative overflow-hidden group">
                                    {/* Mission Brief Decor */}
                                    <div className="absolute top-0 right-0 p-3 opacity-50 group-hover:opacity-100 transition-opacity">
                                        <Globe className="w-12 h-12 text-white/5" />
                                    </div>
                                    <div className="absolute top-4 right-4 text-[10px] font-mono text-cyan-500/50">
                                        REQ-{2024 + i}
                                    </div>

                                    <div className="h-full w-full bg-deep-navy/60 p-6 rounded-[14px] flex flex-col relative z-10">
                                        <div className="mb-4">
                                            <span className="text-xs font-mono text-purple-400 uppercase tracking-wider mb-1 block">
                                                {job.dept}
                                            </span>
                                            <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                                                {job.title}
                                            </h3>
                                        </div>

                                        <div className="flex items-center gap-2 text-slate-400 text-sm mb-6">
                                            <MapPin className="w-4 h-4 text-cyan-500" />
                                            {job.loc}
                                        </div>

                                        <div className="mt-auto pt-4 border-t border-white/5 flex justify-between items-center group-hover:border-white/20 transition-colors">
                                            <span className="text-xs text-slate-500 group-hover:text-cyan-500/70 transition-colors font-mono">
                                                STATUS: ACTIVE
                                            </span>
                                            <div
                                                className="px-4 py-2 text-sm bg-white/5 hover:bg-cyan-500/20 text-white hover:text-cyan-400 font-semibold rounded-md border border-white/10 hover:border-cyan-500/50 transition-all cursor-pointer flex items-center gap-2"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    window.location.href = `mailto:careers@ahilight.com?subject=Application for ${job.title}`;
                                                }}
                                            >
                                                Apply Now <ArrowRight className="w-4 h-4" />
                                            </div>
                                        </div>
                                    </div>
                                </GlareCard>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </Section>
        </div>
    );
}
