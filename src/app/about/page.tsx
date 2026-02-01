"use client";

import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Globe, Lightbulb, Users } from "lucide-react";
import { motion } from "framer-motion";
import { FrameBackground } from "@/components/ui/frame-background";
import { TypewriterText } from "@/components/ui/typewriter-text";

const fadeIn = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
};

const staggerContainer = {
    animate: {
        transition: {
            staggerChildren: 0.2
        }
    }
};

const scaleIn = {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.5, ease: "backOut" }
};

export default function AboutPage() {
    return (
        <div className="flex flex-col gap-0">
            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-20">
                {/* Background Video Frames */}
                <FrameBackground
                    pathPrefix="/about-frames"
                    frameCount={40}
                    interval={150}
                    className="opacity-100" // Full visibility
                />

                {/* Overlay Restored for Contrast - Brightened as requested */}
                <div className="absolute inset-0 bg-deep-navy/30 z-0">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#0066FF10_1px,transparent_1px),linear-gradient(to_bottom,#0066FF10_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
                </div>

                <div className="container relative z-10 mx-auto px-4 text-center flex flex-col items-center">
                    <motion.div
                        variants={scaleIn}
                        initial="initial"
                        animate="animate"
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-electric-blue text-sm font-medium mb-8 border border-white/10"
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-electric-blue opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-electric-blue"></span>
                        </span>
                        Our Story
                    </motion.div>

                    <div className="mb-8 max-w-5xl mx-auto leading-tight text-center">
                        <TypewriterText
                            text="Building the "
                            className="text-4xl md:text-6xl font-bold tracking-tight text-white inline-block mr-3"
                            cursor={false}
                        />
                        <div className="inline-block">
                            <TypewriterText
                                text="Intelligence"
                                delay={1}
                                cursor={false}
                                animation="clip"
                                className="text-4xl md:text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-electric-blue to-cyan-accent pb-2"
                            />
                        </div>
                        <TypewriterText
                            text=" that Powers the Future"
                            delay={2}
                            className="text-4xl md:text-6xl font-bold tracking-tight text-white inline-block ml-3"
                            cursor={true}
                        />
                    </div>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                        className="text-xl text-slate-300 font-medium max-w-2xl mx-auto leading-relaxed"
                    >
                        AhiLight is a research-driven technology company dedicated to solving the most critical operational challenges in the modern enterprise through advanced software systems.
                    </motion.p>
                </div>
            </section>

            {/* Mission & Vision Section */}
            <Section className="bg-deep-navy/50 relative">
                <motion.div
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={staggerContainer}
                    className="grid md:grid-cols-2 gap-16 items-center"
                >
                    <div className="space-y-6">
                        <motion.h2 variants={fadeIn} className="text-3xl font-bold text-white">Our Mission</motion.h2>
                        <motion.p variants={fadeIn} className="text-lg text-slate-300 leading-relaxed">
                            To empower organizations with the clarity and control they need to thrive in an increasingly complex digital landscape. We believe that true intelligence comes from interconnected systems that work in harmony.
                        </motion.p>
                        <motion.div variants={staggerContainer} className="space-y-4 pt-4">
                            <motion.div variants={fadeIn} className="flex items-start gap-3">
                                <div className="p-2 rounded-lg bg-electric-blue/10 text-electric-blue">
                                    <Lightbulb className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-white font-semibold mb-1">Innovation First</h3>
                                    <p className="text-slate-400">We push the boundaries of what's possible with software.</p>
                                </div>
                            </motion.div>
                            <motion.div variants={fadeIn} className="flex items-start gap-3">
                                <div className="p-2 rounded-lg bg-cyan-accent/10 text-cyan-accent">
                                    <Globe className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-white font-semibold mb-1">Global Impact</h3>
                                    <p className="text-slate-400">Our solutions are designed to scale and serve enterprises worldwide.</p>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="absolute -inset-4 bg-gradient-to-tr from-electric-blue/20 to-cyan-accent/20 rounded-2xl blur-lg opacity-75" />
                        <div className="relative bg-slate-900 border border-slate-800 rounded-2xl p-8 space-y-6">
                            <h3 className="text-2xl font-bold text-white mb-4">Why AhiLight?</h3>
                            <ul className="space-y-4">
                                {[
                                    "Research-backed methodologies",
                                    "Enterprise-grade reliability",
                                    "Security-first architecture",
                                    "User-centric design"
                                ].map((item, i) => (
                                    <motion.li
                                        key={i}
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.1 + (i * 0.1), duration: 0.5 }}
                                        className="flex items-center gap-3 text-slate-300"
                                    >
                                        <CheckCircle2 className="w-5 h-5 text-electric-blue shrink-0" />
                                        {item}
                                    </motion.li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                </motion.div>
            </Section>

            {/* Team/Culture Placeholder */}
            <Section className="bg-slate-900/50">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-3xl font-bold text-white mb-4"
                    >
                        Our Culture
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="text-lg text-slate-300"
                    >
                        We are a diverse team of engineers, researchers, and designers passionate about building software that matters.
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        { title: "Excellence", description: "We hold ourselves to the highest standards in code quality and product design.", icon: Users },
                        { title: "Curiosity", description: "We never stop asking questions and exploring new technologies.", icon: Lightbulb },
                        { title: "Integrity", description: "We build trust through transparency and honest communication.", icon: CheckCircle2 },
                    ].map((value, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ delay: i * 0.15, duration: 0.5 }}
                            whileHover={{ y: -8, transition: { duration: 0.2 } }}
                            className="bg-deep-navy border border-slate-800 p-8 rounded-xl hover:bg-electric-blue hover:border-electric-blue transition-all group"
                        >
                            <div className="w-12 h-12 rounded-lg bg-slate-800 flex items-center justify-center mb-6 text-electric-blue group-hover:bg-white group-hover:text-electric-blue transition-colors">
                                <value.icon className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-white">{value.title}</h3>
                            <p className="text-slate-400 leading-relaxed group-hover:text-white/90">
                                {value.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </Section>

            {/* CTA Section */}
            <Section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-electric-blue/5" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-electric-blue/20 rounded-[100%] blur-[100px] pointer-events-none" />

                <div className="container relative z-10 mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Join the <span className="text-electric-blue">Revolution</span>
                        </h2>
                        <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-10">
                            Interested in working with us or learning more about our research? Let's connect.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Button size="lg" className="bg-electric-blue hover:bg-electric-blue/90 text-white min-w-[160px] h-12 text-lg">
                                    Contact Us
                                    <ArrowRight className="ml-2 w-5 h-5" />
                                </Button>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </Section>
        </div>
    );
}
