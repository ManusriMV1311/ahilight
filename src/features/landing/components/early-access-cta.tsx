"use client"

import { Button } from "@/components/ui/button"
import { Section } from "@/components/ui/section"
import { ArrowRight, CheckCircle2 } from "lucide-react"

export function EarlyAccessCTA() {
    return (
        <Section background="blue-gradient" className="py-24 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
            <div className="absolute inset-0 bg-gradient-to-r from-deep-navy/80 to-transparent" />

            <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                <div>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight font-heading">
                        See CyberFortress <br />in action.
                    </h2>
                    <p className="text-xl text-blue-100 mb-8 max-w-md">
                        Request early access to a guided demo environment. No sales pressure. No commitment. Just the platform.
                    </p>

                    <div className="space-y-3 mb-8">
                        {[
                            "Demo environment pre-loaded with simulated threat scenarios",
                            "Guided walkthrough takes under 10 minutes",
                            "Response within 24 hours"
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-3 text-blue-50">
                                <CheckCircle2 className="w-5 h-5 text-success-green" />
                                <span>{item}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex justify-center md:justify-end">
                    <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 shadow-2xl w-full max-w-sm">
                        <h3 className="text-2xl font-bold text-white mb-6">Request Access</h3>
                        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                            <div>
                                <label className="block text-sm font-medium text-blue-100 mb-1">Work Email</label>
                                <input
                                    type="email"
                                    placeholder="name@company.com"
                                    className="w-full px-4 py-3 rounded-lg bg-deep-navy/50 border border-white/10 text-white placeholder:text-blue-200/50 focus:outline-none focus:border-white transition-colors"
                                />
                            </div>
                            <Button size="lg" className="w-full h-12 bg-white text-deep-navy hover:bg-blue-50 font-bold text-lg shadow-lg">
                                Get Early Access
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                            <p className="text-xs text-blue-200 text-center">
                                Limited spots available for Q1 2026 cohort.
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </Section>
    )
}
