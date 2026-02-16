"use client"

import { motion } from "framer-motion"
import { ArrowRight, Play, Shield, Activity, Globe, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Section } from "@/components/ui/section"
import { cn } from "@/lib/utils"

export function Hero() {
    return (
        <Section background="transparent" className="min-h-[80vh] md:min-h-screen flex items-center justify-center pt-24 pb-12 md:pt-28 md:pb-16 lg:pt-32 lg:pb-20 overflow-hidden relative">
            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-electric-blue/5 rounded-full blur-3xl" />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]" />
            </div>

            <div className="container mx-auto px-4 text-center relative z-10 max-w-6xl">

                {/* Status Pill */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex justify-center mb-8"
                >
                    <a href="#early-access" className="group flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-electric-blue/30 transition-all cursor-pointer">
                        <span className="flex h-2 w-2 relative">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-electric-blue opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-electric-blue"></span>
                        </span>
                        <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">
                            Now in Early Access — Request yours today
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-electric-blue group-hover:translate-x-0.5 transition-all" />
                    </a>
                </motion.div>

                {/* Main Headline */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-tight max-w-5xl mx-auto font-heading"
                >
                    Autonomous security that thinks like <span className="text-electric-blue">attackers</span>, responds like <span className="text-success-green">defenders</span>.
                </motion.h1>

                {/* Subline */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed"
                >
                    CyberFortress correlates behaviors across network, endpoint, and identity domains to detect and stop attack chains — before they complete.
                </motion.p>

                {/* CTAs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="flex flex-col items-center gap-6 mb-20"
                >
                    <Button size="lg" className="h-14 px-8 text-lg bg-electric-blue hover:bg-cyan-accent text-white shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] transition-all">
                        Request Early Access
                    </Button>
                    <button className="group flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white transition-colors">
                        <Play className="w-4 h-4 fill-current opacity-70" />
                        <span>Watch a 3-minute overview</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                </motion.div>

                {/* Dashboard Mockup Visual */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 40 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
                >
                    <motion.div
                        animate={{ y: [-10, 5, -10] }}
                        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                        className="relative mx-auto max-w-5xl rounded-xl bg-navy-card/80 border border-white/10 shadow-2xl backdrop-blur-sm overflow-hidden group"
                    >
                        {/* Glow effect behind */}
                        <div className="absolute -inset-1 bg-electric-blue/20 blur-3xl opacity-20 group-hover:opacity-30 transition-opacity duration-1000" />

                        {/* Mockup Top Bar */}
                        <div className="h-10 bg-navy-card border-b border-white/5 flex items-center px-4 gap-2">
                            <div className="flex gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-slate-700" />
                                <div className="w-3 h-3 rounded-full bg-slate-700" />
                                <div className="w-3 h-3 rounded-full bg-slate-700" />
                            </div>
                            <div className="ml-4 px-3 py-1 bg-black/30 rounded-md border border-white/5 text-xs text-slate-500 font-mono w-64 flex justify-between">
                                <span>app.cyberfortress.io/dashboard</span>
                                <Lock className="w-3 h-3" />
                            </div>
                        </div>

                        {/* Dashboard Content */}
                        <div className="p-6 grid grid-cols-12 gap-6 bg-deep-navy/90 text-left">

                            {/* Left Nav (Simulated) */}
                            <div className="col-span-1 hidden md:flex flex-col gap-4 items-center pt-2 border-r border-white/5 pr-4">
                                <div className="p-2 bg-electric-blue/10 rounded-lg text-electric-blue"><Activity className="w-5 h-5" /></div>
                                <div className="p-2 text-slate-500 hover:text-white"><Globe className="w-5 h-5" /></div>
                                <div className="p-2 text-slate-500 hover:text-white"><Shield className="w-5 h-5" /></div>
                            </div>

                            {/* Main Content */}
                            <div className="col-span-12 md:col-span-11 grid grid-cols-3 gap-6">
                                {/* Stats Row */}
                                <div className="col-span-3 grid grid-cols-1 md:grid-cols-4 gap-4">
                                    <div className="bg-navy-card p-4 rounded-lg border border-white/5">
                                        <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">Threat Score</div>
                                        <div className="text-2xl font-bold text-white flex items-center gap-2">
                                            Low <span className="text-xs px-2 py-0.5 rounded-full bg-success-green/20 text-success-green">12/100</span>
                                        </div>
                                    </div>
                                    <div className="col-span-2 bg-navy-card p-4 rounded-lg border border-white/5 relative overflow-hidden">
                                        <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">Active Monitoring</div>
                                        <div className="text-2xl font-bold text-white">10,248 Devices</div>
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2">
                                            <div className="flex gap-1">
                                                <div className="h-8 w-1 bg-electric-blue/20 rounded-full" />
                                                <div className="h-8 w-1 bg-electric-blue/40 rounded-full" />
                                                <div className="h-8 w-1 bg-electric-blue/60 rounded-full" />
                                                <div className="h-8 w-1 bg-electric-blue rounded-full" />
                                                <div className="h-8 w-1 bg-electric-blue/60 rounded-full" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-navy-card p-4 rounded-lg border border-white/5">
                                        <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">MTTD (Avg)</div>
                                        <div className="text-2xl font-bold text-electric-blue">4.2m</div>
                                    </div>
                                </div>

                                {/* Map / Graph Area */}
                                <div className="col-span-3 md:col-span-2 bg-navy-card h-64 rounded-lg border border-white/5 relative overflow-hidden group/map">
                                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-electric-blue/5 to-transparent" />
                                    <div className="absolute inset-4 border border-white/5 rounded dashed opacity-50" />

                                    {/* Simulated Map Points */}
                                    <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-slate-600 rounded-full" />
                                    <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-success-green/20 rounded-full flex items-center justify-center">
                                        <div className="w-1.5 h-1.5 bg-success-green rounded-full" />
                                    </div>
                                    <div className="absolute bottom-1/3 right-1/4 w-6 h-6 bg-error-red/20 rounded-full flex items-center justify-center animate-pulse">
                                        <div className="w-2 h-2 bg-error-red rounded-full" />
                                    </div>
                                    <div className="absolute top-10 right-10 px-3 py-1 bg-black/40 backdrop-blur rounded text-xs text-white border border-white/5">
                                        Live Activity Map
                                    </div>
                                </div>

                                {/* Alerts Feed */}
                                <div className="col-span-3 md:col-span-1 bg-navy-card h-64 rounded-lg border border-white/5 p-4 flex flex-col gap-3">
                                    <div className="text-xs text-slate-400 font-semibold mb-2">Recent Alerts</div>
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="flex gap-3 items-start p-2 rounded hover:bg-white/5 transition-colors cursor-pointer">
                                            <div className={cn("w-1.5 h-1.5 mt-1.5 rounded-full shrink-0", i === 1 ? "bg-error-red" : "bg-warning-amber")} />
                                            <div>
                                                <div className="text-xs text-white font-medium">{i === 1 ? "Lateral Movement Detected" : "Anomalous Login Pattern"}</div>
                                                <div className="text-[10px] text-slate-500">Device ID-394 • 2m ago</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </Section>
    )
}
