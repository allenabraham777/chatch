'use client';
import React from 'react';

import useActiveUser from '@/hooks/useActiveUser';
import { RecoilRoot } from 'recoil';

type Props = {
    children: React.ReactNode;
};

const ActiveUser = () => {
    useActiveUser();
    return <></>;
};

const ActiveUserProvider = ({ children }: Props) => {
    return (
        <RecoilRoot>
            <ActiveUser />
            {children}
        </RecoilRoot>
    );
};

export default ActiveUserProvider;
