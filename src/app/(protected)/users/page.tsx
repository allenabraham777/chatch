import React from 'react';

import getUsers from '@/actions/getUsers';
import UserList from './components/UserList';
import EmptyPage from '@/components/compounds/EmptyPage';

type Props = {};

const Users = async (props: Props) => {
    const users = await getUsers();
    return (
        <main className="flex-1 flex h-full">
            <UserList list={users} />
            <EmptyPage />
        </main>
    );
};

export default Users;
