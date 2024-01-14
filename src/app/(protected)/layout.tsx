import React from 'react';

import ProtectionProvider from '@/components/providers/ProtectionProvider';

type Props = {
    children: React.ReactNode;
};

const ProtectedLayout = ({ children }: Props) => {
    return <ProtectionProvider>{children}</ProtectionProvider>;
};

export default ProtectedLayout;
