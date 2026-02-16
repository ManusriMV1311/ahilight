"use client"

import { Section } from "@/components/ui/section"
import { Card } from "@/components/ui/card"
import { Shield, Server, Link } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Positioning() {
    return (
        <Section background="transparent" className="py-24">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-heading">
                        Building things people actually use.
                    </h2>
                    <p className="text-xl text-slate-400 leading-relaxed">
                        We don&apos;t chase trends. We start with the problem.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">

                    {/* Domain 1: Security */}
                    <div className="group relative">
                        <div className="absolute -inset-0.5 bg-gradient-to-b from-electric-blue to-transparent opacity-20 blur-sm rounded-2xl group-hover:opacity-40 transition-opacity" />
                        <Card className="relative h-full p-8 bg-navy-card border border-white/10">
                            <div className="w-12 h-12 bg-electric-blue/10 rounded-xl flex items-center justify-center mb-6 text-electric-blue">
                                <Shield className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Security Operations</h3>
                            <div className="space-y-4 mb-6">
                                <div>
                                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">The Problem</div>
                                    <p className="text-sm text-slate-300 leading-relaxed">
                                        You have 50 tools and they don&apos;t talk to each other. Alerts pile up. Attackers move fast, and your team is stuck copying JSON between tabs.
                                    </p>
                                </div>
                                <div>
                                    <div className="text-xs font-bold text-electric-blue uppercase tracking-wider mb-1">How we fix it</div>
                                    <p className="text-sm text-slate-300 leading-relaxed">
                                        CyberFortress connects the dots. It&apos;s a single brain that sits on top of your existing stack and thinks for itself.
                                    </p>
                                </div>
                            </div>
                            <div className="pt-4 border-t border-white/5">
                                <span className="text-xs font-bold text-electric-blue flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-electric-blue animate-pulse" />
                                    Available Now
                                </span>
                            </div>
                        </Card>
                    </div>

                    {/* Domain 2: Infrastructure */}
                    <div className="group relative opacity-75 hover:opacity-100 transition-opacity">
                        <Card className="relative h-full p-8 bg-navy-card border border-white/5">
                            <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-6 text-slate-400">
                                <Server className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Infrastructure Resilience</h3>
                            <div className="space-y-4 mb-6">
                                <div>
                                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">The Challenge</div>
                                    <p className="text-sm text-slate-400 leading-relaxed">
                                        Legacy infrastructure lacks the observability and self-healing capabilities required for next-generation automated workflows. Downtime is measured in lost revenue per second.
                                    </p>
                                </div>
                                <div>
                                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">AhiLight&apos;s Approach</div>
                                    <p className="text-sm text-slate-400 leading-relaxed">
                                        Building intelligent infrastructure management systems that predict failures, automate remediation, and maintain operational continuity.
                                    </p>
                                </div>
                            </div>
                            <div className="pt-4 border-t border-white/5">
                                <span className="text-xs font-bold text-slate-500 flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full border border-slate-500" />
                                    Research &amp; Development
                                </span>
                            </div>
                        </Card>
                    </div>

                    {/* Domain 3: Supply Chain */}
                    <div className="group relative opacity-75 hover:opacity-100 transition-opacity">
                        <Card className="relative h-full p-8 bg-navy-card border border-white/5">
                            <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-6 text-slate-400">
                                <Link className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Supply Chain Intelligence</h3>
                            <div className="space-y-4 mb-6">
                                <div>
                                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">The Challenge</div>
                                    <p className="text-sm text-slate-400 leading-relaxed">
                                        Global supply chains operate blind — with fragmented visibility across vendors. Risk accumulates invisibly until it&apos;s too late.
                                    </p>
                                </div>
                                <div>
                                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">AhiLight&apos;s Approach</div>
                                    <p className="text-sm text-slate-400 leading-relaxed">
                                        Real-time supply chain correlation and automated risk detection — bringing the same autonomous intelligence used in security to logistics.
                                    </p>
                                </div>
                            </div>
                            <div className="pt-4 border-t border-white/5">
                                <span className="text-xs font-bold text-slate-500 flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full border border-slate-500" />
                                    Roadmap
                                </span>
                            </div>
                        </Card>
                    </div>

                </div>
            </div>
        </Section>
    )
}
