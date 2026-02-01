"use client"

import { Shield, FileCheck, Lock, Globe } from "lucide-react"
import { Section } from "@/components/ui/section"
import { Card } from "@/components/ui/card"

const certs = [
    { name: "SOC 2 Type II", status: "Certified", icon: Shield },
    { name: "ISO 27001", status: "Certified", icon: Globe },
    { name: "FedRAMP", status: "In Progress", icon: FileCheck },
    { name: "HIPAA", status: "Compliant", icon: Lock },
]

export function ComplianceTrust() {
    return (
        <Section background="default" className="py-24 border-t border-white/5">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-2xl font-bold text-white mb-12">
                    Engineered for <span className="text-success-green">Zero-Trust Compliance</span>
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                    {certs.map((cert) => (
                        <Card key={cert.name} className="p-6 bg-white/5 border-white/10 flex flex-col items-center justify-center gap-4 hover:bg-white/10 transition-colors">
                            <div className="w-12 h-12 rounded-full bg-deep-navy border border-white/10 flex items-center justify-center text-slate-300">
                                <cert.icon className="w-6 h-6" />
                            </div>
                            <div>
                                <div className="font-bold text-white">{cert.name}</div>
                                <div className="text-xs font-mono text-slate-500 uppercase mt-1">{cert.status}</div>
                            </div>
                        </Card>
                    ))}
                </div>

                <div className="mt-16 p-8 bg-gradient-to-r from-deep-navy to-electric-blue/10 rounded-2xl border border-white/10 max-w-3xl mx-auto">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="text-left">
                            <h3 className="text-xl font-bold text-white mb-2">Security Whitepaper</h3>
                            <p className="text-slate-400 text-sm">Download the technical deep dive into our cryptographic architecture.</p>
                        </div>
                        <button className="whitespace-nowrap px-6 py-3 bg-white text-deep-navy font-bold rounded-lg hover:bg-slate-200 transition-colors">
                            Download PDF
                        </button>
                    </div>
                </div>
            </div>
        </Section>
    )
}
