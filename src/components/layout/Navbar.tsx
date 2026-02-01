"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Box } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const navLinks = [
    { name: "About", href: "/about" },
    { name: "Vision", href: "/vision" },
    { name: "Products", href: "/products" },
    { name: "Technology", href: "/technology" },
    { name: "Research", href: "/research" },
    { name: "Careers", href: "/careers" },
]

export function Navbar() {
    const [isScrolled, setIsScrolled] = React.useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
    const pathname = usePathname()

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <>
            <header
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
                    isScrolled
                        ? "h-16 md:h-20 bg-deep-navy/80 backdrop-blur-md border-b border-white/10 shadow-lg"
                        : "h-20 md:h-24 bg-transparent"
                )}
            >
                <div className="container mx-auto px-4 h-full flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="bg-gradient-to-br from-electric-blue to-cyan-accent p-2 rounded-lg group-hover:scale-105 transition-transform">
                            <Box className="w-6 h-6 text-white" />
                        </div>
                        <span className={cn(
                            "text-xl font-bold tracking-tight transition-colors",
                            pathname === "/about" && !isScrolled ? "text-slate-900" : "text-white"
                        )}>
                            AhiLight
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden lg:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={cn(
                                    "relative text-sm font-medium transition-colors hover:text-cyan-accent",
                                    pathname === link.href
                                        ? "text-cyan-accent"
                                        : (pathname === "/about" && !isScrolled ? "text-slate-900 font-semibold" : "text-slate-300")
                                )}
                            >
                                {link.name}
                                {pathname === link.href && (
                                    <motion.div
                                        layoutId="underline"
                                        className="absolute left-0 right-0 -bottom-1 h-px bg-cyan-accent"
                                    />
                                )}
                            </Link>
                        ))}
                    </nav>

                    {/* CTA & Mobile Toggle */}
                    <div className="flex items-center gap-4">


                        <button
                            className="lg:hidden p-2 text-white"
                            onClick={() => setIsMobileMenuOpen(true)}
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </header >

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {
                    isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, x: "100%" }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed inset-0 z-[60] bg-deep-navy/95 backdrop-blur-xl lg:hidden"
                        >
                            <div className="flex flex-col h-full p-6">
                                <div className="flex items-center justify-between mb-10">
                                    <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2">
                                        <div className="bg-gradient-to-br from-electric-blue to-cyan-accent p-2 rounded-lg">
                                            <Box className="w-6 h-6 text-white" />
                                        </div>
                                        <span className="text-xl font-bold text-white">AhiLight</span>
                                    </Link>
                                    <button
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="p-2 text-slate-300 hover:text-white"
                                    >
                                        <X className="w-6 h-6" />
                                    </button>
                                </div>

                                <nav className="flex flex-col gap-6">
                                    {navLinks.map((link) => (
                                        <Link
                                            key={link.name}
                                            href={link.href}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className={cn(
                                                "text-2xl font-semibold transition-colors hover:text-cyan-accent",
                                                pathname === link.href ? "text-cyan-accent" : "text-white"
                                            )}
                                        >
                                            {link.name}
                                        </Link>
                                    ))}
                                </nav>

                                <div className="mt-auto">
                                    <Button className="w-full text-lg py-6">Partner with Us</Button>
                                </div>
                            </div>
                        </motion.div>
                    )
                }
            </AnimatePresence >
        </>
    )
}
