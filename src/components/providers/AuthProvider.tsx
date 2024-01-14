'use client';
import React from 'react';
import { ClerkProvider } from '@clerk/nextjs';

type Props = {
    children: React.ReactNode;
};

const AuthContext = ({ children }: Props) => {
    return <ClerkProvider>{children}</ClerkProvider>;
};

export default AuthContext;
