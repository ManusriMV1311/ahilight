import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'CyberFortress | Autonomous Security Platform',
    description: 'The flagship security platform from AhiLight. Detection, Response, Deception, and Audit in one unified engine.',
};

import { CyberNavbar } from '@/components/cyberfortress/new/CyberNavbar';
import { CyberFooter } from '@/components/cyberfortress/new/CyberFooter';

export default function CyberFortressLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen theme-cyberfortress flex flex-col relative overflow-hidden">
            {/* Background removed as requested */}
            <div className="absolute inset-0 bg-[#030303] z-0" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-red-900/10 via-[#030303] to-[#030303] z-0 pointer-events-none" />

            <div className="relative z-10 flex flex-col min-h-screen">
                <CyberNavbar />
                <main className="flex-grow">
                    {children}
                </main>
                <CyberFooter />
            </div>
        </div>
    );
}
