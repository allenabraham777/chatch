import React from 'react';

import getConversationById from '@/actions/getConversationById';
import EmptyPage from '@/components/compounds/EmptyPage';
import Header from './components/Header';
import Footer from './components/Footer';

type Props = {
    children: React.ReactNode;
    params: { conversationId: string };
};

const ChatboxLayout = async ({ children, params }: Props) => {
    const conversationId = params.conversationId;
    const conversation = await getConversationById(conversationId);
    if (!conversation) return <EmptyPage />;
    return (
        <div className="h-full flex-1 flex flex-col pb-16 lg:pb-0">
            <Header conversation={conversation} />
            {children}
            <Footer />
        </div>
    );
};

export default ChatboxLayout;
