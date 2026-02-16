import { Section } from "@/components/ui/section"
import { FileText, Target, ShieldCheck, Github, Lock, Database } from "lucide-react"

const signals = [
    { icon: FileText, label: "Peer-Reviewed", sub: "Research Publications" },
    { icon: Target, label: "Framework Aligned", sub: "MITRE ATT&CK" },
    { icon: ShieldCheck, label: "NIST Compliant", sub: "NIST Standards" },
    { icon: Github, label: "Contributing", sub: "Open Source" },
    { icon: Lock, label: "ZTNA Native", sub: "Zero Trust" },
    { icon: Database, label: "ML-KEM Enabled", sub: "Post-Quantum Ready" },
]

export function TrustSignals() {
    return (
        <Section background="navy-gradient" spacing="sm" className="border-b border-white/5">
            <div className="container mx-auto px-4 text-center">
                <p className="text-slate-500 text-sm font-medium mb-6">
                    Research-backed engineering for enterprises that cannot afford to fail.
                </p>
                <div className="flex flex-wrap justify-center gap-8 md:gap-16">
                    {signals.map((s, idx) => (
                        <div key={idx} className="flex flex-col items-center gap-2 group cursor-default">
                            <s.icon className="w-5 h-5 text-slate-500 group-hover:text-electric-blue transition-colors" />
                            <div className="text-center">
                                <div className="text-xs font-bold text-slate-400 group-hover:text-white transition-colors">{s.label}</div>
                                <div className="text-[10px] text-slate-600 uppercase tracking-wider">{s.sub}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Section>
    )
}
