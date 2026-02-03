"use client"

import { Section } from "@/components/ui/section"
import { Button } from "@/components/ui/button"

export function FinalCTA() {
    return (
        <Section background="transparent" className="py-32 text-center">
            <div className="container mx-auto px-4 max-w-4xl">
                <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tight">
                    Build With AhiLight
                </h2>
                <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
                    Whether you&apos;re evaluating our platforms, exploring our research, or considering joining our team, we&apos;re here to collaborate with technical leaders solving hard problems.
                </p>
                <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-12">
                    <Button size="lg" className="bg-electric-blue hover:bg-cyan-accent text-deep-navy font-bold rounded-full h-14 px-8 shadow-xl" onClick={() => window.location.href = '/products'}>
                        Explore Our Products
                    </Button>
                    <Button size="lg" variant="outline" className="bg-transparent border-white/10 text-white hover:bg-white/5 hover:text-white rounded-full h-14 px-8" onClick={() => window.location.href = '/research'}>
                        View Our Research
                    </Button>
                </div>
                <div className="text-slate-500">
                    Questions? Reach us at <a href="mailto:contact@ahilight.com" className="text-electric-blue hover:underline">contact@ahilight.com</a>
                </div>
            </div>
        </Section>
    )
}
