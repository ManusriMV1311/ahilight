"use client";
import React, { useRef, useState } from "react";
import { cn } from "@/lib/utils";

export const GlareCard = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    const isPointerInside = useRef(false);
    const refElement = useRef<HTMLDivElement>(null);
    const [state, setState] = useState({
        glare: {
            x: 50,
            y: 50,
        },
        background: {
            x: 50,
            y: 50,
        },
        rotate: {
            x: 0,
            y: 0,
        },
    });

    const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
        const rotateFactor = 0.4;
        const rect = event.currentTarget.getBoundingClientRect();
        const position = {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top,
        };
        const percentage = {
            x: (100 / rect.width) * position.x,
            y: (100 / rect.height) * position.y,
        };
        const delta = {
            x: percentage.x - 50,
            y: percentage.y - 50,
        };

        const { background, rotate, glare } = state;
        background.x = 50 + percentage.x / 4 - 12.5;
        background.y = 50 + percentage.y / 4 - 12.5;
        rotate.x = -(delta.x / 3.5);
        rotate.y = delta.y / 2;
        rotate.x *= rotateFactor;
        rotate.y *= rotateFactor;
        glare.x = percentage.x;
        glare.y = percentage.y;

        setState({
            background,
            rotate,
            glare,
        });
    };

    const handlePointerEnter = () => {
        isPointerInside.current = true;
        if (refElement.current) {
            setTimeout(() => {
                if (isPointerInside.current) {
                    refElement.current?.style.setProperty("--duration", "0s");
                }
            }, 300);
        }
    };

    const handlePointerLeave = () => {
        isPointerInside.current = false;
        if (refElement.current) {
            refElement.current.style.removeProperty("--duration");
        }
        setState((s) => ({
            ...s,
            rotate: { x: 0, y: 0 },
            glare: { x: 50, y: 50 },
        }));
    };

    return (
        <div
            style={{
                perspective: "1000px",
            }}
            className={cn("relative isolate transition-all duration-200 ease-linear w-full", className)}
        >
            <div
                ref={refElement}
                onPointerMove={handlePointerMove}
                onPointerEnter={handlePointerEnter}
                onPointerLeave={handlePointerLeave}
                className="h-full w-full bg-navy-card relative [transform-style:preserve-3d] rounded-2xl border border-white/10 overflow-hidden"
                style={{
                    transform: `rotateY(${state.rotate.x}deg) rotateX(${state.rotate.y}deg)`,
                    transition: "transform 0.1s ease-out",
                }}
            >
                {/* Content */}
                <div className="relative z-10 h-full w-full pointer-events-none">
                    {children}
                </div>

                {/* Glare Effect */}
                <div
                    className="absolute inset-0 z-0 opacity-0 transition-opacity duration-300 pointer-events-none"
                    style={{
                        opacity: isPointerInside.current ? 1 : 0,
                        background: `radial-gradient(
                farthest-corner circle at ${state.glare.x}% ${state.glare.y}%,
                rgba(255, 255, 255, 0.05) 0%,
                transparent 100%
            )`,
                    }}
                />

                {/* Color Spotlight */}
                <div
                    className="absolute inset-0 z-0 opacity-0 transition-opacity duration-300 pointer-events-none mix-blend-overlay"
                    style={{
                        opacity: isPointerInside.current ? 0.3 : 0,
                        background: `radial-gradient(
                farthest-corner circle at ${state.glare.x}% ${state.glare.y}%,
                var(--electric-blue),
                transparent 80%
            )`,
                    }}
                />
            </div>
        </div>
    );
};
