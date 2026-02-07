"use client"

import { Section } from "@/components/ui/section"
import { GlareCard } from "@/components/ui/glare-card"
import { Shield, Activity, Sparkles, ArrowRight } from "lucide-react"
import Link from "next/link"
import { TypewriterEffect } from "@/components/ui/typewriter-effect"
import { Button } from "@/components/ui/button"
import { ProductsBackground } from "@/components/backgrounds/ProductsBackground"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export function DomainApproach() {
    const [showAhiLight, setShowAhiLight] = useState(false);
    const [showCards, setShowCards] = useState(false);
    const [titleComplete, setTitleComplete] = useState(false);

    useEffect(() => {
        // Wait for title typewriter to complete (approx 2s)
        setTimeout(() => {
            setTitleComplete(true);
            // Then show AhiLight
            setTimeout(() => setShowAhiLight(true), 300);
        }, 2000);

        // Cards pop out from AhiLight
        setTimeout(() => {
            setShowCards(true);
        }, 3500);

        // Fade AhiLight away
        setTimeout(() => {
            setShowAhiLight(false);
        }, 4000);
    }, []);

    return (
        <>
            {/* Background with AhiLight */}
            {titleComplete && <ProductsBackground show={showAhiLight} />}

            <Section background="transparent" className="py-12 md:py-16 lg:py-24">
                <div className="container mx-auto px-4">
                    {/* Existing Title */}
                    <div className="max-w-3xl mb-12 md:mb-16 mx-auto text-center">
                        <div className="mb-6 flex justify-center">
                            <TypewriterEffect
                                words={[
                                    { text: "Solving", className: "text-white font-heading" },
                                    { text: "Complex", className: "text-transparent bg-clip-text bg-gradient-to-r from-electric-blue to-cyan-accent font-heading" },
                                    { text: "Challenges", className: "text-transparent bg-clip-text bg-gradient-to-r from-electric-blue to-cyan-accent font-heading" },
                                ]}
                                className="text-3xl md:text-5xl font-bold py-6 leading-normal font-heading"
                                cursorClassName="bg-electric-blue"
                            />
                        </div>
                        <p className="text-xl text-slate-400 leading-relaxed">
                            AhiLight applies research driven engineering to enterprise operations where existing tools fall short.
                        </p>
                    </div>

                    {/* Existing Cards with Animation */}
                    <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">

                        {/* Domain 1: Security (CyberFortress) */}
                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={
                                showCards
                                    ? {
                                        scale: 1,
                                        opacity: 1,
                                        transition: {
                                            duration: 0.6,
                                            type: "spring",
                                            stiffness: 180,
                                            damping: 12
                                        }
                                    }
                                    : { scale: 0, opacity: 0 }
                            }
                            className="group relative h-full"
                        >
                            {/* Glow effect */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={
                                    showCards
                                        ? {
                                            opacity: [0, 0.6, 0.3],
                                            transition: {
                                                delay: 0.6,
                                                duration: 1,
                                                times: [0, 0.5, 1]
                                            }
                                        }
                                        : { opacity: 0 }
                                }
                                className="absolute -inset-2 rounded-2xl blur-2xl bg-electric-blue"
                            />

                            <GlareCard className="h-full">
                                <div className="flex flex-col h-full p-8">
                                    <div className="w-14 h-14 bg-electric-blue/10 rounded-xl flex items-center justify-center mb-6 text-electric-blue group-hover:bg-white group-hover:text-electric-blue transition-colors pointer-events-auto">
                                        <Shield className="w-8 h-8" />
                                    </div>

                                    <div className="flex justify-between items-start mb-2 pointer-events-auto">
                                        <h3 className="text-2xl font-bold text-white group-hover:text-white">Security Operations</h3>
                                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-electric-blue/20 text-electric-blue text-xs font-bold uppercase tracking-wider group-hover:bg-white/20 group-hover:text-white">
                                            CyberFortress
                                        </span>
                                    </div>

                                    <div className="space-y-6 mb-8 flex-grow pointer-events-auto">
                                        <div>
                                            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 group-hover:text-white/80">The Challenge</div>
                                            <p className="text-sm text-slate-300 leading-relaxed group-hover:text-white/90">
                                                Enterprise security stacks contain 30 to 50 fragmented tools. Attacks move at machine speed while human teams respond in hours.
                                            </p>
                                        </div>
                                        <div>
                                            <div className="text-xs font-bold text-electric-blue uppercase tracking-wider mb-2 group-hover:text-white">Our Approach</div>
                                            <p className="text-sm text-slate-300 leading-relaxed group-hover:text-white/90">
                                                Unified autonomous platforms that detect, respond, and audit without human bottlenecks. Uses post quantum encryption and adaptive honeypots.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="pt-6 border-t border-white/5 group-hover:border-white/20 mt-auto pointer-events-auto">
                                        <Link href="/cyberfortress" className="block relative z-20">
                                            <Button className="w-full bg-white/10 text-white hover:bg-white hover:text-electric-blue border-transparent group-hover:border-white transition-all shadow-lg">
                                                Explore Platform
                                                <ArrowRight className="ml-2 w-4 h-4" />
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </GlareCard>
                        </motion.div>

                        {/* Common Message: Expanding Horizons */}
                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={
                                showCards
                                    ? {
                                        scale: 1,
                                        opacity: 1,
                                        transition: {
                                            delay: 0.4,
                                            duration: 0.6,
                                            type: "spring",
                                            stiffness: 180,
                                            damping: 12
                                        }
                                    }
                                    : { scale: 0, opacity: 0 }
                            }
                            className="group relative h-full"
                        >
                            {/* Glow effect */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={
                                    showCards
                                        ? {
                                            opacity: [0, 0.6, 0.3],
                                            transition: {
                                                delay: 1,
                                                duration: 1,
                                                times: [0, 0.5, 1]
                                            }
                                        }
                                        : { opacity: 0 }
                                }
                                className="absolute -inset-2 rounded-2xl blur-2xl"
                                style={{ background: "#7D5FFF" }}
                            />

                            <GlareCard className="h-full">
                                <div className="flex flex-col h-full p-8 items-center justify-center text-center">
                                    <div className="pointer-events-auto w-full">
                                        <div className="mb-6 w-16 h-16 bg-white/5 rounded-full flex items-center justify-center group-hover:bg-electric-blue/10 transition-colors mx-auto">
                                            <Sparkles className="w-8 h-8 text-slate-500 group-hover:text-electric-blue transition-colors" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-white">Expanding Horizons</h3>
                                        <p className="text-slate-400 mb-8 leading-relaxed max-w-sm mx-auto group-hover:text-slate-300">
                                            Our research inputs are continuously evolving. We are actively developing new autonomous systems to tackle complex challenges across enterprise infrastructure and global supply chains.
                                        </p>

                                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/5 text-sm text-slate-400 group-hover:text-electric-blue group-hover:bg-electric-blue/10 group-hover:border-electric-blue/20 transition-all">
                                            <Activity className="w-4 h-4" />
                                            <span>Research In Progress</span>
                                        </div>
                                    </div>
                                </div>
                            </GlareCard>
                        </motion.div>

                    </div>
                </div>
            </Section>
        </>
    )
}
