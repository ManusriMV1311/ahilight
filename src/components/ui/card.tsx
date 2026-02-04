import * as React from "react"
import { cn } from "@/lib/utils"

const Card = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "group relative rounded-2xl border border-cyan-accent/30 bg-navy-card backdrop-blur-sm shadow-xl transition-all duration-300 ease-out",
            "hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(0,212,255,0.3)] hover:border-cyan-accent",
            "hover:text-white", // Default text color change on hover
            className
        )}
        {...props}
    />
))
Card.displayName = "Card"

export { Card }
