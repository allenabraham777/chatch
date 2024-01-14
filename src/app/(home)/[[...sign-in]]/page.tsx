'use client';
import { SignIn, useUser } from '@clerk/nextjs';
import { useEffect } from 'react';

export default function Page() {
    const { isLoaded, isSignedIn } = useUser();
    useEffect(() => {
        if (isLoaded && isSignedIn) {
            location.href = '/conversations';
        }
    }, [isLoaded, isSignedIn]);
    return (
        <div className="h-full flex items-center justify-center">
            <SignIn
                afterSignInUrl="/conversations"
                afterSignUpUrl="/conversations"
                redirectUrl="/conversations"
            />
        </div>
    );
}
