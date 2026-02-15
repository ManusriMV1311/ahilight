"use client"

import Link from "next/link"
import { BrandIcon } from "@/components/ui/icons/BrandIcon"

import { usePathname } from "next/navigation";

export function Footer() {
    const pathname = usePathname();
    const isCyberFortress = pathname?.startsWith('/products/cyberfortress');

    if (isCyberFortress) return null;

    return (
        <footer className="relative bg-transparent border-t border-white/10 pt-20 pb-10 overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">

                {/* Top Section: Brand & Newsletter */}
                <div className="flex flex-col lg:flex-row justify-between gap-12 mb-12 md:mb-20">
                    <div className="max-w-md">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="bg-gradient-to-br from-electric-blue to-cyan-accent p-1.5 rounded-lg">
                                <BrandIcon className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-2xl font-bold text-white tracking-tight font-brand">AhiLight</span>
                        </div>
                        <p className="text-slate-200 text-lg leading-relaxed mb-8">
                            We build software because we love stable systems. And because broken things keep us up at night.
                        </p>
                        <div className="flex gap-4">
                            {/* Social Placeholders */}
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="w-10 h-10 rounded-full bg-transparent border border-white/10 flex items-center justify-center text-slate-300 hover:border-white/30 hover:text-white transition-colors cursor-pointer">
                                    <div className="w-5 h-5 bg-current rounded-sm opacity-50" />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="w-full max-w-sm">
                        <h4 className="text-white font-bold mb-4">Read what we write</h4>
                        <div className="relative group">
                            <input
                                type="email"
                                placeholder="alice@example.com"
                                className="w-full px-6 py-4 bg-transparent border border-white/10 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-electric-blue/50 focus:ring-2 focus:ring-electric-blue/20 transition-all backdrop-blur-sm"
                            />
                            <button className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 bg-gradient-to-r from-electric-blue to-cyan-accent text-white rounded-full font-semibold hover:opacity-90 transition-all hover:scale-105 text-sm shadow-[0_0_10px_rgba(125,95,255,0.4)]">
                                Join in
                            </button>
                        </div>
                        <p className="text-xs text-slate-400 mt-3 pl-4">We only send emails when we have something to say.</p>
                    </div>
                </div>

                {/* Columns */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-12 md:mb-20">

                    {/* Column 1: Company */}
                    <div>
                        <h4 className="text-white font-bold mb-6">Company</h4>
                        <ul className="space-y-4 text-sm text-slate-300">
                            <li><Link href="/about" className="hover:text-electric-blue transition-colors">About</Link></li>
                            <li><Link href="/vision" className="hover:text-electric-blue transition-colors">Vision</Link></li>
                            <li><Link href="/research" className="hover:text-electric-blue transition-colors">Research</Link></li>
                            <li><Link href="/careers" className="hover:text-electric-blue transition-colors">Careers</Link></li>

                        </ul>
                    </div>

                    {/* Column 2: Products */}
                    <div>
                        <h4 className="text-white font-bold mb-6">Work</h4>
                        <ul className="space-y-4 text-sm text-slate-300">
                            <li><Link href="/products" className="hover:text-electric-blue transition-colors">Products</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Resources */}
                    <div>
                        <h4 className="text-white font-bold mb-6">Thinking</h4>
                        <ul className="space-y-4 text-sm text-slate-300">
                            <li><Link href="/research" className="hover:text-electric-blue transition-colors">Papers</Link></li>
                            <li><Link href="/blog" className="hover:text-electric-blue transition-colors">Blog</Link></li>
                            <li><Link href="/docs" className="hover:text-electric-blue transition-colors">Documentation</Link></li>
                            <li><Link href="/contact" className="hover:text-electric-blue transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Column 4: Legal */}
                    <div>
                        <h4 className="text-white font-bold mb-6">Legal</h4>
                        <ul className="space-y-4 text-sm text-slate-300">
                            <li><Link href="/privacy" className="hover:text-electric-blue transition-colors">Privacy</Link></li>
                            <li><Link href="/terms" className="hover:text-electric-blue transition-colors">Terms</Link></li>
                            <li><Link href="/security" className="hover:text-electric-blue transition-colors">Security</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400">
                    <div>&copy; 2026 AhiLight Inc. Crafted by humans.</div>
                    <div className="flex items-center gap-6">
                        <Link
                            href="/contact"
                            className="px-6 py-2 bg-gradient-to-r from-electric-blue to-cyan-accent text-white rounded-full font-semibold font-ui hover:opacity-90 transition-all hover:scale-105 hover:shadow-[0_0_15px_rgba(168,85,247,0.3)] text-sm no-underline"
                        >
                            Talk to us
                        </Link>
                    </div>
                </div>

            </div>
        </footer>
    )
}
