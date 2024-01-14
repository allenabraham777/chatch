'use client';
import { useUser } from '@clerk/nextjs';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

type Props = {
    children: React.ReactNode;
};

const ProtectionProvider = ({ children }: Props) => {
    const { isLoaded, isSignedIn } = useUser();
    const router = useRouter();
    useEffect(() => {
        if (isLoaded && !isSignedIn) {
            router.push('/');
        }
    }, [isSignedIn, isLoaded, router]);
    if (!isLoaded)
        return (
            <div className="w-full h-full flex items-center justify-center">
                <Loader2 className="w-20 h-20 text-sky-500 animate-spin" />
            </div>
        );
    if (!isSignedIn) return null;
    return <>{children}</>;
};

export default ProtectionProvider;
