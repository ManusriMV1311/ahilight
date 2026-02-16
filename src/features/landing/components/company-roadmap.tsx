"use client"

import { Section } from "@/components/ui/section"
import { Activity } from "lucide-react"

import { HorizontalTracingBeam } from "@/components/ui/horizontal-tracing-beam"
import { TracingBeam } from "@/components/ui/tracing-beam"

export function CompanyRoadmap() {
    return (
        <Section background="transparent" className="py-12 md:py-24 overflow-visible">
            <div className="container mx-auto px-4">
                <div className="text-center md:text-left mb-16 max-w-5xl mx-auto px-6">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-heading">Where We&apos;re Going</h2>
                    <p className="text-xl text-slate-400 max-w-3xl">
                        We&apos;re building across domains where autonomous intelligence and research driven engineering create measurable enterprise value.
                    </p>
                </div>

                <div className="relative">
                    {/* Integrating HorizontalTracingBeam here to act as the timeline connector */}
                    {/* We wrap the grid in it, and use sticky={false} to position it absolutely at the top of this relative container */}
                    {/* Integrating HorizontalTracingBeam inside TracingBeam to overlap vertical and horizontal tracking */}
                    <TracingBeam className="px-0 md:px-6 max-w-5xl">
                        <HorizontalTracingBeam className="px-0" sticky={false}>
                            <div className="grid md:grid-cols-2 gap-12 pt-8">
                                {/* Phase 1: Security (Active) */}
                                <div className="relative pt-4 pl-4 md:pl-0">
                                    <div className="absolute top-[0px] left-[0px] w-6 h-6 rounded-full bg-electric-blue border-4 border-deep-navy shadow-[0_0_20px_rgba(0,212,170,0.5)] z-10 hidden md:block" />
                                    {/* Mobile timeline line */}
                                    <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-electric-blue/30 md:hidden" />

                                    <div className="bg-navy-card p-6 md:p-8 rounded-2xl border border-electric-blue/30 h-full">
                                        <div className="text-sm font-bold text-electric-blue mb-2">2025 to 2026</div>
                                        <h3 className="text-2xl font-bold text-white mb-6">Security &amp; Threat Intelligence</h3>
                                        <ul className="space-y-3">
                                            <li className="flex items-center gap-3 text-slate-300">
                                                <div className="w-1.5 h-1.5 rounded-full bg-electric-blue" />
                                                Autonomous security platform
                                            </li>
                                            <li className="flex items-center gap-3 text-slate-300">
                                                <div className="w-1.5 h-1.5 rounded-full bg-electric-blue" />
                                                Post quantum cryptography
                                            </li>
                                            <li className="flex items-center gap-3 text-slate-300">
                                                <div className="w-1.5 h-1.5 rounded-full bg-electric-blue" />
                                                Advanced threat hunting
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                {/* Phase 2: Future Frontiers (Generic) */}
                                <div className="relative pt-4 pl-4 md:pl-0">
                                    <div className="absolute top-[0px] left-[0px] w-6 h-6 rounded-full bg-slate-700 border-4 border-deep-navy z-10 hidden md:block" />
                                    {/* Mobile timeline line */}
                                    <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-white/10 md:hidden" />

                                    <div className="bg-navy-card p-6 md:p-8 rounded-2xl border border-white/5 h-full opacity-80 hover:opacity-100 transition-opacity flex flex-col justify-center">
                                        <div className="text-sm font-bold text-slate-500 mb-2">2026 Onwards</div>
                                        <h3 className="text-2xl font-bold text-white mb-4">Future Frontiers</h3>
                                        <p className="text-slate-400 mb-6 leading-relaxed">
                                            Expanding our research into new domains requiring autonomous decision making and high integrity systems. We follow the problems that matter most.
                                        </p>

                                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/5 text-sm text-slate-400 w-fit">
                                            <Activity className="w-4 h-4 text-electric-blue" />
                                            <span>Active Research</span>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </HorizontalTracingBeam>
                    </TracingBeam>
                </div>
            </div>
        </Section>
    )
}
