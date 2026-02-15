"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Section } from "@/components/ui/section"

export function CTA() {
    return (
        <Section background="blue-gradient" className="text-center py-20 md:py-32">
            {/* Background animated lines/pattern could be added here */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="max-w-4xl mx-auto"
            >
                <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tight font-heading">
                    Solve the Unsolvable
                </h2>
                <p className="text-white/80 text-xl mb-12 max-w-2xl mx-auto">
                    Partner with AhiLight to bring research-grade engineering to your most complex enterprise challenges.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                    <Button size="lg" variant="ghost" className="text-white border-white/30 hover:bg-white/10 h-14 px-8 text-lg hover:text-white transition-all">
                        Read Our Manifesto <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                </div>
            </motion.div>
        </Section>
    )
}
