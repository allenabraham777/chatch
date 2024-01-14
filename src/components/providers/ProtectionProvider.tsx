'use client';
import { useUser } from '@clerk/nextjs';
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
    return <>{children}</>;
};

export default ProtectionProvider;
