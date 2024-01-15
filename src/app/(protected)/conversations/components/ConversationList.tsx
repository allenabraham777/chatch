'use client';
import React from 'react';
import { MdGroupAdd } from 'react-icons/md';

import useConversation from '@/hooks/useConversations';
import { FullConversation } from '@/types';
import ConversationCard from './ConversationCard';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type Props = {
    list: FullConversation[];
};

const ConversationList = (props: Props) => {
    const { isOpen, conversationId } = useConversation();
    return (
        <aside
            className={cn('bg-background flex flex-col pb-16 lg:pb-0 h-full w-full lg:w-80', {
                'hidden lg:flex': isOpen
            })}
        >
            <div className="py-4 px-8 flex justify-between items-center">
                <h3 className="font-bold font-sans text-xl text-foreground">Conversations</h3>
                <Button variant="ghost">
                    <MdGroupAdd className="h-6 w-6" />
                </Button>
            </div>
            <div className="flex-1 px-2 overflow-y-auto">
                {props.list.map((conversation) => (
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
