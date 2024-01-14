import { UserButton, UserProfile } from '@clerk/nextjs';
import React from 'react';

type Props = {};

const Dashboard = (props: Props) => {
    return (
        <div>
            <UserButton afterSignOutUrl="/" />
        </div>
    );
};

export default Dashboard;
