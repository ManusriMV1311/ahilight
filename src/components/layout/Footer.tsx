"use client"

import Link from "next/link"
import { Box } from "lucide-react"

export function Footer() {
    return (
        <footer className="relative bg-deep-navy border-t border-white/10 pt-20 pb-10 overflow-hidden">
            {/* Subtle radial glow background */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-teal-500/5 blur-[120px] rounded-full" />
            </div>

            {/* Subtle dotted grid background */}
            <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px] opacity-[0.03] pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">

                {/* Top Section: Brand & Newsletter */}
                <div className="flex flex-col lg:flex-row justify-between gap-12 mb-20">
                    <div className="max-w-md">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="bg-electric-blue p-1.5 rounded-lg">
                                <Box className="w-6 h-6 text-deep-navy" />
                            </div>
                            <span className="text-2xl font-bold text-white tracking-tight">AhiLight</span>
                        </div>
                        <p className="text-slate-200 text-lg leading-relaxed mb-8">
                            Building the foundational software systems that power the next generation of enterprise autonomy.
                        </p>
                        <div className="flex gap-4">
                            {/* Social Placeholders */}
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-300 hover:bg-white/10 hover:text-white transition-colors cursor-pointer">
                                    <div className="w-5 h-5 bg-current rounded-sm opacity-50" />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="w-full max-w-sm">
                        <h4 className="text-white font-bold mb-4">Stay Updated</h4>
                        <div className="relative group">
                            <input
                                type="email"
                                placeholder="Your email address"
                                className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-teal-500/50 focus:ring-2 focus:ring-teal-500/20 transition-all backdrop-blur-sm"
                            />
                            <button className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 bg-teal-500 text-white rounded-full font-semibold hover:bg-teal-400 transition-all hover:scale-105">
                                Subscribe
                            </button>
                        </div>
                        <p className="text-xs text-slate-400 mt-3 pl-4">Research updates and product announcements.</p>
                    </div>
                </div>

                {/* Columns */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-20">

                    {/* Column 1: Company */}
                    <div>
                        <h4 className="text-white font-bold mb-6">Company</h4>
                        <ul className="space-y-4 text-sm text-slate-300">
                            <li><Link href="/about" className="hover:text-electric-blue transition-colors">About</Link></li>
                            <li><Link href="/vision" className="hover:text-electric-blue transition-colors">Vision</Link></li>
                            <li><Link href="/research" className="hover:text-electric-blue transition-colors">Research</Link></li>
                            <li><Link href="/careers" className="hover:text-electric-blue transition-colors">Careers</Link></li>
                            <li><Link href="/contact" className="hover:text-electric-blue transition-colors">Press</Link></li>
                        </ul>
                    </div>

                    {/* Column 2: Products */}
                    <div>
                        <h4 className="text-white font-bold mb-6">Products</h4>
                        <ul className="space-y-4 text-sm text-slate-300">
                            <li><Link href="/cyberfortress" className="hover:text-electric-blue transition-colors">CyberFortress</Link></li>
                            <li><Link href="/products" className="hover:text-electric-blue transition-colors">Product Roadmap</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Resources */}
                    <div>
                        <h4 className="text-white font-bold mb-6">Resources</h4>
                        <ul className="space-y-4 text-sm text-slate-300">
                            <li><Link href="/research" className="hover:text-electric-blue transition-colors">Research Papers</Link></li>
                            <li><Link href="/blog" className="hover:text-electric-blue transition-colors">Blog</Link></li>
                            <li><Link href="/docs" className="hover:text-electric-blue transition-colors">Documentation</Link></li>
                            <li><Link href="/contact" className="hover:text-electric-blue transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Column 4: Legal */}
                    <div>
                        <h4 className="text-white font-bold mb-6">Legal</h4>
                        <ul className="space-y-4 text-sm text-slate-300">
                            <li><Link href="/privacy" className="hover:text-electric-blue transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="hover:text-electric-blue transition-colors">Terms of Service</Link></li>
                            <li><Link href="/security" className="hover:text-electric-blue transition-colors">Security Disclosure</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400">
                    <div>&copy; 2026 AhiLight Inc. All rights reserved. v2.0</div>
                    <div className="flex items-center gap-6">
                        <span className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-success-green animate-pulse" />
                            All systems operational
                        </span>
                        <a href="mailto:security@ahilight.com" className="hover:text-slate-200 transition-colors">security@ahilight.com</a>

                    </div>
                </div>

            </div>
        </footer>
    )
}
