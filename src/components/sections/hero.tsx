"use client";
import React from "react";
import { BackgroundBeams } from "@/components/ui/background-beams";
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
        { text: "Enterprise", className: "text-teal-400 dark:text-teal-400" },
        { text: "Intelligence", className: "text-teal-400 dark:text-teal-400" },
    ];

    return (
        <section className="relative min-h-[80vh] md:min-h-screen flex items-center justify-center overflow-hidden bg-transparent antialiased pt-20 pb-12 md:pt-0 md:pb-0">
            {/* Spotlight that follows content (or ambient) */}
            <Spotlight
                className="-top-20 left-0 md:left-60 md:-top-20"
                fill="rgba(0, 212, 170, 0.3)" // Teal spotlight
            />

            {/* Animated grid background */}
            <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px] pointer-events-none" />

            {/* Gradient overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-black/50 to-teal-950/20 pointer-events-none" />

            {/* Background Beams */}
            <BackgroundBeams className="absolute inset-0 z-0 opacity-40" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
                <div className="max-w-5xl mx-auto">
                    {/* Animated headline */}
                    <div className="mb-8">
                        <TypewriterEffect
                            words={[
                                { text: "Automating", className: "text-white" },
                                { text: "the", className: "text-white" },
                                { text: "Future", className: "text-teal-400 dark:text-teal-400" },
                                { text: "of", className: "text-teal-400 dark:text-teal-400" },
                                { text: "Enterprise", className: "text-teal-400 dark:text-teal-400" },
                            ]}
                            className="text-4xl md:text-7xl font-bold"
                            cursorClassName="bg-teal-500"
                        />
                    </div>

                    {/* Subheadline with fade-in */}
                    <TextGenerateEffect
                        words="AhiLight builds research driven autonomous software systems for the world's most critical operations, from security to supply chain."
                        className="text-xl md:text-2xl text-neutral-300 mb-12 max-w-4xl mx-auto leading-relaxed"
                        duration={1}
                        filter={false} // clean fade
                    />

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                        {/* Primary CTA */}
                        <Button
                            borderRadius="9999px" // Pull
                            className="bg-black text-white border-none px-8 py-4 text-lg font-semibold"
                            containerClassName="h-auto w-auto" // overrides default absolute positioning often used
                            borderClassName="h-[calc(100%+4px)] w-[calc(100%+4px)] bg-[radial-gradient(var(--teal-500)_40%,transparent_60%)]"
                            duration={2000}
                        >
                            <span className="flex items-center gap-2">
                                Explore Our Research
                                <ArrowRight className="w-5 h-5" />
                            </span>
                        </Button>

                        {/* Secondary CTA */}
                        <Link href="/technology">
                            <button className="px-8 py-4 text-lg font-semibold border border-white/20 rounded-full hover:bg-white/5 hover:border-teal-500/50 transition-all backdrop-blur-sm text-white flex items-center gap-2">
                                View Technologies
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
