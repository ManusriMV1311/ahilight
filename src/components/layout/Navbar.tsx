"use client";
import React from "react";
import { FloatingDock } from "@/components/ui/floating-dock";
import { MobileNav } from "@/components/layout/MobileNav";
import Link from "next/link";

import { Info, Eye, Package, Cpu, FlaskConical, Briefcase } from "lucide-react";
import { BrandIcon } from "@/components/ui/icons/BrandIcon";

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

import { usePathname } from "next/navigation";

export function Navbar() {
    const pathname = usePathname();
    const isCyberFortress = pathname?.startsWith('/products/cyberfortress');

    if (isCyberFortress) return null;

    return (
        <>
            {/* Brand Logo - Top Left */}
            <Link
                href="/"
                className="fixed top-4 left-4 md:top-8 md:left-8 z-50 flex items-center gap-2 group"
            >
                <div className="bg-gradient-to-br from-electric-blue to-cyan-accent p-2 rounded-lg group-hover:scale-105 transition-transform shadow-lg shadow-electric-blue/20">
                    <BrandIcon className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-electric-blue to-cyan-accent bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 font-brand">
                    AhiLight
                </span>
            </Link>

            {/* Floating Dock - Desktop Only */}
            <div className="hidden md:block fixed z-50 md:top-8 md:left-1/2 md:-translate-x-1/2">
                <FloatingDock
                    items={navItems}
                    desktopClassName="bg-black/40 backdrop-blur-xl border border-white/10"
                    mobileClassName="hidden" // Redundant but safe
                />
            </div>

            {/* Mobile Navigation */}
            <MobileNav />

        </>
    );
}
