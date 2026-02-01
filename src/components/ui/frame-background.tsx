"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface FrameBackgroundProps {
    className?: string;
    frameCount?: number;
    pathPrefix?: string;
    interval?: number;
}

export function FrameBackground({
    className,
    frameCount = 40,
    pathPrefix = "/about-frames",
    interval = 50
}: FrameBackgroundProps) {
    const [currentFrame, setCurrentFrame] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentFrame((prev) => (prev + 1) % frameCount);
        }, interval);

        return () => clearInterval(timer);
    }, [frameCount, interval]);

    return (
        <div className={cn("absolute inset-0 overflow-hidden pointer-events-none z-0 bg-slate-950", className)}>
            {[...Array(frameCount)].map((_, index) => (
                <div
                    key={index}
                    className={cn(
                        "absolute inset-0 transition-none",
                        index === currentFrame ? "opacity-100 z-10" : "opacity-0 z-0"
                    )}
                >
                    {/* Only render current, previous, and next few frames to save resources if needed, 
                        but for 40 frames, rendering all with display:none or opacity:0 is often smoother for blinking prevention. 
                        Using Opacity approach here. */}
                    <Image
                        src={`${pathPrefix}/${index}.jpg`}
                        alt={`Background Frame ${index}`}
                        fill
                        className="object-cover"
                        priority={true} // Priority all frames for smoothness
                        // For loop performance, we might want to lazy load others, 
                        // but for seamless loop we often need eager or preloading.
                        // Next.js Image component handles lazy loading by default.
                        // We set priority={true} for all to attempt aggressive preloading for the animation,
                        // or we can just let it stream. 
                        // Let's try aggressive loading for a smooth video feel.
                        loading="eager"
                        quality={100} // Max quality for clarity
                    />
                </div>
            ))}
            {/* Overlay for readability if needed, but handled by parent usually */}
        </div>
    );
}
