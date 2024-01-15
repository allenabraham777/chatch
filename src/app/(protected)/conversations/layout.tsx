import React from 'react';

import getConversations from '@/actions/getConversations';
import ConversationList from './components/ConversationList';

type Props = {
    children: React.ReactNode;
};

const ConversationsLayout = async ({ children }: Props) => {
    const conversations = await getConversations();
    return (
        <div className="flex-1 flex bg-gray-100">
            <ConversationList list={conversations} />
            {children}
        </div>
    );
};

export default ConversationsLayout;
