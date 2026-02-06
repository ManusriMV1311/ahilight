"use client";
import React from "react";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { NeuralLattice } from "@/components/backgrounds/premium/NeuralLattice";
import { Spotlight } from "@/components/ui/spotlight";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import { Button } from "@/components/ui/moving-border";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Hero() {
    const headlineWords = [
        { text: "Engineering", className: "text-white" },
        { text: "the", className: "text-white" },
        { text: "Future", className: "text-white" },
        { text: "of", className: "text-white" },
        { text: "Enterprise", className: "text-electric-blue dark:text-electric-blue" },
        { text: "Intelligence", className: "text-electric-blue dark:text-electric-blue" },
    ];

    return (
        <section className="relative min-h-[80vh] md:min-h-screen flex items-center justify-center overflow-hidden bg-transparent antialiased pt-20 pb-12 md:pt-0 md:pb-0">
            {/* Spotlight that follows content (or ambient) */}
            <Spotlight
                className="-top-20 left-0 md:left-60 md:-top-20"
                fill="rgba(125, 95, 255, 0.3)" // Cyber Purple spotlight
            />

            {/* Animated grid background */}
            <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px] pointer-events-none" />

            {/* Gradient overlay for depth */}
            {/* Gradient overlay REMOVED for transparency */}
            <div className="hidden absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-deep-navy/40 pointer-events-none" />

            {/* Premium 3D Background: Neural Lattice */}
            <NeuralLattice />

            <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
                <div className="max-w-5xl mx-auto">
                    <div className="mb-8">
                        <TypewriterEffect
                            words={[
                                { text: "Systems", className: "text-white font-heading" },
                                { text: "that", className: "text-white font-heading" },
                                { text: "actually", className: "text-transparent bg-clip-text bg-gradient-to-r from-electric-blue to-cyan-accent font-heading" },
                                { text: "think.", className: "text-transparent bg-clip-text bg-gradient-to-r from-electric-blue to-cyan-accent font-heading" },
                            ]}
                            className="text-4xl md:text-5xl lg:text-7xl font-bold text-center tracking-tight font-heading leading-tight py-4"
                            cursorClassName="bg-electric-blue"
                        />
                    </div>

                    {/* Subheadline with fade-in */}
                    <TextGenerateEffect
                        words="We got tired of fixing broken pipelines at 3 AM. So we built software that fixes itself."
                        className="text-xl md:text-2xl text-neutral-300 mb-12 max-w-4xl mx-auto leading-relaxed"
                        duration={1}
                        filter={false} // clean fade
                    />

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                        {/* Primary CTA */}
                        <Button
                            borderRadius="9999px"
                            className="bg-gradient-to-r from-electric-blue to-cyan-accent text-white border-none px-8 py-4 text-lg font-semibold hover:shadow-xl hover:shadow-electric-blue/50 transition-all"
                            containerClassName="h-auto w-auto"
                            borderClassName="h-[calc(100%+4px)] w-[calc(100%+4px)] bg-[radial-gradient(var(--cyan-accent)_40%,transparent_60%)]"
                            duration={2000}
                            onClick={() => window.location.href = '/research'}
                        >
                            <span className="flex items-center gap-2">
                                How it works
                                <ArrowRight className="w-5 h-5" />
                            </span>
                        </Button>

                        {/* Secondary CTA */}
                        <Link href="/technology">
                            <button className="px-8 py-4 text-lg font-semibold border-2 border-electric-blue/50 rounded-full bg-gradient-to-r from-electric-blue/10 to-cyan-accent/10 hover:from-electric-blue/20 hover:to-cyan-accent/20 hover:border-electric-blue transition-all backdrop-blur-sm text-white flex items-center gap-2 hover:shadow-lg hover:shadow-electric-blue/30">
                                The tech
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
