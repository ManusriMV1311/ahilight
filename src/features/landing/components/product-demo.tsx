"use client"

import { motion } from "framer-motion"
import { Section } from "@/components/ui/section"
import { Shield, Server, Terminal, AlertTriangle, CheckCircle, Globe } from "lucide-react"

export function ProductDemo() {
    return (
        <Section background="transparent" className="relative overflow-hidden py-32">
            <div className="text-center mb-20">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-heading">
                    Inside CyberFortress
                </h2>
                <p className="text-slate-400 max-w-2xl mx-auto">
                    A unified command center for autonomous defense.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative h-[800px] lg:h-[600px]">

                {/* Panel 1: Threat Map (Bottom Left) */}
                <motion.div
                    initial={{ opacity: 0, y: 40, rotate: -3 }}
                    whileInView={{ opacity: 1, y: 0, rotate: -2 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="lg:col-span-4 lg:col-start-1 absolute lg:relative z-10 top-0 lg:top-auto w-full max-w-md"
                >
                    <div className="bg-navy-card border border-white/10 rounded-xl overflow-hidden shadow-2xl">
                        <div className="bg-black/40 px-4 py-2 flex items-center justify-between border-b border-white/5">
                            <span className="text-xs font-semibold text-slate-400">Threat Intelligence</span>
                            <div className="flex gap-1.5">
                                <div className="w-2 h-2 rounded-full bg-slate-600" />
                                <div className="w-2 h-2 rounded-full bg-slate-600" />
                            </div>
                        </div>
                        <div className="p-4 bg-deep-navy/90 h-80 relative">
                            {/* Mock Map */}
                            <div className="absolute inset-4 rounded border border-white/5 bg-electric-blue/5 flex items-center justify-center opacity-50">
                                <Globe className="w-32 h-32 text-slate-700 opacity-20" />
                            </div>
                            {/* Points */}
                            <div className="absolute top-1/3 left-1/3 w-3 h-3 bg-error-red/80 rounded-full animate-ping" />
                            <div className="absolute top-1/3 left-1/3 w-2 h-2 bg-error-red rounded-full" />

                            {/* Stats Overlay */}
                            <div className="absolute bottom-4 left-4 right-4 bg-navy-card/90 backdrop-blur border border-white/10 rounded p-3 text-xs">
                                <div className="flex justify-between mb-2">
                                    <span className="text-slate-400">Active Threats</span>
                                    <span className="text-error-red font-bold">3</span>
                                </div>
                                <div className="flex justify-between mb-2">
                                    <span className="text-slate-400">Blocked Today</span>
                                    <span className="text-success-green font-bold">847</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-400">MTTD</span>
                                    <span className="text-electric-blue font-bold">4.2 min</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>


                {/* Panel 2: Device Posture (Center - Main) */}
                <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="lg:col-span-6 lg:col-start-4 absolute lg:relative z-20 top-20 lg:top-auto w-full"
                >
                    <div className="bg-navy-card border border-white/10 rounded-xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                        <div className="bg-black/40 px-4 py-3 flex items-center gap-4 border-b border-white/5">
                            <Shield className="w-4 h-4 text-electric-blue" />
                            <span className="text-sm font-semibold text-white">Device Posture Management</span>
                        </div>
                        <div className="p-6 bg-deep-navy/95 min-h-[400px]">
                            {/* Summary Bar */}
                            <div className="flex gap-4 mb-6 text-xs border-b border-white/5 pb-4">
                                <div className="px-3 py-1 rounded bg-white/5 text-slate-300 border border-white/5">Total: <span className="text-white font-bold">2,847</span></div>
                                <div className="px-3 py-1 rounded bg-success-green/10 text-success-green border border-success-green/20">Compliant: <span className="font-bold">2,791</span></div>
                                <div className="px-3 py-1 rounded bg-warning-amber/10 text-warning-amber border border-warning-amber/20">Review: <span className="font-bold">43</span></div>
                                <div className="px-3 py-1 rounded bg-error-red/10 text-error-red border border-error-red/20">Isolated: <span className="font-bold">13</span></div>
                            </div>

                            {/* Device Grid */}
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {/* Device Card Active */}
                                <div className="p-3 rounded border border-electric-blue/50 bg-electric-blue/5">
                                    <div className="flex justify-between items-start mb-2">
                                        <Server className="w-4 h-4 text-slate-300" />
                                        <div className="w-2 h-2 rounded-full bg-success-green" />
                                    </div>
                                    <div className="text-sm font-bold text-white mb-0.5">Workstation-88</div>
                                    <div className="text-[10px] text-slate-500">Last seen: 2s ago</div>
                                    <div className="mt-2 text-[10px] bg-electric-blue/20 text-electric-blue px-1.5 py-0.5 rounded w-fit">Zero Trust: Active</div>
                                </div>

                                {/* Other Cards */}
                                {[1, 2, 3, 4, 5].map(i => (
                                    <div key={i} className="p-3 rounded border border-white/5 bg-navy-card hover:bg-white/5 transition-colors">
                                        <div className="flex justify-between items-start mb-2">
                                            <Server className="w-4 h-4 text-slate-500" />
                                            <div className="w-2 h-2 rounded-full bg-slate-700" />
                                        </div>
                                        <div className="text-sm font-medium text-slate-300 mb-0.5">Server-{90 + i}</div>
                                        <div className="text-[10px] text-slate-600">Last seen: 5m ago</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Panel 3: Honeypot (Right Bottom) */}
                <motion.div
                    initial={{ opacity: 0, y: 60, rotate: 2 }}
                    whileInView={{ opacity: 1, y: 0, rotate: 3 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="lg:col-span-4 lg:col-start-9 absolute lg:relative z-10 top-40 lg:top-auto w-full max-w-md right-0"
                >
                    <div className="bg-[#0D1117] border border-white/10 rounded-xl overflow-hidden shadow-2xl font-mono text-xs">
                        <div className="bg-slate-800/50 px-4 py-2 flex items-center justify-between border-b border-white/5">
                            <span className="text-slate-400">Decoy System #4</span>
                            <div className="px-2 py-0.5 bg-error-red/20 text-error-red rounded text-[10px] uppercase tracking-wider animate-pulse">Engaged</div>
                        </div>
                        <div className="p-4 h-80 overflow-hidden text-slate-300">
                            <div className="mb-2 opacity-50">[14:32:07] ATTACKER &gt; ssh root@decoy-prod-03</div>
                            <div className="mb-2 text-success-green">[14:32:08] HONEYPOT &gt; Welcome to Ubuntu 22.04 LTS</div>
                            <div className="mb-2 opacity-50">[14:32:09] ATTACKER &gt; whoami</div>
                            <div className="mb-2 text-success-green">[14:32:09] HONEYPOT &gt; root</div>
                            <div className="mb-2 opacity-50 bg-white/5 -mx-4 px-4 py-1 border-l-2 border-amber-500">[14:32:11] ATTACKER &gt; cat /etc/shadow</div>
                            <div className="mt-4 p-3 bg-electric-blue/10 border border-electric-blue/30 rounded text-electric-blue">
                                ⚡ THREAT CAPTURED<br />
                                Zero-day credential harvesting TTP logged for behavioral analysis.
                            </div>
                            <div className="mt-4 grid grid-cols-2 gap-2 text-[10px] text-slate-500">
                                <div>Duration: 47 min</div>
                                <div>Exploits: 3</div>
                            </div>
                        </div>
                    </div>
                </motion.div>

            </div>
        </Section>
    )
}
