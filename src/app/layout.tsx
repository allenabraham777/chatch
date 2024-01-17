import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { Toaster } from '@/components/ui/toaster';
import AuthProvider from '@/components/providers/AuthProvider';
import ActiveUserProvider from '@/components/providers/ActiveUserProvider';

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
                <AuthProvider>
                    <ActiveUserProvider>
                        {children}
                        <Toaster />
                    </ActiveUserProvider>
                </AuthProvider>
            </body>
        </html>
    );
}
