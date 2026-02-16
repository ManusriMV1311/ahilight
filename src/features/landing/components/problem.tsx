"use client";
import React, { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { GlareCard } from "@/components/ui/glare-card";
import { AlertCircle, Database, Zap } from "lucide-react";

const problems = [
    {
        title: "Operational Complexity",
        description: "Enterprise systems have evolved beyond human scale management. As operations grow more distributed, the overhead of manual coordination creates cascading inefficiency.",
        icon: <AlertCircle className="w-8 h-8 text-red-500" />,
    },
    {
        title: "Data Silos",
        description: "Critical operational intelligence remains trapped in disconnected systems. Security, infrastructure, and logistics teams operate on fragmented data, preventing unified decision making.",
        icon: <Database className="w-8 h-8 text-amber-500" />,
    },
    {
        title: "Reactive Posture",
        description: "Most enterprise systems wait for problems to occur before responding. Modern operations require proactive intelligence systems that predict, adapt, and act autonomously.",
        icon: <Zap className="w-8 h-8 text-electric-blue" />,
    },
];

export function Problem() {
    const ref = useRef(null);
    const isInView = useInView(ref, { margin: "-100px" });

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" },
        },
    };

    return (
        <motion.section
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="relative py-16 md:py-32 px-4 bg-transparent overflow-hidden"
        >
            {/* Background Elements */}
            <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:30px_30px] pointer-events-none" />

            {/* Section headline */}
            <motion.h2
                variants={itemVariants}
                className="text-3xl md:text-5xl font-bold text-center mb-6 text-white font-heading"
            >
                The problem isn&apos;t scale. It&apos;s{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-blue to-cyan-accent">complexity</span>.
            </motion.h2>

            <motion.p
                variants={itemVariants}
                className="text-xl text-neutral-400 text-center mb-16 max-w-3xl mx-auto leading-relaxed"
            >
                When you have a thousand services, you don&apos;t need a dashboard. You need a brain.
            </motion.p>

            {/* Three problem cards with stagger */}
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                <motion.div variants={itemVariants} className="group h-full">
                    <GlareCard className="bg-neutral-900 border-white/10 h-full">
                        <div className="flex flex-col p-6 md:p-8 h-full justify-between">
                            <div>
                                <div className="mb-6 opacity-80"><AlertCircle className="w-8 h-8 text-red-500" /></div>
                                <h3 className="text-2xl font-bold mb-4 text-white">Too many moving parts</h3>
                                <p className="text-neutral-400 leading-relaxed text-base">We used to manually coordinate deployments. It didn&apos;t work. As operations grow, manual coordination guarantees inefficiency.</p>
                            </div>
                            <div className="mt-8 pt-6 border-t border-white/10">
                                <div className="h-1 w-16 bg-gradient-to-r from-electric-blue to-transparent rounded-full" />
                            </div>
                        </div>
                    </GlareCard>
                </motion.div>

                <motion.div variants={itemVariants} className="group h-full">
                    <GlareCard className="bg-neutral-900 border-white/10 h-full">
                        <div className="flex flex-col p-8 h-full justify-between">
                            <div>
                                <div className="mb-6 opacity-80"><Database className="w-8 h-8 text-amber-500" /></div>
                                <h3 className="text-2xl font-bold mb-4 text-white">Trapped data</h3>
                                <p className="text-neutral-400 leading-relaxed text-base">Your security team doesn&apos;t talk to your logistics team. Not because they don&apos;t want to, but because their tools speak different languages.</p>
                            </div>
                            <div className="mt-8 pt-6 border-t border-white/10">
                                <div className="h-1 w-16 bg-gradient-to-r from-electric-blue to-transparent rounded-full" />
                            </div>
                        </div>
                    </GlareCard>
                </motion.div>

                <motion.div variants={itemVariants} className="group h-full">
                    <GlareCard className="bg-neutral-900 border-white/10 h-full">
                        <div className="flex flex-col p-8 h-full justify-between">
                            <div>
                                <div className="mb-6 opacity-80"><Zap className="w-8 h-8 text-electric-blue" /></div>
                                <h3 className="text-2xl font-bold mb-4 text-white">Waiting for fires</h3>
                                <p className="text-neutral-400 leading-relaxed text-base">Most systems wait for something to break. We prefer to fix things before the pager goes off.</p>
                            </div>
                            <div className="mt-8 pt-6 border-t border-white/10">
                                <div className="h-1 w-16 bg-gradient-to-r from-electric-blue to-transparent rounded-full" />
                            </div>
                        </div>
                    </GlareCard>
                </motion.div>
            </div>
        </motion.section>
    );
}
