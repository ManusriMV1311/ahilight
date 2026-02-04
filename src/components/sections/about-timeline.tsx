"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/section";
import { Flag, Microscope, Rocket, Target } from "lucide-react";

const milestones = [
    {
        year: "2023",
        title: "Founding & Research",
        description: "AhiLight is founded with a mission to solve the 'Fragmented Intelligence' problem. Initial research focuses on autonomous data unification algorithms.",
        icon: Microscope,
    },
    {
        year: "2024",
        title: "The Core Engine",
        description: "Development of the proprietary 'NeuroLink' protocol (internal codename), enabling real-time semantic understanding of disparate systems.",
        icon: Target,
    },
    {
        year: "2025",
        title: "Stealth Pilot",
        description: "Deploying alpha versions with select enterprise partners in manufacturing and logistics. Validating the 'Reactive to Proactive' shift.",
        icon: Rocket,
    },
    {
        year: "Future",
        title: "Global Autonomy",
        description: "Expanding to full-scale autonomous enterprise management, where software self-optimizes without human intervention.",
        icon: Flag,
    },
];

export function AboutTimeline() {
    return (
        <Section className="bg-deep-navy relative overflow-hidden">
            <div className="container mx-auto px-4 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl font-bold text-white mb-4">Our Journey</h2>
                    <p className="text-lg text-slate-400">From theoretical research to applied enterprise intelligence.</p>
                </motion.div>

                <div className="relative">
                    {/* Vertical Line */}
                    <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-electric-blue/50 to-transparent md:-translate-x-1/2" />

                    <div className="space-y-12">
                        {milestones.map((milestone, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ delay: index * 0.1 }}
                                className={`relative flex flex-col md:flex-row gap-8 items-start md:items-center ${index % 2 === 0 ? "md:flex-row-reverse" : ""
                                    }`}
                            >
                                {/* Content Card */}
                                <div className="flex-1 w-full md:w-1/2 pl-12 md:pl-0">
                                    <div className={`p-6 bg-slate-900/50 border border-slate-800 rounded-xl relative hover:border-electric-blue/50 transition-colors group ${index % 2 === 0 ? "md:mr-12" : "md:ml-12"
                                        }`}>
                                        <span className="text-electric-blue font-mono font-bold text-sm mb-2 block">{milestone.year}</span>
                                        <h3 className="text-xl font-bold text-white mb-2">{milestone.title}</h3>
                                        <p className="text-slate-400 text-sm leading-relaxed group-hover:text-slate-300 transition-colors">
                                            {milestone.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Center Icon */}
                                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 flex items-center justify-center w-8 h-8 rounded-full bg-deep-navy border-2 border-electric-blue z-10 shadow-[0_0_15px_rgba(125,95,255,0.3)]">
                                    <milestone.icon className="w-4 h-4 text-white" />
                                </div>
                                <div className="hidden md:block flex-1" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </Section>
    )
}
