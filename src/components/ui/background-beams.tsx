"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const BackgroundBeams = ({ className }: { className?: string }) => {
    return (
        <div
            className={cn(
                "absolute inset-0 w-full h-full overflow-hidden pointer-events-none",
                className
            )}
        >
            <svg
                className="absolute w-full h-full pointer-events-none"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
            >
                <defs>
                    <linearGradient id="beam-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="transparent" />
                        <stop offset="50%" stopColor="var(--electric-blue)" stopOpacity="0.15" />
                        <stop offset="100%" stopColor="transparent" />
                    </linearGradient>
                    <filter id="blur-beam">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="1" />
                    </filter>
                </defs>

                {/* Beam 1 */}
                <motion.path
                    d="M-20 -20 L 120 120"
                    stroke="url(#beam-grad)"
                    strokeWidth="0.5"
                    filter="url(#blur-beam)"
                    initial={{ pathLength: 0, opacity: 0, x: -10 }}
                    animate={{
                        pathLength: [0, 1, 1, 0],
                        opacity: [0, 1, 1, 0],
                        x: [0, 0, 0, 0] // Static for now, pathLength creates the "shooting" effect if done right.
                        // Actually, to make it look like a beam moving:
                        // strokeDasharray + strokeDashoffset
                    }}
                // Transition is tricky without length.
                />
            </svg>

            {/* Use a simpler approach with div beams */}
            <div className="absolute inset-0 rotate-12 scale-150 opacity-20">
                <Beam delay={0} duration={8} top={10} left={-20} />
                <Beam delay={2} duration={12} top={40} left={-20} />
                <Beam delay={4} duration={10} top={70} left={-20} />
                <Beam delay={1} duration={15} top={-20} left={30} vertical />
            </div>
        </div>
    );
};

// Simple Beam Component
const Beam = ({ delay, duration, top, left, vertical = false }: any) => {
    return (
        <motion.div
            className={cn(
                "absolute bg-gradient-to-r from-transparent via-electric-blue to-transparent shadow-[0_0_15px_rgba(0,212,170,0.5)]",
                vertical ? "w-[2px] h-full" : "h-[2px] w-full"
            )}
            style={{
                top: `${top}%`,
                left: `${left}%`,
                width: vertical ? "2px" : "150%",
                height: vertical ? "150%" : "2px",
                transformOrigin: "left",
            }}
            initial={{ opacity: 0, x: vertical ? 0 : "-100%", y: vertical ? "-100%" : 0 }}
            animate={{
                opacity: [0, 1, 0.5, 0],
                x: vertical ? 0 : "100%",
                y: vertical ? "100%" : 0
            }}
            transition={{
                duration: duration,
                repeat: Infinity,
                delay: delay,
                ease: "linear",
            }}
        />
    )
}
