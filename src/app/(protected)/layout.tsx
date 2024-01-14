import React from 'react';

import ProtectionProvider from '@/components/providers/ProtectionProvider';
import Sidebar from './components/Sidebar';
import BottomMenubar from './components/BottomMenubar';

type Props = {
    children: React.ReactNode;
};

const ProtectedLayout = ({ children }: Props) => {
    return (
        <ProtectionProvider>
            <div className="h-full flex">
                <Sidebar />
                {children}
                <BottomMenubar />
            </div>
        </ProtectionProvider>
    );
};

export default ProtectedLayout;
