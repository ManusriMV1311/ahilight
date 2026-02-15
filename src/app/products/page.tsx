"use client"

import { DomainApproach } from "@/components/sections/domain-approach"
import { useState, useEffect } from "react";

import { ProductNavigation } from "@/components/products/product-navigation";

export default function ProductsPage() {
    const [animationComplete, setAnimationComplete] = useState(false);

    // Hide footer during animation
    useEffect(() => {
        const footer = document.querySelector('footer');
        if (footer) {
            if (animationComplete) {
                footer.style.opacity = '1';
                footer.style.transform = 'translateY(0)';
                footer.style.position = 'relative';
                footer.style.zIndex = '50';
                footer.style.transition = 'all 0.6s ease';
            } else {
                footer.style.opacity = '0';
                footer.style.transform = 'translateY(20px)';
            }
        }
    }, [animationComplete]);

    return (
        <div className="min-h-screen relative -mt-20 md:-mt-24">
            <div className="absolute top-0 left-0 w-full z-40 pointer-events-none pt-28 md:pt-40">
                <div className="pointer-events-auto hidden md:block">
                    <ProductNavigation />
                </div>
            </div>
            {/* Main content */}
            <DomainApproach onAnimationComplete={() => setAnimationComplete(true)} />
        </div>
    )
}
