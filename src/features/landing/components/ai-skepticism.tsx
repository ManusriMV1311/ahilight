"use client"

import { Section } from "@/components/ui/section"
import { Card } from "@/components/ui/card"
import { HelpCircle, AlertCircle, ShieldQuestion } from "lucide-react"

const faqs = [
    {
        icon: HelpCircle,
        question: "Is this a black box?",
        answer: "No. We show our work. Every detection comes with a map of exactly why we think it's bad. If we can't explain it, we don't flag it."
    },
    {
        icon: AlertCircle,
        question: "What about false positives?",
        answer: "If we wake you up at 3 AM, it better be real. We tune our systems to be quiet until they have something important to say."
    },
    {
        icon: ShieldQuestion,
        question: "Is it safe?",
        answer: "We put guardrails on everything. We decided early on that critical actions always need a human in the loop unless you explicitly tell us otherwise. And every action has an undo button."
    }
]

export function AISkepticism() {
    return (
        <Section background="transparent" className="py-24">
            <div className="container mx-auto px-4 max-w-5xl">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-heading">
                        Questions we get asked. <br />
                        <span className="text-electric-blue">Honest answers.</span>
                    </h2>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {faqs.map((faq, idx) => (
                        <Card key={idx} className="p-8 bg-white/5 border border-white/10 hover:border-electric-blue/30 transition-all hover:bg-white/10 group h-full">
                            <div className="mb-6 p-4 rounded-full bg-deep-navy w-fit border border-white/10 group-hover:border-electric-blue/50 transition-colors">
                                <faq.icon className="w-8 h-8 text-slate-400 group-hover:text-electric-blue transition-colors" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-4">{faq.question}</h3>
                            <p className="text-slate-400 leading-relaxed text-sm">
                                {faq.answer}
                            </p>
                        </Card>
                    ))}
                </div>
            </div>
        </Section>
    )
}
