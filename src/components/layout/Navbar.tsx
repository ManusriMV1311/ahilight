"use client";
import React from "react";
import { FloatingDock } from "@/components/ui/floating-dock";
import Link from "next/link";

import { Info, Eye, Package, Cpu, FlaskConical, Briefcase } from "lucide-react";

const navItems = [
    {
        title: "About",
        icon: (
            <div className="flex items-center gap-2">
                <Info className="h-5 w-5 text-electric-blue" />
                <span className="text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-electric-blue to-cyan-accent">About</span>
            </div>
        ),
        href: "/about"
    },
    {
        title: "Vision",
        icon: (
            <div className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-electric-blue" />
                <span className="text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-electric-blue to-cyan-accent">Vision</span>
            </div>
        ),
        href: "/vision"
    },
    {
        title: "Products",
        icon: (
            <div className="flex items-center gap-2">
                <Package className="h-5 w-5 text-electric-blue" />
                <span className="text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-electric-blue to-cyan-accent">Products</span>
            </div>
        ),
        href: "/products"
    },
    {
        title: "Technology",
        icon: (
            <div className="flex items-center gap-2">
                <Cpu className="h-5 w-5 text-electric-blue" />
                <span className="text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-electric-blue to-cyan-accent">Technology</span>
            </div>
        ),
        href: "/technology"
    },
    {
        title: "Research",
        icon: (
            <div className="flex items-center gap-2">
                <FlaskConical className="h-5 w-5 text-electric-blue" />
                <span className="text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-electric-blue to-cyan-accent">Research</span>
            </div>
        ),
        href: "/research"
    },
    {
        title: "Careers",
        icon: (
            <div className="flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-electric-blue" />
                <span className="text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-electric-blue to-cyan-accent">Careers</span>
            </div>
        ),
        href: "/careers"
    },
];

export function Navbar() {
    return (
        <>
            {/* Brand Logo - Top Left */}
            <Link
                href="/"
                className="fixed top-4 left-4 md:top-8 md:left-8 z-50 flex items-center gap-2 group"
            >
                <div className="bg-gradient-to-br from-electric-blue to-cyan-accent p-2 rounded-lg group-hover:scale-105 transition-transform shadow-lg shadow-electric-blue/20">
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-white"
                    >
                        <path
                            d="M12 3L20 7.5V16.5L12 21L4 16.5V7.5L12 3Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M12 8L16 10.5V15L12 17.5L8 15V10.5L12 8Z"
                            fill="currentColor"
                            stroke="none"
                        />
                    </svg>
                </div>
                <span className="text-xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-electric-blue to-cyan-accent bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                    AhiLight
                </span>
            </Link>

            {/* Floating Dock - Centered on Desktop, Bottom Right on Mobile */}
            <div className="fixed z-50 bottom-6 right-6 md:top-8 md:bottom-auto md:left-1/2 md:right-auto md:-translate-x-1/2">
                <FloatingDock
                    items={navItems}
                    desktopClassName="bg-black/40 backdrop-blur-xl border border-white/10"
                    mobileClassName="translate-y-0" // Removed translate-y-20 as we handle positioning in wrapper
                />
            </div>

            <Link
                href="/contact"
                className="fixed top-8 right-8 z-50 px-6 py-3 bg-gradient-to-r from-electric-blue to-cyan-accent text-white rounded-full font-semibold hover:opacity-90 transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] hidden md:block" // Hidden on mobile to avoid clutter or overlapping
            >
                Contact Us
            </Link>
            {/* Mobile Contact Button - positioned bottom right or integrated? keeping it hidden on mobile for now per design or maybe absolute top right works */}
            <Link
                href="/contact"
                className="fixed top-4 right-4 z-50 px-4 py-2 bg-gradient-to-r from-electric-blue to-cyan-accent text-white text-sm rounded-full font-semibold md:hidden hover:shadow-[0_0_20px_rgba(125,95,255,0.5)] transition-all"
            >
                Contact
            </Link>
        </>
    );
}
