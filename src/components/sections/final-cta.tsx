"use client"

import { Section } from "@/components/ui/section"
import { Button } from "@/components/ui/button"
import Link from 'next/link';

export function FinalCTA() {
    return (
        <Section background="transparent" className="py-16 md:py-32 text-center">
            <div className="container mx-auto px-4 max-w-4xl">
                <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tight font-heading">
                    Let&apos;s build something real.
                </h2>
                <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
                    We like difficult problems throughout the stack. If you have one, or just want to see how we solve ours, get in touch.
                </p>
                <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-12">
                    <Link href="/products">
                        <Button size="lg" className="bg-gradient-to-r from-electric-blue to-cyan-accent text-white font-bold rounded-full h-14 px-8 shadow-[0_0_20px_rgba(125,95,255,0.4)] hover:shadow-[0_0_30px_rgba(125,95,255,0.6)] transition-all">
                            See the work
                        </Button>
                    </Link>
                    <Link href="/research">
                        <Button
                            size="lg"
                            variant="outline"
                            className="border-2 border-electric-blue/50 bg-gradient-to-r from-electric-blue/10 to-cyan-accent/10 hover:from-electric-blue/20 hover:to-cyan-accent/20 hover:border-electric-blue text-white font-bold rounded-full h-14 px-8 hover:shadow-lg hover:shadow-electric-blue/30 transition-all"
                        >
                            Read the papers
                        </Button>
                    </Link>
                </div>
                <div className="text-slate-500">
                    Questions? Reach us at <a href="mailto:contact@ahilight.com" className="text-electric-blue hover:underline">contact@ahilight.com</a>
                </div>
            </div>
        </Section>
    )
}
