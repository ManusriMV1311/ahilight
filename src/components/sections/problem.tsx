"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
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
        icon: <Zap className="w-8 h-8 text-teal-400" />,
    },
];

export function Problem() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
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
            className="relative py-32 px-4 bg-black overflow-hidden"
        >
            {/* Background Elements */}
            <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:30px_30px] pointer-events-none" />

            {/* Section headline */}
            <motion.h2
                variants={itemVariants}
                className="text-4xl md:text-5xl font-bold text-center mb-6 text-white"
            >
                The Fundamental Limit is{" "}
                <span className="text-teal-400">Human Scale Operations</span>
            </motion.h2>

            <motion.p
                variants={itemVariants}
                className="text-xl text-neutral-400 text-center mb-16 max-w-3xl mx-auto leading-relaxed"
            >
                AhiLight builds autonomous software systems designed to operate at the scale and speed modern enterprises demand.
            </motion.p>

            {/* Three problem cards with stagger */}
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {problems.map((problem, index) => (
                    <motion.div
                        key={index}
                        variants={itemVariants}
                        className="group"
                    >
                        <GlareCard className="flex flex-col p-8 h-full min-h-[300px] justify-between bg-neutral-900 border-white/10">
                            <div>
                                <div className="mb-6 opacity-80">{problem.icon}</div>
                                <h3 className="text-2xl font-bold mb-4 text-white">{problem.title}</h3>
                                <p className="text-neutral-400 leading-relaxed text-base">{problem.description}</p>
                            </div>

                            {/* Decorative element */}
                            <div className="mt-8 pt-6 border-t border-white/10">
                                <div className="h-1 w-16 bg-gradient-to-r from-teal-500 to-transparent rounded-full" />
                            </div>
                        </GlareCard>
                    </motion.div>
                ))}
            </div>
        </motion.section>
    );
}
