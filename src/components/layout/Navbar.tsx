"use client";
import React from "react";
import { FloatingDock } from "@/components/ui/floating-dock";
import Link from "next/link";

import { Info, Eye, Package, Cpu, FlaskConical, Briefcase } from "lucide-react";

const navItems = [
    {
        title: "About",
        icon: (
            <div className="flex items-center gap-2 h-full w-full justify-center">
                <Info className="h-5 w-5 text-white" />
                <span className="text-sm font-medium text-white font-ui hidden md:block">About</span>
            </div>
        ),
        href: "/about"
    },
    {
        title: "Vision",
        icon: (
            <div className="flex items-center gap-2 h-full w-full justify-center">
                <Eye className="h-5 w-5 text-white" />
                <span className="text-sm font-medium text-white font-ui hidden md:block">Vision</span>
            </div>
        ),
        href: "/vision"
    },
    {
        title: "Products",
        icon: (
            <div className="flex items-center gap-2 h-full w-full justify-center">
                <Package className="h-5 w-5 text-white" />
                <span className="text-sm font-medium text-white font-ui hidden md:block">Products</span>
            </div>
        ),
        href: "/products"
    },
    {
        title: "Technology",
        icon: (
            <div className="flex items-center gap-2 h-full w-full justify-center">
                <Cpu className="h-5 w-5 text-white" />
                <span className="text-sm font-medium text-white font-ui hidden md:block">Tech</span>
            </div>
        ),
        href: "/technology"
    },
    {
        title: "Research",
        icon: (
            <div className="flex items-center gap-2 h-full w-full justify-center">
                <FlaskConical className="h-5 w-5 text-white" />
                <span className="text-sm font-medium text-white font-ui hidden md:block">Research</span>
            </div>
        ),
        href: "/research"
    },
    {
        title: "Careers",
        icon: (
            <div className="flex items-center gap-2 h-full w-full justify-center">
                <Briefcase className="h-5 w-5 text-white" />
                <span className="text-sm font-medium text-white font-ui hidden md:block">Careers</span>
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
                <span className="text-xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-electric-blue to-cyan-accent bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 font-brand">
                    AhiLight
                </span>
            </Link>

            {/* Floating Dock - Centered on Desktop, Bottom Center on Mobile */}
            <div className="fixed z-50 bottom-6 left-1/2 -translate-x-1/2 md:top-8 md:bottom-auto md:left-1/2 md:right-auto md:-translate-x-1/2">
                <FloatingDock
                    items={navItems}
                    desktopClassName="bg-black/40 backdrop-blur-xl border border-white/10"
                    mobileClassName="translate-y-0 bg-black/40 backdrop-blur-xl border border-white/10 px-4 py-2 rounded-full"
                />
            </div>

        </>
    );
}
