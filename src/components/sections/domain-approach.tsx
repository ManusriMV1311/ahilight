"use client"

import { Section } from "@/components/ui/section"
import { GlareCard } from "@/components/ui/glare-card"
import { Shield, Activity, Sparkles, ArrowRight } from "lucide-react"
import Link from "next/link"
import { TypewriterEffect } from "@/components/ui/typewriter-effect"
import { Button } from "@/components/ui/button"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function DomainApproach({ onAnimationComplete }: { onAnimationComplete?: (complete: boolean) => void }) {
    const [showAhiLight, setShowAhiLight] = useState(false);
    const [exploding, setExploding] = useState(false);
    const [showCards, setShowCards] = useState(false);
    const [titleComplete, setTitleComplete] = useState(false);
    const [showBackgroundParticles, setShowBackgroundParticles] = useState(false);
    const hasAnimated = useRef(false);

    useEffect(() => {
        if (hasAnimated.current) return;
        hasAnimated.current = true;

        // Title completes
        setTimeout(() => {
            setTitleComplete(true);
            // AhiLight appears
            setTimeout(() => setShowAhiLight(true), 300);
        }, 2000);

        // Start explosion
        setTimeout(() => {
            setExploding(true);
        }, 3500);

        // Show cards and background particles
        setTimeout(() => {
            setShowCards(true);
            setShowBackgroundParticles(true);
            setShowAhiLight(false); // Hide text
        }, 3800);

        // Animation complete - show rest of page
        setTimeout(() => {
            onAnimationComplete?.(true);
        }, 5000);
    }, []);

    return (
        <>
            {/* Background Particles - spread across screen when cards appear */}
            <AnimatePresence>
                {showBackgroundParticles && (
                    <motion.div
                        className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1 }}
                    >
                        {/* Create 100 tiny colored balls spreading around */}
                        {[...Array(100)].map((_, i) => {
                            const colors = [
                                'from-electric-blue to-cyan-accent',
                                'from-purple-accent to-electric-blue',
                                'from-cyan-accent to-white',
                                'from-white to-electric-blue',
                            ];
                            const color = colors[i % colors.length];

                            // Random positions across the entire viewport
                            const startX = window.innerWidth / 2;
                            const startY = window.innerHeight / 2;
                            const endX = Math.random() * window.innerWidth;
                            const endY = Math.random() * window.innerHeight;
                            const size = 4 + Math.random() * 8; // 4-12px balls
                            const delay = Math.random() * 0.3;

                            return (
                                <motion.div
                                    key={i}
                                    className={`absolute w-${Math.round(size)}px h-${Math.round(size)}px rounded-full bg-gradient-to-br ${color} blur-sm`}
                                    style={{
                                        width: `${size}px`,
                                        height: `${size}px`,
                                    }}
                                    initial={{
                                        x: startX,
                                        y: startY,
                                        scale: 0,
                                        opacity: 0
                                    }}
                                    animate={{
                                        x: endX,
                                        y: endY,
                                        scale: 1,
                                        opacity: [0, 0.8, 0.6, 0]
                                    }}
                                    transition={{
                                        duration: 2 + Math.random() * 2,
                                        delay,
                                        ease: "easeOut"
                                    }}
                                />
                            );
                        })}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* AhiLight Text with Explosion Effect */}
            <AnimatePresence>
                {titleComplete && showAhiLight && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        {/* Explosion particles - Enhanced */}
                        {exploding && (
                            <>
                                {/* Flash of light */}
                                <motion.div
                                    className="absolute w-96 h-96 rounded-full bg-white"
                                    initial={{ scale: 0, opacity: 1 }}
                                    animate={{
                                        scale: [0, 2, 0],
                                        opacity: [1, 0.8, 0]
                                    }}
                                    transition={{ duration: 0.3 }}
                                />

                                {/* Large particles with gradient colors */}
                                {[...Array(50)].map((_, i) => {
                                    const angle = (i / 50) * Math.PI * 2;
                                    const distance = 300 + (i % 5) * 100;
                                    const colors = [
                                        "from-white via-cyan-400 to-blue-500",
                                        "from-white via-purple-400 to-indigo-500",
                                        "from-cyan-300 via-blue-400 to-purple-500",
                                        "from-white via-electric-blue to-cyan-500"
                                    ];
                                    const colorClass = colors[i % colors.length];
                                    const size = i % 3 === 0 ? 'w-6 h-6' : i % 2 === 0 ? 'w-4 h-4' : 'w-3 h-3';

                                    return (
                                        <motion.div
                                            key={i}
                                            className={`absolute ${size} rounded-full bg-gradient-to-br ${colorClass}`}
                                            style={{
                                                boxShadow: '0 0 20px rgba(0, 242, 255, 0.8)'
                                            }}
                                            initial={{
                                                x: 0,
                                                y: 0,
                                                scale: 0,
                                                opacity: 1
                                            }}
                                            animate={{
                                                x: Math.cos(angle) * distance + (Math.random() - 0.5) * 100,
                                                y: Math.sin(angle) * distance + (Math.random() - 0.5) * 100,
                                                scale: [0, 1.2, 0.8, 0],
                                                opacity: [1, 1, 0.8, 0],
                                                rotate: [0, 360]
                                            }}
                                            transition={{
                                                duration: 0.8 + Math.random() * 0.4,
                                                ease: "easeOut"
                                            }}
                                        />
                                    );
                                })}
                            </>
                        )}

                        {/* Main Text */}
                        <motion.div
                            className="relative"
                            animate={
                                exploding
                                    ? {
                                        scale: [1, 1.5, 2],
                                        opacity: [1, 0.7, 0],
                                        filter: ["blur(0px)", "blur(4px)", "blur(20px)"]
                                    }
                                    : {
                                        scale: [0.5, 1],
                                        opacity: [0, 1]
                                    }
                            }
                            transition={{
                                duration: exploding ? 0.4 : 0.6,
                                ease: exploding ? "easeIn" : "easeOut"
                            }}
                        >
                            {/* Multiple shockwave rings during explosion */}
                            {exploding && (
                                <>
                                    <motion.div
                                        className="absolute inset-0 rounded-full border-8 border-white"
                                        style={{ boxShadow: '0 0 40px rgba(255, 255, 255, 0.8)' }}
                                        animate={{
                                            scale: [1, 4],
                                            opacity: [1, 0]
                                        }}
                                        transition={{ duration: 0.5 }}
                                    />
                                    <motion.div
                                        className="absolute inset-0 rounded-full border-6 border-cyan-400"
                                        style={{ boxShadow: '0 0 30px rgba(0, 242, 255, 0.6)' }}
                                        animate={{
                                            scale: [1, 5],
                                            opacity: [0.8, 0]
                                        }}
                                        transition={{ duration: 0.6, delay: 0.05 }}
                                    />
                                    <motion.div
                                        className="absolute inset-0 rounded-full border-4 border-purple-400"
                                        style={{ boxShadow: '0 0 25px rgba(168, 85, 247, 0.5)' }}
                                        animate={{
                                            scale: [1, 6],
                                            opacity: [0.6, 0]
                                        }}
                                        transition={{ duration: 0.7, delay: 0.1 }}
                                    />
                                    <motion.div
                                        className="absolute inset-0 rounded-full border-4 border-blue-500"
                                        animate={{
                                            scale: [1, 7],
                                            opacity: [0.5, 0]
                                        }}
                                        transition={{ duration: 0.8, delay: 0.15 }}
                                    />
                                    <motion.div
                                        className="absolute inset-0 rounded-full border-3 border-electric-blue"
                                        animate={{
                                            scale: [1, 8],
                                            opacity: [0.4, 0]
                                        }}
                                        transition={{ duration: 0.9, delay: 0.2 }}
                                    />
                                </>
                            )}

                            {/* Main glow */}
                            <h1 className="absolute inset-0 text-8xl font-bold text-white blur-xl opacity-60">
                                AhiLight
                            </h1>
                            {/* Main text */}
                            <h1 className="relative text-8xl font-bold text-white">
                                AhiLight
                            </h1>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <Section background="transparent" className="py-12 md:py-16 lg:py-24">
                <div className="container mx-auto px-4">
                    {/* Title */}
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

                    {/* Cards - Appear from center after explosion */}
                    <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">

                        {/* Security Operations Card */}
                        <motion.div
                            initial={{ scale: 0, opacity: 0, x: 0, y: 0 }}
                            animate={
                                showCards
                                    ? {
                                        scale: 1,
                                        opacity: 1,
                                        x: 0,
                                        y: 0,
                                        transition: {
                                            duration: 0.8,
                                            type: "spring",
                                            stiffness: 150,
                                            damping: 15
                                        }
                                    }
                                    : { scale: 0, opacity: 0 }
                            }
                            className="group relative h-full"
                        >
                            {/* Glow */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={
                                    showCards
                                        ? {
                                            opacity: [0, 0.7, 0.3],
                                            transition: {
                                                delay: 0.4,
                                                duration: 1.2,
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

                        {/* Expanding Horizons Card */}
                        <motion.div
                            initial={{ scale: 0, opacity: 0, x: 0, y: 0 }}
                            animate={
                                showCards
                                    ? {
                                        scale: 1,
                                        opacity: 1,
                                        x: 0,
                                        y: 0,
                                        transition: {
                                            delay: 0.15,
                                            duration: 0.8,
                                            type: "spring",
                                            stiffness: 150,
                                            damping: 15
                                        }
                                    }
                                    : { scale: 0, opacity: 0 }
                            }
                            className="group relative h-full"
                        >
                            {/* Glow */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={
                                    showCards
                                        ? {
                                            opacity: [0, 0.7, 0.3],
                                            transition: {
                                                delay: 0.55,
                                                duration: 1.2,
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
