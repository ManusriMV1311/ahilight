import { Section } from "@/components/ui/section"

const companies = [
    "GlobalBank", "TechCorp", "SecureNet", "FutureLogic", "DataFlow", "CloudScale"
]

export function TrustSignals() {
    return (
        <Section background="white" spacing="sm" className="border-b border-slate-100">
            <div className="container mx-auto px-4">
                <p className="text-center text-slate-500 text-sm font-semibold uppercase tracking-wider mb-8">
                    Trusted by Industry Leaders
                </p>
                <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                    {companies.map((company) => (
                        <span key={company} className="text-2xl font-bold text-slate-400 font-display">
                            {company}
                        </span>
                    ))}
                </div>
            </div>
        </Section>
    )
}
