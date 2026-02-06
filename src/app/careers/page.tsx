"use client";

import { CareersBackground } from "@/components/backgrounds/CareersBackground";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Button as MovingBorderButton } from "@/components/ui/moving-border";
import { ArrowRight, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";

export default function CareersPage() {
    return (
        <div className="flex flex-col gap-0 min-h-screen relative">
            <CareersBackground />
            <div className="relative z-10">
                {/* Hero Section */}
                <Section background="transparent" className="pt-24 pb-12 md:pt-28 md:pb-16 lg:pt-32 lg:pb-20">
                    <div className="text-center max-w-4xl mx-auto">
                        <div className="mb-6">
                            <TypewriterEffect
                                words={[
                                    { text: "We", className: "text-white font-heading" },
                                    { text: "are", className: "text-white font-heading" },
                                    { text: "looking", className: "text-white font-heading" },
                                    { text: "for", className: "text-white font-heading" },
                                    { text: "builders.", className: "text-transparent bg-clip-text bg-gradient-to-r from-electric-blue to-cyan-accent font-heading" },
                                ]}
                                className="text-5xl md:text-7xl font-bold tracking-tight py-4 leading-tight font-heading"
                                cursorClassName="bg-electric-blue"
                            />
                        </div>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-xl text-slate-300"
                        >
                            We work on hard problems. If you like easy ones, you will hate it here.
                        </motion.p>
                    </div>
                </Section>

                {/* Open Positions */}
                <Section className="">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold text-white mb-8 border-b border-white/10 pb-4 font-heading">Open Positions</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[
                                { title: "Senior Systems Engineer", dept: "Engineering", loc: "Remote / New York" },
                                { title: "AI Research Scientist", dept: "Research", loc: "London, UK" },
                                { title: "Product Designer", dept: "Product", loc: "Remote" },
                                { title: "Frontend Developer (React/Next.js)", dept: "Engineering", loc: "Remote" }
                            ].map((job, i) => (
                                <div key={i} className="flex justify-center h-full">
                                    <MovingBorderButton
                                        borderRadius="1rem"
                                        className="bg-slate-900/60 backdrop-blur-md text-white border-slate-800 p-6 h-full flex-col items-start gap-4 hover:bg-slate-800/80 transition-colors duration-300"
                                        containerClassName="w-full h-48"
                                    >
                                        <div className="w-full">
                                            <h3 className="text-xl font-bold text-white mb-2 text-left">{job.title}</h3>
                                            <div className="flex flex-col gap-1 text-slate-400 text-sm text-left">
                                                <span>{job.dept}</span>
                                                <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {job.loc}</span>
                                            </div>
                                        </div>
                                        <div className="mt-auto w-full flex justify-end">
                                            <div
                                                className="px-4 py-2 text-sm bg-gradient-to-r from-electric-blue to-cyan-accent text-white font-semibold rounded-md hover:shadow-lg hover:shadow-electric-blue/50 transition-all cursor-pointer flex items-center gap-1"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    window.location.href = `mailto:careers@ahilight.com?subject=Application for ${job.title}`;
                                                }}
                                            >
                                                Let&apos;s talk <ArrowRight className="w-4 h-4" />
                                            </div>
                                        </div>
                                    </MovingBorderButton>
                                </div>
                            ))}
                        </div>
                    </div>
                </Section>
            </div>
        </div>
    );
}
