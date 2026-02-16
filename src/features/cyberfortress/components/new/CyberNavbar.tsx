"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Box, Shield, Menu, X, LayoutGrid, Server, ShieldCheck, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { CyberFloatingDock } from "@/features/cyberfortress/components/new/CyberFloatingDock";
import { BrandIcon } from "@/components/ui/icons/BrandIcon";

export function CyberNavbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Navigation items for FloatingDock
    const navItems = [
        {
            title: "Features",
            icon: <LayoutGrid className="h-5 w-5" />,
            href: "/products/cyberfortress/features"
        },
        {
            title: "Architecture",
            icon: <Server className="h-5 w-5" />,
            href: "/products/cyberfortress/architecture"
        },
        {
            title: "Security",
            icon: <ShieldCheck className="h-5 w-5" />,
            href: "/products/cyberfortress/security"
        },
        {
            title: "Use Cases",
            icon: <FileText className="h-5 w-5" />,
            href: "/products/cyberfortress/use-cases"
        },
    ];

    const mobileNavLinks = [
        { name: "Features", href: "/products/cyberfortress/features" },
        { name: "Architecture", href: "/products/cyberfortress/architecture" },
        { name: "Security", href: "/products/cyberfortress/security" },
        { name: "Use Cases", href: "/products/cyberfortress/use-cases" },
    ];

    return (
        <>
            {/* 1. Floating Logo (Top Left) */}
            <div className="fixed top-6 left-6 z-[100] flex items-center gap-4 bg-black/40 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full hover:bg-black/60 transition-all">
                {/* AhiLight Home Link */}
                <Link href="/" className="flex items-center gap-2 group/brand hover:opacity-80 transition-opacity">
                    <div className="bg-gradient-to-br from-blue-600 to-cyan-500 p-1.5 rounded-lg shadow-lg shadow-blue-500/20 group-hover/brand:scale-105 transition-transform">
                        <BrandIcon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-sm font-bold tracking-tight text-white hidden sm:inline-block">AhiLight</span>
                </Link>

                {/* Separator */}
                <div className="h-6 w-px bg-white/10"></div>

                {/* CyberFortress Product Link */}
                <Link href="/products/cyberfortress" className="flex items-center gap-2 group/product hover:opacity-80 transition-opacity">
                    <div className="bg-gradient-to-br from-red-600 to-red-900 p-1.5 rounded-full shadow-lg shadow-red-900/20 group-hover/product:scale-105 transition-transform">
                        <Shield className="w-4 h-4 text-white fill-current/20" />
                    </div>
                    <span className="text-sm font-bold text-white tracking-wide">CyberFortress</span>
                </Link>
            </div>

            {/* 2. Floating Nav Dock (Top Center) - Desktop Only */}
            {/* 2. Floating Nav Dock (Top Center) - Desktop Only */}
            {/* 2. Floating Nav Dock (Top Center) - Desktop Only */}
            <div className="hidden md:block fixed z-[100] top-6 left-1/2 -translate-x-1/2">
                <CyberFloatingDock items={navItems} />
            </div>

            {/* 3. Floating CTA / Mobile Toggle (Top Right) */}
            <div className="fixed top-6 right-6 z-[100] flex items-center gap-3">
                {/* Desktop CTA */}
                {/* Desktop CTA Removed - Moved to Footer */}

                {/* Mobile Toggle */}
                <button
                    className="md:hidden p-3 bg-black/40 backdrop-blur-md border border-white/10 rounded-full text-white hover:bg-black/60 hover:text-red-500 transition-colors"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[90] bg-black/80 backdrop-blur-sm md:hidden"
                            onClick={() => setIsMobileMenuOpen(false)}
                        />

                        {/* Slide-over Panel */}
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed right-0 top-0 bottom-0 w-[80%] max-w-sm z-[100] bg-neutral-950 border-l border-white/10 shadow-2xl p-6 flex flex-col md:hidden"
                        >
                            <div className="flex justify-end mb-8">
                                <button
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="p-2 bg-white/5 rounded-full text-white hover:bg-white/10 transition-colors"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <nav className="flex flex-col gap-4">
                                {mobileNavLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-red-500/30 transition-all group"
                                    >
                                        <span className="text-lg font-medium text-white/90 group-hover:text-red-400">
                                            {link.name}
                                        </span>
                                    </Link>
                                ))}

                                <div className="mt-4 pt-4 border-t border-white/10">
                                    <Link href="/products/cyberfortress/demo" onClick={() => setIsMobileMenuOpen(false)}>
                                        <button className="btn-premium w-full py-3 text-sm">
                                            Request Demo
                                        </button>
                                    </Link>
                                </div>
                            </nav>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
