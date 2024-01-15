'use client';
import { useCallback, useMemo } from 'react';
import { format } from 'date-fns';

import UserAvatar from '@/components/compounds/UserAvatar';
import { useRouter } from 'next/navigation';
import { FullConversation } from '@/types';
import { useReceiver } from '@/hooks/useReceiver';
import { useSession } from '@clerk/nextjs';
import { cn } from '@/lib/utils';

type Props = {
    conversation: FullConversation;
    selected: boolean;
};

const ConversationCard = ({ conversation, selected }: Props) => {
    const router = useRouter();
    const receiver = useReceiver(conversation);
    const { session } = useSession();
    const userId = useMemo(() => session?.user?.id, [session?.user?.id]);
    const lastMessage = useMemo(() => {
        const messages = conversation.messages || [];
        return messages[messages.length - 1];
    }, [conversation]);
    const hasSeen = useMemo(() => {
        if (!lastMessage) {
            return false;
        }

        const seenArray = lastMessage.seen || [];

        return seenArray.filter((user) => user.id === userId).length !== 0;
    }, [userId, lastMessage]);

    const lastMessageText = useMemo(() => {
        if (lastMessage?.image) {
            return 'Sent an image';
        }

        if (lastMessage?.body) {
            return lastMessage?.body;
        }

        return 'Started a conversation';
    }, [lastMessage]);

    const openConversations = useCallback(async () => {
        router.push(`/conversations/${conversation.id}`);
    }, [conversation, router]);
    return (
        <article
            className={cn(
                'flex items-center gap-2 p-4 hover:bg-sky-200 transition-all ease-linear duration-500 cursor-pointer rounded-md',
                { 'bg-sky-100': selected }
            )}
            onClick={openConversations}
        >
            <UserAvatar user={receiver!} />
            <div className="flex flex-col flex-1">
                <div className="flex items-center justify-between">
                    <span className="text-base font-medium font-sans capitalize">
                        {conversation.name || receiver!.name.toLowerCase()}
                    </span>
                    {lastMessage?.createdAt && (
                        <span className="text-xs text-gray-400 font-medium font-sans capitalize">
                            {format(new Date(lastMessage.createdAt), 'p')}
                        </span>
                    )}
                </div>
                <p className={cn('text-blue-500 text-sm truncate', { 'text-gray-400': hasSeen })}>
                    {lastMessageText}
                </p>
            </div>
        </article>
    );
};

export default ConversationCard;
