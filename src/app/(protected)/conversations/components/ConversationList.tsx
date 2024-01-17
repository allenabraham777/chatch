'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { MdGroupAdd } from 'react-icons/md';
import { User } from '@prisma/client';
import { useSession } from '@clerk/nextjs';

import useConversation from '@/hooks/useConversations';
import { FullConversation } from '@/types';
import ConversationCard from './ConversationCard';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import CreateGroupDialog from './CreateGroupDialog';
import { pusherClient } from '@/lib/pusher/pusherClient';

type Props = {
    list: FullConversation[];
    users: User[];
};

const ConversationList = (props: Props) => {
    const [conversations, setConversations] = useState<FullConversation[]>(props.list);
    const { isOpen, conversationId } = useConversation();
    const { session } = useSession();
    useEffect(() => {
        if (!session?.user) return;
        const newConversation = (conversation: FullConversation) => {
            if (
                conversations.findIndex((_conversation) => conversation.id === _conversation.id) !==
                -1
            )
                return;
            setConversations([conversation, ...conversations]);
        };
        const updateConversation = (conversation: FullConversation) => {
            setConversations((conversations) =>
                conversations.map((_conversation) => {
                    if (conversation.id === _conversation.id) {
                        return conversation;
                    }
                    return _conversation;
                })
            );
        };

        const channel = pusherClient.subscribe(session.user.id);
        channel.bind('conversation:new', newConversation);
        channel.bind('conversation:update', updateConversation);
        return () => {
            pusherClient.unsubscribe(session.user.id);
            channel.unbind('conversation:new', newConversation);
            channel.unbind('conversation:update', updateConversation);
        };
    }, [session?.user]);
    return (
        <aside
            className={cn('bg-background flex flex-col pb-16 lg:pb-0 h-full w-full lg:w-80', {
                'hidden lg:flex': isOpen
            })}
        >
            <div className="py-4 px-8 flex justify-between items-center">
                <h3 className="font-bold font-sans text-xl text-foreground">Conversations</h3>
                <CreateGroupDialog users={props.users}>
                    <Button variant="ghost">
                        <MdGroupAdd className="h-6 w-6 text-sky-500" />
                    </Button>
                </CreateGroupDialog>
            </div>
            <div className="flex-1 px-2 overflow-y-auto">
                {conversations.map((conversation) => (
                    <ConversationCard
                        key={conversation.id}
                        selected={conversation.id === conversationId}
                        conversation={conversation}
                    />
                ))}
            </div>
        </aside>
    );
};

export default ConversationList;
