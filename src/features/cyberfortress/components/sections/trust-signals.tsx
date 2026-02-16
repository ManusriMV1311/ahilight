import { Section } from "@/components/ui/section"
import { Shield, Lock, FileKey, Globe, Layers } from "lucide-react"

const frameworks = [
    { name: "MITRE ATT&CK", icon: Shield, id: "mitre" },
    { name: "NIST Cybersecurity", icon: Lock, id: "nist" },
    { name: "OWASP Top 10", icon: Globe, id: "owasp" },
    { name: "Zero Trust (800-207)", icon: Layers, id: "zero-trust" },
    { name: "Post-Quantum Ready", icon: FileKey, id: "pqc" },
]

const standards = [
    "Hyperledger Fabric", "OpenSSL 3.0+", "Kubernetes", "STIX/TAXII"
]

export function TrustSignals() {
    return (
        <Section background="white" spacing="sm" className="bg-white/5 border-y border-white/5 backdrop-blur-sm">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16">

                    {/* Frameworks */}
                    <div className="flex-1 w-full">
                        <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-6 text-center md:text-left">
                            Aligned with Industry Frameworks
                        </p>
                        <div className="flex flex-wrap justify-center md:justify-start gap-6 md:gap-8">
                            {frameworks.map((fw) => (
                                <div key={fw.id} className="flex items-center gap-2 group cursor-default">
                                    <fw.icon className="w-5 h-5 text-slate-400 group-hover:text-electric-blue transition-colors" />
                                    <span className="text-sm font-semibold text-slate-400 group-hover:text-slate-200 transition-colors">
                                        {fw.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="hidden md:block w-px h-16 bg-white/10" />

                    {/* Standards */}
                    <div className="flex-1 w-full md:text-right">
                        <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-6 text-center md:text-right">
                            Built on Open Standards
                        </p>
                        <div className="flex flex-wrap justify-center md:justify-end gap-6 md:gap-8">
                            {standards.map((std) => (
                                <span key={std} className="text-sm font-mono text-slate-400 border border-white/10 px-2 py-1 rounded bg-white/5">
                                    {std}
                                </span>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </Section>
    )
}
