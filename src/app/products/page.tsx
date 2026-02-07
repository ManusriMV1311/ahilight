"use client"

import { ProductsBackground } from "@/components/backgrounds/ProductsBackground";
import { DomainApproach } from "@/components/sections/domain-approach"

export default function ProductsPage() {
    return (
        <div className="min-h-screen relative bg-black">
            {/* Just the background and DomainApproach - no duplicates */}
            <DomainApproach />
        </div>
    )
}
