"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, Box, Shield, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const products = [
    {
        name: "CyberFortress",
        href: "/products/cyberfortress",
        description: "Autonomous Enterprise Security Platform",
        icon: Shield,
        color: "text-electric-blue"
    },
    // Future products can be added here
];

export function ProductNavigation() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative z-50 mb-8 container mx-auto px-4 mt-8">
            <div className="flex items-center gap-4">
                {/* Product label removed */}

                <div
                    className=""
                    onMouseEnter={() => setIsOpen(true)}
                    onMouseLeave={() => setIsOpen(false)}
                    onClick={() => setIsOpen(!isOpen)} // Touch support
                >
                    <button
                        className={cn(
                            "flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all text-white font-medium",
                            isOpen && "bg-white/10 border-white/20"
                        )}
                    >
                        <Box className="w-4 h-4 text-electric-blue" />
                        <span>Select Product</span>
                        <ChevronDown className={cn("w-4 h-4 transition-transform duration-200", isOpen && "rotate-180")} />
                    </button>

                    <AnimatePresence>
                        {isOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                transition={{ duration: 0.2 }}
                                className="absolute top-full left-0 mt-2 w-full md:w-80 bg-[#0a0a0a] border border-white/10 rounded-xl shadow-2xl shadow-black/50 overflow-hidden z-[60]"
                            >
                                <div className="p-2">
                                    {products.map((product) => (
                                        <Link
                                            key={product.name}
                                            href={product.href}
                                            className="group flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors"
                                        >
                                            <div className={cn("p-2 rounded-lg bg-white/5 group-hover:bg-electric-blue/10 transition-colors", product.color)}>
                                                <product.icon className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2 text-white font-medium group-hover:text-electric-blue transition-colors">
                                                    {product.name}
                                                    <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                                </div>
                                                <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                                                    {product.description}
                                                </p>
                                            </div>
                                        </Link>
                                    ))}

                                    {/* Future placeholder */}
                                    <div className="mt-2 pt-2 border-t border-white/5 px-3 py-2 text-xs text-slate-500 text-center italic">
                                        More products coming soon
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
