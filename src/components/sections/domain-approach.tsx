"use client"
/* eslint-disable react-hooks/exhaustive-deps */

import { Section } from "@/components/ui/section"
import { GlareCard } from "@/components/ui/glare-card"
import { Shield, Activity, Sparkles, ArrowRight } from "lucide-react"
import Link from "next/link"
import { TypewriterEffect } from "@/components/ui/typewriter-effect"
import { Button } from "@/components/ui/button"
import { useState, useEffect, useRef, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { DigitalGridBackground } from "@/components/backgrounds/DigitalGridBackground"

export function DomainApproach({ onAnimationComplete }: { onAnimationComplete?: (complete: boolean) => void }) {
    const [showAhiLight, setShowAhiLight] = useState(false);
    const [exploding, setExploding] = useState(false);
    const [showCards, setShowCards] = useState(false);
    const [titleComplete, setTitleComplete] = useState(false);
    const [showFloatingBalls, setShowFloatingBalls] = useState(false);
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

        // Show cards (right after explosion starts)
        setTimeout(() => {
            setShowCards(true);
            setShowAhiLight(false); // Hide text
        }, 3800);

        // Start floating balls AFTER cards - emanating from center
        setTimeout(() => {
            setShowFloatingBalls(true);
        }, 4200);

        // Animation complete - show rest of page
        setTimeout(() => {
            onAnimationComplete?.(true);
        }, 5000);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const explosionParticles = useMemo(() => {
        return Array.from({ length: 50 }).map((_, i) => {
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

            return {
                id: i,
                angle,
                distance,
                colorClass,
                size,
                xOffset: (Math.random() - 0.5) * 100,
                yOffset: (Math.random() - 0.5) * 100,
                duration: 0.8 + Math.random() * 0.4
            };
        });
    }, []);

    const floatingBalls = useMemo(() => {
        return Array.from({ length: 15 }).map((_, i) => {
            const angle = (i / 15) * Math.PI * 2 + Math.random() * 0.2;
            const distance = 35 + Math.random() * 15;
            const endX = 50 + Math.cos(angle) * distance;
            const endY = 50 + Math.sin(angle) * distance;
            const delay = i * 0.08;
            const duration = 2 + Math.random() * 1;
            const size = 6 + Math.random() * 10;
            const colors = [
                'bg-gradient-to-br from-purple-500 to-blue-500',
                'bg-gradient-to-br from-cyan-400 to-blue-600',
                'bg-gradient-to-br from-purple-600 to-pink-500',
                'bg-gradient-to-br from-blue-400 to-cyan-300'
            ];
            const color = colors[i % colors.length];

            return {
                id: i,
                endX,
                endY,
                delay,
                duration,
                size,
                color,
                boxShadowSize: size * 3
            };
        });
    }, []);

    return (
        <>
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
                                {explosionParticles.map((p) => (
                                    <motion.div
                                        key={p.id}
                                        className={`absolute ${p.size} rounded-full bg-gradient-to-br ${p.colorClass}`}
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
                                            x: Math.cos(p.angle) * p.distance + p.xOffset,
                                            y: Math.sin(p.angle) * p.distance + p.yOffset,
                                            scale: [0, 1.2, 0.8, 0],
                                            opacity: [1, 1, 0.8, 0],
                                            rotate: [0, 360]
                                        }}
                                        transition={{
                                            duration: p.duration,
                                            ease: "easeOut"
                                        }}
                                    />
                                ))}
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
                            <h1 className="absolute inset-0 text-4xl md:text-6xl lg:text-8xl font-bold text-white blur-xl opacity-60">
                                AhiLight
                            </h1>
                            {/* Main text */}
                            <h1 className="relative text-4xl md:text-6xl lg:text-8xl font-bold text-white">
                                AhiLight
                            </h1>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Balls - Continuous Loop */}
            <AnimatePresence>
                {showFloatingBalls && (
                    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
                        {floatingBalls.map((b) => (
                            <motion.div
                                key={b.id}
                                animate={{
                                    x: ['50vw', `${b.endX}vw`],
                                    y: ['50vh', `${b.endY}vh`],
                                    opacity: [0, 1, 0],
                                    scale: [0, 1.5, 0]
                                }}
                                transition={{
                                    duration: b.duration,
                                    delay: b.delay,
                                    ease: "easeOut"
                                }}
                                className={`absolute rounded-full ${b.color}`}
                                style={{
                                    width: `${b.size}px`,
                                    height: `${b.size}px`,
                                    boxShadow: `0 0 ${b.boxShadowSize}px rgba(125, 95, 255, 0.6)`,
                                    filter: 'blur(0.5px)'
                                }}
                            />
                        ))}
                    </div>
                )}
            </AnimatePresence>

            <Section background="transparent" className="py-12 md:py-16 lg:py-24">
                <div className="container mx-auto px-4">
                    {/* Title - Pops out with cards */}
                    <motion.div
                        initial={{ scale: 1 }}
                        animate={
                            showCards
                                ? {
                                    scale: [1, 1.1, 1],
                                    transition: {
                                        duration: 0.6,
                                        times: [0, 0.5, 1],
                                        ease: "easeOut"
                                    }
                                }
                                : { scale: 1 }
                        }
                        className="max-w-3xl mb-12 md:mb-16 mx-auto text-center"
                    >
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
                    </motion.div>

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

            {/* Digital Grid Background - Fades in after explosion */}
            <AnimatePresence>
                {showCards && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 2, delay: 0.5 }}
                        className="fixed inset-0 z-0 pointer-events-none"
                    >
                        <DigitalGridBackground />
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
