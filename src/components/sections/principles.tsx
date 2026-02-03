"use client"

import { Section } from "@/components/ui/section"

export function Principles() {
    return (
        <Section background="transparent" className="py-24">
            <div className="container mx-auto px-4 text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Research-Backed. Engineering-Driven.</h2>
                <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                    We build the foundational software systems that power the next generation of enterprise autonomy.
                </p>
            </div>

            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        { title: "Research-First", desc: "We solve hard problems through fundamental research, not by assembling off-the-shelf components.", badge: "Deep Tech" },
                        { title: "Domain Agnostic", desc: "Building scalable architectures that apply across security, infrastructure, and logistics.", badge: "Universal Core" },
                        { title: "First-Principles", desc: "Engineered from the ground up for performance, resilience, and absolute correctness.", badge: "High Performance" },
                        { title: "Mission Critical", desc: "Designed for environments where failure is not an option and trust is non-negotiable.", badge: "Enterprise Grade" }
                    ].map((p, i) => (
                        <div key={i} className="bg-navy-card p-8 rounded-2xl border border-white/5 hover:border-electric-blue/50 transition-colors group text-left">
                            <div className="mb-6">
                                <span className="text-xs font-bold text-electric-blue uppercase tracking-widest bg-electric-blue/10 px-2 py-1 rounded inline-block mb-4">
                                    {p.badge}
                                </span>
                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-electric-blue transition-colors">{p.title}</h3>
                            </div>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                {p.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </Section>
    )
}
