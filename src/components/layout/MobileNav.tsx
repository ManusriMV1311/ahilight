"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { Menu, X, Info, Eye, Package, Cpu, FlaskConical, Briefcase } from "lucide-react";

const navItems = [
    { title: "About", href: "/about", icon: <Info className="w-5 h-5" /> },
    { title: "Vision", href: "/vision", icon: <Eye className="w-5 h-5" /> },
    { title: "Products", href: "/products", icon: <Package className="w-5 h-5" /> },
    { title: "Technology", href: "/technology", icon: <Cpu className="w-5 h-5" /> },
    { title: "Research", href: "/research", icon: <FlaskConical className="w-5 h-5" /> },
    { title: "Careers", href: "/careers", icon: <Briefcase className="w-5 h-5" /> },
];

export function MobileNav() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="md:hidden">
            {/* Hamburger Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="fixed top-4 right-4 z-[60] p-2 bg-black/50 backdrop-blur-md border border-white/10 rounded-full text-white"
            >
                <Menu className="w-6 h-6" />
            </button>

            {/* Overlay Menu */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm"
                            onClick={() => setIsOpen(false)}
                        />

                        {/* Slide-over Panel */}
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed right-0 top-0 bottom-0 w-[80%] max-w-sm z-[70] bg-neutral-950 border-l border-white/10 shadow-2xl p-6 flex flex-col"
                        >
                            <div className="flex justify-end mb-8">
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 bg-white/5 rounded-full text-white hover:bg-white/10 transition-colors"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <nav className="flex flex-col gap-4">
                                {/* Product Shortcuts */}
                                <div className="mb-2">
                                    <div className="text-xs font-semibold text-white/40 uppercase tracking-widest px-2 mb-2">
                                        Products
                                    </div>
                                    <Link
                                        href="/products/cyberfortress"
                                        onClick={() => setIsOpen(false)}
                                        className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-electric-blue/10 to-transparent border border-electric-blue/20 hover:border-electric-blue/50 transition-all group"
                                    >
                                        <div className="p-2 rounded-lg bg-electric-blue text-black group-hover:bg-white group-hover:text-electric-blue transition-colors">
                                            <Package className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <span className="block text-base font-bold text-white group-hover:text-electric-blue transition-colors">
                                                CyberFortress
                                            </span>
                                            <span className="text-xs text-white/50">
                                                Enterprise Security Platform
                                            </span>
                                        </div>
                                    </Link>
                                </div>

                                <div className="h-px bg-white/10 my-1" />

                                {navItems.filter(item => item.title !== "Products").map((item, idx) => (
                                    <motion.div
                                        key={item.href}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                    >
                                        <Link
                                            href={item.href}
                                            onClick={() => setIsOpen(false)}
                                            className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-electric-blue/30 transition-all group"
                                        >
                                            <div className="p-2 rounded-lg bg-electric-blue/10 text-electric-blue group-hover:bg-electric-blue/20 transition-colors">
                                                {item.icon}
                                            </div>
                                            <span className="text-lg font-medium text-white/90 group-hover:text-white">
                                                {item.title}
                                            </span>
                                        </Link>
                                    </motion.div>
                                ))}
                            </nav>

                            <div className="mt-auto pt-8 border-t border-white/10">
                                <p className="text-sm text-white/40 text-center">
                                    © 2026 AhiLight Inc.
                                </p>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
