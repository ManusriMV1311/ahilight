"use client"

import { ProductsBackground } from "@/components/backgrounds/ProductsBackground";
import { DomainApproach } from "@/components/sections/domain-approach"
import { useState, useEffect } from "react";

export default function ProductsPage() {
    const [animationComplete, setAnimationComplete] = useState(false);

    // Hide footer during animation
    useEffect(() => {
        const footer = document.querySelector('footer');
        if (footer) {
            if (animationComplete) {
                footer.style.opacity = '1';
                footer.style.transform = 'translateY(0)';
                footer.style.transition = 'all 0.6s ease';
            } else {
                footer.style.opacity = '0';
                footer.style.transform = 'translateY(20px)';
            }
        }
    }, [animationComplete]);

    return (
        <div className="min-h-screen relative bg-black">
            {/* Main content */}
            <DomainApproach onAnimationComplete={() => setAnimationComplete(true)} />
        </div>
    )
}
