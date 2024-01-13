import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { Toaster } from '@/components/ui/toaster';
import AuthContext from '@/components/providers/AuthContext';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Chatch',
    description: 'Catch up by chat.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <AuthContext>
                    {children}
                    <Toaster />
                </AuthContext>
            </body>
        </html>
    );
}
