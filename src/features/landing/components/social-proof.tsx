"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { Quote, Star } from "lucide-react"
import { Section } from "@/components/ui/section"
import { Card } from "@/components/ui/card"

const testimonials = [
    {
        quote: "AhiLight's research-driven approach solved infrastructure bottlenecks we considered impossible to fix. True engineering excellence.",
        author: "Sarah Jenkins",
        role: "CTO at GlobalFinance",
        image: "/avatars/sarah.jpg",
    },
    {
        quote: "We didn't just need a vendor; we needed a partner who understands first-principles system design. AhiLight delivered.",
        author: "Michael Chang",
        role: "VP Engineering at TechStream",
        image: "/avatars/michael.jpg",
    },
    {
        quote: "The reliability of their foundational software has allowed us to scale our own operations by an order of magnitude.",
        author: "Dr. Elena Volkov",
        role: "Head of Infrastructure at ScaleCore",
        image: "/avatars/elena.jpg",
    },
]

const metrics = [
    { label: "Systems Unified", value: 500, suffix: "+", duration: 2 },
    { label: "Uptime Reliability", value: 99.99, suffix: "%", duration: 1.5 },
    { label: "Global Deployments", value: 40, suffix: "+", duration: 1.5 },
    { label: "Patents Pending", value: 12, suffix: "", duration: 1 },
]

export function SocialProof() {
    return (
        <Section background="default" className="py-24 border-t border-white/5">
            <div className="container mx-auto px-4">
                {/* Metrics Bar */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24 border-b border-white/5 pb-16">
                    {metrics.map((metric) => (
                        <Counter key={metric.label} {...metric} />
                    ))}
                </div>

                {/* Testimonials */}
                <h2 className="text-3xl font-bold text-center text-white mb-16">
                    Building for the World's <br />
                    <span className="text-electric-blue">Most Critical Infrastructures</span>
                </h2>

                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((t, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.2 }}
                        >
                            <Card className="p-8 h-full bg-white/5 border-white/10 relative">
                                <Quote className="absolute top-6 right-6 w-8 h-8 text-electric-blue/20" />
                                <div className="flex gap-1 mb-6 text-warning-amber">
                                    {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-4 h-4 fill-current" />)}
                                </div>
                                <p className="text-slate-300 mb-8 italic leading-relaxed">"{t.quote}"</p>
                                <div className="flex items-center gap-4 mt-auto">
                                    <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-white font-bold">
                                        {t.author[0]}
                                    </div>
                                    <div>
                                        <div className="text-white font-semibold">{t.author}</div>
                                        <div className="text-electric-blue text-sm">{t.role}</div>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </Section>
    )
}

function Counter({ label, value, suffix = "", prefix = "", duration }: { label: string, value: number, suffix?: string, prefix?: string, duration: number }) {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true })
    const [count, setCount] = useState(0)

    useEffect(() => {
        if (inView) {
            let start = 0
            const end = value
            const totalDuration = duration * 1000
            const incrementTime = totalDuration / 60

            const timer = setInterval(() => {
                start += end / 60
                if (start >= end) {
                    setCount(end)
                    clearInterval(timer)
                } else {
                    setCount(start)
                }
            }, 1000 / 60)
            return () => clearInterval(timer)
        }
    }, [inView, value, duration])

    return (
        <div ref={ref} className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-white mb-2 font-heading">
                {prefix}{Math.floor(count).toLocaleString()}{suffix}
            </div>
            <div className="text-slate-500 uppercase tracking-widest text-xs font-semibold">
                {label}
            </div>
        </div>
    )
}
