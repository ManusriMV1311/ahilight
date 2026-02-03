"use client"

import { DomainApproach } from "@/components/sections/domain-approach"

export default function ProductsPage() {
    return (
        <div className="pt-20 min-h-screen">
            {/* Reusing the DomainApproach component as the main content */}
            <DomainApproach />
        </div>
    )
}
