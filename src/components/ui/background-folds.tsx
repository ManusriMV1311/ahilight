"use client";

import { motion } from "framer-motion";

export function BackgroundFolds() {
    return (
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
            {/* Dark base */}
            <div className="absolute inset-0 bg-deep-navy" />

            {/* Moving Fold 1 - Blue/Cyan */}
            <motion.div
                className="absolute -top-[50%] -left-[20%] w-[100%] h-[100%] rounded-[40%] bg-gradient-to-br from-electric-blue/10 to-transparent blur-[120px]"
                animate={{
                    transform: [
                        "translate(0%, 0%) rotate(0deg) scale(1)",
                        "translate(10%, 10%) rotate(10deg) scale(1.1)",
                        "translate(-5%, 20%) rotate(-5deg) scale(0.9)",
                        "translate(0%, 0%) rotate(0deg) scale(1)"
                    ]
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />

            {/* Moving Fold 2 - Cyan/Purple Accent */}
            <motion.div
                className="absolute top-[20%] right-[0%] w-[80%] h-[80%] rounded-[100%] bg-gradient-to-tl from-cyan-accent/5 to-purple-500/5 blur-[100px]"
                animate={{
                    transform: [
                        "translate(0%, 0%) scale(1)",
                        "translate(-15%, -10%) scale(1.2)",
                        "translate(5%, -20%) scale(0.9)",
                        "translate(0%, 0%) scale(1)"
                    ]
                }}
                transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2
                }}
            />

            {/* Moving Fold 3 - Deep Blue Bottom */}
            <motion.div
                className="absolute -bottom-[40%] left-[10%] w-[120%] h-[100%] rounded-[50%] bg-gradient-to-t from-electric-blue/10 to-transparent blur-[140px]"
                animate={{
                    transform: [
                        "translate(0%, 0%) rotate(0deg)",
                        "translate(10%, -10%) rotate(5deg)",
                        "translate(-10%, -5%) rotate(-5deg)",
                        "translate(0%, 0%) rotate(0deg)"
                    ]
                }}
                transition={{
                    duration: 35,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 5
                }}
            />

            {/* Enhancing Overlay - Mesh Texture */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black_40%,transparent_100%)] opacity-30" />
        </div>
    );
}
