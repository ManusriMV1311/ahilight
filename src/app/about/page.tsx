"use client";

import { AboutBackground } from "@/components/backgrounds/AboutBackground";

import { HoverEffect } from "@/components/ui/card-hover-effect";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Globe, Lightbulb, Users } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import { AboutTimeline } from "@/components/sections/about-timeline";
import { AboutTeam } from "@/components/sections/about-team";
import { AboutBacking } from "@/components/sections/about-backing";

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
            <AboutBackground />

            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-12 md:pt-28 md:pb-16 lg:pt-32 lg:pb-20">
                {/* Overlay for Contrast */}
                <div className="absolute inset-0 bg-deep-navy/60 z-0">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#0066FF10_1px,transparent_1px),linear-gradient(to_bottom,#0066FF10_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
                </div>

                <div className="container relative z-10 mx-auto px-4 text-center flex flex-col items-center">
                    {/* Removed "Our Story" badge for cleaner look */}

                    <div className="mb-8 max-w-5xl mx-auto leading-tight text-center">
                        <TypewriterEffect
                            words={[
                                { text: "We", className: "text-white font-heading" },
                                { text: "started", className: "text-white font-heading" },
                                { text: "as", className: "text-white font-heading" },
                                { text: "a", className: "text-white font-heading" },
                                { text: "research", className: "text-transparent bg-clip-text bg-gradient-to-r from-electric-blue to-cyan-accent font-heading" },
                                { text: "lab.", className: "text-transparent bg-clip-text bg-gradient-to-r from-electric-blue to-cyan-accent font-heading" },
                            ]}
                            className="text-4xl md:text-6xl font-bold tracking-tight py-4 leading-tight font-heading"
                            cursorClassName="bg-electric-blue"
                        />
                    </div>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                        className="text-xl text-slate-300 font-medium max-w-2xl mx-auto leading-relaxed"
                    >
                        We realized the world didn&apos;t need another dashboard. It needed systems that understand the world as well as we do.
                    </motion.p>
                </div>
            </section>

            {/* Mission & Vision Section */}
            <Section className="relative z-10">
                <div className="text-center max-w-4xl mx-auto mb-16">
                    <motion.h2
                        variants={fadeIn}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold text-white mb-6 font-heading"
                    >
                        Why we are here
                    </motion.h2>
                    <motion.p
                        variants={fadeIn}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        className="text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto"
                    >
                        We want to see how far we can push these systems before they break. And then build them so they don&apos;t.
                    </motion.p>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <HoverEffect items={[
                        {
                            title: "Innovation First",
                            description: "We don't solve easy problems. We pick the ones that keep other engineers awake at night.",
                            link: "/technology",
                        },
                        {
                            title: "Global Impact",
                            description: "Code runs the world. We make sure it doesn't crash.",
                            link: "/vision",
                        },
                        {
                            title: "Research Backed",
                            description: "We trust proofs, not pitches.",
                            link: "/research",
                        },
                        {
                            title: "Reliability",
                            description: "99.9% uptime isn't a goal. It's a minimum requirement.",
                            link: "/products",
                        },
                        {
                            title: "For Humans",
                            description: "Complex systems should feel simple. If it's hard to use, it's broken.",
                            link: "/careers",
                        },
                    ]} />
                </div>
            </Section>

            {/* Timeline Section */}
            <AboutTimeline />

            {/* Team/Culture Placeholder */}
            <Section className="">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-3xl font-bold text-white mb-4 font-heading"
                    >
                        How we work
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="text-lg text-slate-300"
                    >
                        Last Tuesday, we scrapped a feature we spent two weeks on because it felt clunky. That&apos;s who we are.
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 mb-20">
                    {[
                        { title: "Excellence", description: "We write code we are proud to sign our names to.", icon: Users },
                        { title: "Curiosity", description: "We ask 'why' until it gets annoying. Then we ask it one more time.", icon: Lightbulb },
                        { title: "Integrity", description: "We tell the truth about what our software can do. And what it can't.", icon: CheckCircle2 },
                    ].map((value, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ delay: i * 0.15, duration: 0.5 }}
                            whileHover={{ y: -8, transition: { duration: 0.2 } }}
                            className="bg-deep-navy/50 backdrop-blur-sm border border-slate-800 p-8 rounded-xl hover:bg-electric-blue hover:border-electric-blue transition-all group"
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

            {/* Core Team & Advisors */}
            <AboutTeam />

            {/* Backing & Standards */}
            <AboutBacking />

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
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-heading">
                            Join the <span className="text-electric-blue">Revolution</span>
                        </h2>
                        <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-10">
                            Interested in working with us or learning more about our research? Let's connect.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Link href="/contact">
                                    <Button size="lg" className="min-w-[160px] h-12 text-lg shadow-[0_0_20px_rgba(125,95,255,0.3)]">
                                        Talk to us
                                        <ArrowRight className="ml-2 w-5 h-5" />
                                    </Button>
                                </Link>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </Section>
        </div>
    );
}
