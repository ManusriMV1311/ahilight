import * as React from "react"
import { cn } from "@/lib/utils"

const Card = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "group relative rounded-2xl border border-white/20 bg-white/5 backdrop-blur-sm shadow-lg transition-all duration-300 ease-out",
            "hover:-translate-y-1 hover:shadow-electric-blue/20 hover:bg-electric-blue hover:border-electric-blue",
            "hover:text-white", // Default text color change on hover
            className
        )}
        {...props}
    />
))
Card.displayName = "Card"

export { Card }
