"use client";
import React from "react";
import { FloatingDock } from "@/components/ui/floating-dock";
import {
    IconHome,
    IconInfoCircle,
    IconBulb,
    IconPackage,
    IconCpu,
    IconFileText,
    IconBriefcase,
} from "@tabler/icons-react";
import Link from "next/link";

const navItems = [
    { title: "Home", icon: <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />, href: "/" },
    { title: "About", icon: <IconInfoCircle className="h-full w-full text-neutral-500 dark:text-neutral-300" />, href: "/about" },
    { title: "Vision", icon: <IconBulb className="h-full w-full text-neutral-500 dark:text-neutral-300" />, href: "/vision" },
    { title: "Products", icon: <IconPackage className="h-full w-full text-neutral-500 dark:text-neutral-300" />, href: "/products" },
    { title: "Technology", icon: <IconCpu className="h-full w-full text-neutral-500 dark:text-neutral-300" />, href: "/technology" },
    { title: "Research", icon: <IconFileText className="h-full w-full text-neutral-500 dark:text-neutral-300" />, href: "/research" },
    { title: "Careers", icon: <IconBriefcase className="h-full w-full text-neutral-500 dark:text-neutral-300" />, href: "/careers" },
];

export function Navbar() {
    return (
        <>
            {/* Brand Logo - Top Left */}
            <Link
                href="/"
                className="fixed top-8 left-8 z-50 flex items-center gap-2 group hidden md:flex"
            >
                <div className="bg-gradient-to-br from-teal-500 to-teal-300 p-2 rounded-lg group-hover:scale-105 transition-transform shadow-lg shadow-teal-500/20">
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-black"
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
                <span className="text-xl font-bold tracking-tight text-white transition-colors group-hover:text-teal-400 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                    AhiLight
                </span>
            </Link>

            {/* Floating Dock - Centered */}
            <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50">
                <FloatingDock
                    items={navItems}
                    desktopClassName="bg-black/40 backdrop-blur-xl border border-white/10"
                    mobileClassName="bg-black/60 backdrop-blur-xl translate-y-20"
                />
            </div>

            <Link
                href="/contact"
                className="fixed top-8 right-8 z-50 px-6 py-3 bg-teal-500 text-white rounded-full font-semibold hover:bg-teal-400 transition-all hover:scale-105 hover:shadow-lg hover:shadow-teal-500/50 hidden md:block" // Hidden on mobile to avoid clutter or overlapping
            >
                Contact Us
            </Link>
            {/* Mobile Contact Button - positioned bottom right or integrated? keeping it hidden on mobile for now per design or maybe absolute top right works */}
            <Link
                href="/contact"
                className="fixed top-4 right-4 z-50 px-4 py-2 bg-teal-500/90 text-white text-sm rounded-full font-semibold md:hidden"
            >
                Contact
            </Link>
        </>
    );
}
