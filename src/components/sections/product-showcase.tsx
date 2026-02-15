"use client"

import { Section } from "@/components/ui/section"
import { Button } from "@/components/ui/button"
import { ArrowRight, Shield } from "lucide-react"
import Link from "next/link"

export function ProductShowcase() {
    return (
        <Section background="transparent" className="py-32">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 font-heading">Our Products</h2>
                    <p className="text-slate-400">Enterprise-grade software platforms, built to solve problems where failure is not an option.</p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8 items-start max-w-6xl mx-auto">

                    {/* Featured Card (CyberFortress) */}
                    <div className="lg:col-span-2 bg-navy-card border border-electric-blue/30 rounded-2xl p-8 md:p-12 relative overflow-hidden group hover:border-electric-blue/50 transition-colors">
                        <div className="absolute top-0 right-0 bg-electric-blue px-4 py-1 text-deep-navy font-bold text-xs uppercase tracking-wider rounded-bl-xl">
                            Available Now
                        </div>

                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 bg-electric-blue/10 rounded-lg flex items-center justify-center text-electric-blue">
                                <Shield className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-3xl font-bold text-white font-heading">CyberFortress</h3>
                                <div className="text-electric-blue text-sm font-medium">Autonomous Security for Enterprise Operations</div>
                            </div>
                        </div>

                        <p className="text-slate-300 mb-10 leading-relaxed max-w-2xl">
                            CyberFortress is an autonomous security platform that detects threats through behavioral correlation, responds with policy-driven automation, and maintains tamper-proof blockchain-backed audit trails. Built for enterprises managing complex, high-stakes environments — where security cannot rely on human reaction time.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link href="/cyberfortress">
                                <Button className="bg-electric-blue hover:bg-cyan-accent text-deep-navy font-bold px-8 h-12 transition-colors">
                                    Explore CyberFortress
                                </Button>
                            </Link>
                            <Button variant="outline" className="text-white border-white/20 hover:bg-white/5 h-12 px-8 hover:border-electric-blue hover:text-electric-blue transition-colors">
                                Request Demo
                            </Button>
                        </div>
                    </div>

                    {/* Small Cards Column */}
                    <div className="space-y-6">
                        {/* Infra Card */}
                        <div className="bg-navy-card border border-white/10 rounded-xl p-6 opacity-80 hover:opacity-100 transition-opacity">
                            <div className="flex justify-between items-start mb-4">
                                <h4 className="text-lg font-bold text-white">Next: Infrastructure Intelligence</h4>
                                <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-white/10 text-slate-400">In Research</span>
                            </div>
                            <p className="text-slate-400 text-sm mb-4">Self-healing systems for mission-critical infrastructure.</p>
                            <div className="text-electric-blue text-sm font-medium flex items-center gap-1 cursor-pointer hover:underline">
                                Read our vision <ArrowRight className="w-3 h-3" />
                            </div>
                        </div>

                        {/* Supply Chain Card */}
                        <div className="bg-navy-card border border-white/10 rounded-xl p-6 opacity-80 hover:opacity-100 transition-opacity">
                            <div className="flex justify-between items-start mb-4">
                                <h4 className="text-lg font-bold text-white">Roadmap: Supply Chain Correlation</h4>
                                <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-white/10 text-slate-400">Roadmap</span>
                            </div>
                            <p className="text-slate-400 text-sm mb-4">Real-time risk detection across global operations.</p>
                            <div className="text-electric-blue text-sm font-medium flex items-center gap-1 cursor-pointer hover:underline">
                                View research <ArrowRight className="w-3 h-3" />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </Section>
    )
}
