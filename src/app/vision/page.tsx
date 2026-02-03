"use client";


import { Section } from "@/components/ui/section";
import { motion } from "framer-motion";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";

export default function VisionPage() {
    return (
        <div className="flex flex-col gap-0">

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

            {/* Strategic Goals */}
            <Section className="">
                <div className="max-w-4xl mx-auto space-y-16">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl font-bold text-white mb-4">Autonomous Enterprise</h2>
                        <p className="text-lg text-slate-300 leading-relaxed">
                            We foresee a shift from human-operated software to human-supervised autonomous systems. AhiLight is building the fundamental logic layers that will enable this transition, reducing operational overhead and eliminating human error in critical processes.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <h2 className="text-3xl font-bold text-white mb-4">Intelligent Security</h2>
                        <p className="text-lg text-slate-300 leading-relaxed">
                            Security cannot be an afterthought. In our vision, security is woven into the fabric of every application and network, reacting in real-time to threats with biological-style immune responses.
                        </p>
                    </motion.div>
                </div>
            </Section>
        </div>
    );
}
