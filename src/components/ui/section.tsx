import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const sectionVariants = cva(
    "w-full py-16 md:py-24 relative overflow-hidden",
    {
        variants: {
            background: {
                default: "bg-transparent text-foreground", // Was deep-navy, now transparent for global bg
                white: "bg-white text-slate-900", // Keep white for contrast areas
                "navy-gradient": "bg-transparent text-white", // Was gradient, now transparent for global bg
                "blue-gradient": "bg-gradient-to-r from-electric-blue to-cyan-accent text-white",
                glass: "bg-white/5 backdrop-blur-lg border-y border-white/10 text-foreground",
                transparent: "bg-transparent text-foreground",
            },
            spacing: {
                default: "py-16 md:py-24",
                sm: "py-12 md:py-16",
                lg: "py-24 md:py-32",
                none: "py-0",
            }
        },
        defaultVariants: {
            background: "default",
            spacing: "default",
        },
    }
)

export interface SectionProps
    extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof sectionVariants> { }

function Section({ className, background, spacing, children, ...props }: SectionProps) {
    return (
        <section className={cn(sectionVariants({ background, spacing, className }))} {...props}>
            <div className="container mx-auto px-4 relative z-10">
                {children}
            </div>
        </section>
    )
}

export { Section, sectionVariants }
