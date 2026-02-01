import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'CyberFortress | Autonomous Security Platform',
    description: 'The flagship security platform from AhiLight. Detection, Response, Deception, and Audit in one unified engine.',
};

export default function CyberFortressLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="bg-deep-navy min-h-screen">
            {children}
        </div>
    );
}
