"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Section } from "@/components/ui/section"
import Image from "next/image"
import { useState, useEffect } from "react"
import { TypewriterText } from "@/components/ui/typewriter-text"

export function Hero() {
    return (
        <Section background="transparent" className="min-h-screen flex items-center justify-center pt-32 pb-20 overflow-hidden relative">
            {/* Background Animated Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <FloatingElement delay={0} x="10%" y="20%" size={60} />
                <FloatingElement delay={1} x="80%" y="15%" size={100} />
                <FloatingElement delay={2} x="15%" y="70%" size={40} />
                <FloatingElement delay={3} x="85%" y="60%" size={80} />

                {/* Grid Pattern Overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]" />
            </div>

            <div className="container mx-auto px-4 text-center relative z-10 max-w-5xl">
                <div className="mb-8">
                    <TypewriterText
                        text="Engineering the Future of"
                        className="text-5xl md:text-7xl font-bold tracking-tight text-white block mb-2"
                        cursor={false}
                    />
                    <div className="pb-4">
                        <TypewriterText
                            text="Enterprise Intelligence"
                            delay={0.5}
                            cursor={false}
                            animation="clip"
                            className="text-5xl md:text-7xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-electric-blue to-cyan-accent inline-block"
                        />
                    </div>
                </div>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed"
                >
                    AhiLight builds research-driven software systems to solve the most critical operational challenges in the enterprise.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <Button size="lg" className="h-14 px-8 text-lg group">
                        Explore Our Research
                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                    <Button size="lg" variant="ghost" className="h-14 px-8 text-lg text-white hover:text-white hover:bg-white/10">
                        View Technologies
                    </Button>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
                    className="mt-20 relative w-full max-w-4xl mx-auto"
                >
                    <motion.div
                        animate={{
                            y: [-15, 15, -15],
                        }}
                        transition={{
                            duration: 6,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="relative z-10"
                    >
                        <div className="absolute -inset-1 bg-gradient-to-r from-electric-blue to-cyan-accent opacity-30 blur-2xl rounded-2xl" />
                        <FrameAnimation />
                    </motion.div>
                </motion.div>
            </div>
        </Section>
    )
}


function FrameAnimation() {
    const [currentFrame, setCurrentFrame] = useState(0);
    const totalFrames = 40;

    useEffect(() => {
        let timer: NodeJS.Timeout;

        if (currentFrame === totalFrames - 1) {
            // Pause on the last frame before restarting
            timer = setTimeout(() => {
                setCurrentFrame(0);
            }, 3000); // 3 second pause on the last frame
        } else {
            // Play next frame
            timer = setTimeout(() => {
                setCurrentFrame((prev) => prev + 1);
            }, 50); // 50ms per frame for smoother, video-like motion
        }

        return () => clearTimeout(timer);
    }, [currentFrame]);

    return (
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-black/50">
            {[...Array(totalFrames)].map((_, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 ${index === currentFrame ? "block z-10" : "hidden z-0"}`}
                >
                    <Image
                        src={`/frames/${index}.jpg`}
                        alt={`Enterprise SaaS Solution Frame ${index + 1}`}
                        fill
                        className="object-cover"
                        priority={true} // Priority true for all to ensure instant switching
                        loading="eager"
                    />
                </div>
            ))}
        </div>
    );
}

function FloatingElement({ delay, x, y, size }: { delay: number; x: string; y: string; size: number }) {
    return (
        <motion.div
            initial={{ y: 0, opacity: 0.3 }}
            animate={{
                y: [-10, 10, -10],
                rotate: [0, 5, -5, 0]
            }}
            transition={{
                duration: 5 + delay,
                repeat: Infinity,
                ease: "easeInOut",
                delay: delay
            }}
            style={{ left: x, top: y, width: size, height: size }}
            className="absolute rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/5"
        />
    )
}

