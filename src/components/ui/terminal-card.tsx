"use client";

import { cn } from "@/utils/cn";
import { motion } from "framer-motion";
import { useRef, useState } from "react";

export const TerminalCard = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className={cn(
                "relative w-full h-full bg-slate-950/80 backdrop-blur-md rounded-lg overflow-hidden border border-slate-800 group",
                className
            )}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Terminal Header */}
            <div className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 border-b border-slate-800">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                <div className="ml-2 text-xs font-mono text-slate-500">bash — 80x24</div>
            </div>

            {/* Content Area */}
            <div className="p-6 relative z-10 font-mono text-sm leading-relaxed">
                {/* Grid grid background overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,22,29,1)_2px,transparent_2px),linear-gradient(90deg,rgba(18,22,29,1)_2px,transparent_2px)] bg-[size:30px_30px] opacity-20 pointer-events-none" />

                {children}

                {/* Compiling Progress Bar (Appears on Hover) */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-slate-800">
                    <motion.div
                        className="h-full bg-gradient-to-r from-green-400 to-emerald-500"
                        initial={{ width: "0%" }}
                        animate={{ width: isHovered ? "100%" : "0%" }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                    />
                </div>

                {/* Status Text */}
                <motion.div
                    className="absolute bottom-3 right-4 text-xs font-mono text-emerald-400"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    transition={{ delay: 1.4 }}
                >
                    {isHovered ? "> COMPLETED" : ""}
                </motion.div>
            </div>

            {/* Scanline Effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/5 to-transparent pointer-events-none translate-y-[-100%] group-hover:animate-scanline" />

            {/* Glowing Border on Hover */}
            <div className="absolute inset-0 border border-emerald-500/0 group-hover:border-emerald-500/50 transition-colors duration-300 rounded-lg pointer-events-none" />
        </div>
    );
};
