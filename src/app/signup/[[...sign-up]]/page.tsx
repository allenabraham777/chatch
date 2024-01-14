'use client';
import { useEffect } from 'react';
import { SignUp, useUser } from '@clerk/nextjs';

export default function Page() {
    const { isLoaded, isSignedIn } = useUser();
    useEffect(() => {
        if (isLoaded && isSignedIn) {
            location.href = '/conversations';
        }
    }, [isLoaded, isSignedIn]);
    return (
        <div className="h-full flex items-center justify-center">
            <SignUp
                afterSignUpUrl="/conversations"
                afterSignInUrl="/conversations"
                redirectUrl="/conversations"
            />
        </div>
    );
}
