"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TypewriterTextProps {
    text: string | React.ReactNode;
    className?: string;
    delay?: number;
    cursor?: boolean;
    animation?: "character" | "clip";
}

export function TypewriterText({ text, className, delay = 0, cursor = true, animation }: TypewriterTextProps) {
    // Handle string content
    const textContent = typeof text === "string" ? text : "";
    const characters = Array.from(textContent);

    // If text is ReactNode (complex), we might just fade it in, 
    // but for this component, we primarily support strings for the typing effect.
    // If complex node, we fall back to simple reveal.

    if (typeof text !== "string") {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                className={className}
            >
                {text}
            </motion.div>
        );
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.03, // Speed of typing
                delayChildren: delay,
            },
        },
    };

    const childVariants = {
        hidden: { opacity: 0, y: 5 },
        visible: { opacity: 1, y: 0 },
    };

    if (animation === "clip") {
        return (
            <span className="inline-block relative">
                <motion.span
                    initial={{ opacity: 0, clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" }}
                    whileInView={{ opacity: 1, clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay, ease: "easeOut" }}
                    className={cn("inline-block align-bottom pb-1", className)}
                >
                    {textContent}
                </motion.span>
                {cursor && (
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                        className={cn(className, "inline-block ml-1 w-[2px] h-[1em] bg-electric-blue align-middle bg-none box-border p-0 my-0")}
                        style={{ backgroundClip: "border-box", WebkitBackgroundClip: "border-box", color: "transparent", backgroundImage: "none" }}
                    />
                )}
            </span>
        );
    }

    return (
        <motion.span
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className={cn("inline-block", className)}
        >
            {characters.map((char, index) => (
                <motion.span key={index} variants={childVariants} className="inline-block relative">
                    {/* Preserve spaces */}
                    {char === " " ? "\u00A0" : char}
                </motion.span>
            ))}
            {cursor && (
                <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                    className="inline-block ml-1 w-[2px] h-[1em] bg-electric-blue align-middle"
                />
            )}
        </motion.span>
    );
}
