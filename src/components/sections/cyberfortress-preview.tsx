"use client"

import { Section } from "@/components/ui/section"
import { Button } from "@/components/ui/button"
import { ArrowRight, Brain, Zap, Hexagon, Database } from "lucide-react"
import Link from "next/link"

export function CyberFortressPreview() {
    return (
        <Section background="navy-gradient" className="py-24 border-t border-white/5">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-white mb-3 font-heading">CyberFortress: Autonomous Security, Unified Platform</h2>
                    <p className="text-slate-400">From detection to response to forensics in a single system, not a patchwork of tools.</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {[
                        { icon: Brain, title: "Behavioral Threat Detection", desc: "Correlates behaviors across network, endpoint, and identity domains to identify attack chains before they complete." },
                        { icon: Zap, title: "Policy-Driven Response", desc: "Automated response playbooks execute in seconds, not hours — with human oversight and rollback capabilities." },
                        { icon: Hexagon, title: "Adversarial Deception", desc: "AI-powered adaptive honeypots actively deceive attackers, wasting their time while capturing TTPs." },
                        { icon: Database, title: "Immutable Audit", desc: "Every detection and response is logged to a blockchain-backed audit trail for tamper-proof forensics." },
                    ].map((item, i) => (
                        <div key={i} className="p-6 rounded-xl bg-white/5 border border-white/5 hover:border-electric-blue/30 transition-colors">
                            <div className="mb-4 text-electric-blue"><item.icon className="w-8 h-8" /></div>
                            <h3 className="text-white font-bold mb-2">{item.title}</h3>
                            <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>

                <div className="text-center">
                    <Link href="/cyberfortress">
                        <Button variant="ghost" className="text-white hover:text-electric-blue hover:bg-transparent group text-lg transition-colors">
                            Learn more about CyberFortress <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </Link>
                </div>
            </div>
        </Section>
    )
}
