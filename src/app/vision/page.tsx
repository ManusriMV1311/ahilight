"use client";

import { VisionBackground } from "@/components/backgrounds/VisionBackground";

import { Section } from "@/components/ui/section";
import { motion } from "framer-motion";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import { TracingBeam } from "@/components/ui/tracing-beam";

export default function VisionPage() {
    return (
        <div className="flex flex-col gap-0">
            <VisionBackground />

            {/* Hero Section */}
            <Section background="navy-gradient" className="min-h-[50vh] md:min-h-[60vh] flex items-center justify-center pt-24 pb-12 md:pt-28 md:pb-16 lg:pt-32 lg:pb-20">
                <div className="text-center max-w-4xl mx-auto">
                    <div className="mb-6">
                        <TypewriterEffect
                            words={[
                                { text: "Envisioning", className: "text-white" },
                                { text: "a", className: "text-white" },
                                { text: "Smarter", className: "text-transparent bg-clip-text bg-gradient-to-r from-electric-blue to-cyan-accent" },
                                { text: "Future", className: "text-transparent bg-clip-text bg-gradient-to-r from-electric-blue to-cyan-accent" },
                            ]}
                            className="text-5xl md:text-7xl font-bold tracking-tight inline-block"
                            cursorClassName="bg-electric-blue"
                        />
                    </div>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-xl text-slate-300 leading-relaxed"
                    >
                        Our vision is a world where complex systems are automated, intelligent, and secure by design.
                    </motion.p>
                </div>
            </Section>

            {/* Strategic Goals - Wrapped in Tracing Beam */}
            <Section className="relative z-10">
                <TracingBeam className="px-6">
                    <div className="max-w-4xl mx-auto space-y-24 pt-10 pb-24">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="bg-navy-card/50 backdrop-blur-sm p-8 rounded-2xl border border-white/10"
                        >
                            <h2 className="text-3xl font-bold text-white mb-4">Autonomous Enterprise</h2>
                            <p className="text-lg text-slate-300 leading-relaxed">
                                We foresee a shift from human-operated software to human-supervised autonomous systems. AhiLight is building the fundamental logic layers that will enable this transition, reducing operational overhead and eliminating human error in critical processes.
                            </p>
                            <div className="mt-8 h-40 bg-gradient-to-br from-electric-blue/20 to-transparent rounded-xl border border-electric-blue/20" />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="bg-navy-card/50 backdrop-blur-sm p-8 rounded-2xl border border-white/10"
                        >
                            <h2 className="text-3xl font-bold text-white mb-4">Intelligent Security</h2>
                            <p className="text-lg text-slate-300 leading-relaxed">
                                Security cannot be an afterthought. In our vision, security is woven into the fabric of every application and network, reacting in real-time to threats with biological-style immune responses.
                            </p>
                            <div className="mt-8 h-40 bg-gradient-to-br from-electric-blue/20 to-transparent rounded-xl border border-electric-blue/20" />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="bg-navy-card/50 backdrop-blur-sm p-8 rounded-2xl border border-white/10"
                        >
                            <h2 className="text-3xl font-bold text-white mb-4">Decentralized Trust</h2>
                            <p className="text-lg text-slate-300 leading-relaxed">
                                Future systems must operate without single points of failure. We are pioneering research into conflict-free replicated data types and decentralized consensus to build the unbreakable backbone of tomorrow's web.
                            </p>
                        </motion.div>
                    </div>
                </TracingBeam>
            </Section>
        </div>
    );
}
