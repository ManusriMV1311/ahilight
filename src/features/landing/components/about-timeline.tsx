"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/section";
import { Flag, Microscope, Rocket, Target } from "lucide-react";

const milestones = [
    {
        year: "2023",
        title: "Starting Up",
        description: "We started AhiLight because we were tired of gluing APIs together. We spent the first year just reading papers and writing expected behavior specs.",
        icon: Microscope,
    },
    {
        year: "2024",
        title: "The Engine",
        description: "We built the core data engine. It wasn't pretty, but it was fast, and it was correct.",
        icon: Target,
    },
    {
        year: "2025",
        title: "First Customers",
        description: "We deployed with our first partners. We broke a few things, fixed them, and learned more in a month than we did in the previous year.",
        icon: Rocket,
    },
    {
        year: "Future",
        title: "Scale",
        description: "Now we scale up. But we keep the same manual for quality we wrote on day one.",
        icon: Flag,
    },
];

export function AboutTimeline() {
    return (
        <Section className="bg-transparent relative overflow-hidden">
            <div className="container mx-auto px-4 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl font-bold text-white mb-4 font-heading">Our Journey</h2>
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
                                    <div className={`p-6 bg-transparent border border-slate-800 rounded-xl relative hover:border-electric-blue/50 transition-colors group ${index % 2 === 0 ? "md:mr-12" : "md:ml-12"
                                        }`}>
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
