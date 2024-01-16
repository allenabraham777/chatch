import React from 'react';

import getConversations from '@/actions/getConversations';
import ConversationList from './components/ConversationList';
import getUsers from '@/actions/getUsers';

type Props = {
    children: React.ReactNode;
};

const ConversationsLayout = async ({ children }: Props) => {
    const conversations = await getConversations();
    const users = await getUsers();
    return (
        <div className="flex-1 flex bg-gray-100">
            <ConversationList list={conversations} users={users} />
            {children}
        </div>
    );
};

export default ConversationsLayout;
