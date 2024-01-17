'use client';
import React, { useEffect, useMemo } from 'react';

import { FullMessage } from '@/types';
import UserAvatar from '@/components/compounds/UserAvatar';
import { useSession } from '@clerk/nextjs';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import Image from 'next/image';
import useConversation from '@/hooks/useConversations';
import axios from 'axios';
import { Check, CheckCheck } from 'lucide-react';
import CreateGroupDialog from '@/components/compounds/ImageDialog';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';

type Props = {
    message: FullMessage;
    prevMessage: FullMessage | null;
};

const MessageBody = ({ message, prevMessage }: Props) => {
    const { session } = useSession();
    const { conversationId } = useConversation();
    useEffect(() => {
        if (!message.seen.some((user) => user.id === session?.user.id)) {
            axios.post(`/api/conversations/${conversationId}/messages/${message.id}/seen`);
        }
    }, [conversationId, message, session]);
    const isSender = session?.user.id === message.sender.id;
    const seenText = useMemo(
        () =>
            isSender &&
            message.seen
                .filter((user) => user.id !== session?.user.id)
                .map((user) => user.name)
                .join(', ')
                .toLowerCase(),
        [message, session, isSender]
    );
    const isStackMessage =
        prevMessage &&
        prevMessage?.sender?.id === message.sender.id &&
        format(prevMessage?.createdAt, 'p') === format(message?.createdAt, 'p');
    return (
        <div
            className={cn('flex gap-2 my-6', {
                'justify-end': isSender,
                '-my-3': isStackMessage
            })}
        >
            <div className="flex gap-2">
                <div
                    className={cn('order-0', {
                        'order-1': isSender,
                        'opacity-0': isStackMessage
                    })}
                >
                    <UserAvatar user={message.sender} />
                </div>
                <div
                    className={cn('flex flex-col items-start gap-2 relative', {
                        'items-end': isSender
                    })}
                >
                    <span className="absolute -bottom-3 -right-3">
                        {isSender &&
                            (seenText ? (
                                <HoverCard>
                                    <HoverCardTrigger asChild className="p-0">
                                        <CheckCheck className="bg-sky-500 text-background cursor-pointer p-1 h-5 w-5 rounded-full border border-background" />
                                    </HoverCardTrigger>
                                    <HoverCardContent className="text-foreground text-sm py-2 px-4 max-w-52">
                                        Seen by: <span className="capitalize">{seenText}</span>
                                    </HoverCardContent>
                                </HoverCard>
                            ) : (
                                <Check className="bg-gray-400 text-background p-1 h-5 w-5 rounded-full" />
                            ))}
                    </span>
                    <div
                        className={cn('flex w-full gap-1 items-end', {
                            'justify-end': isSender,
                            hidden: isStackMessage
                        })}
                    >
                        <h2 className="capitalize text-gray-600 text-sm font-medium">
                            {isSender ? 'You' : message.sender.name?.toLowerCase()}
                        </h2>
                        <h2 className="capitalize text-gray-400 text-xs">
                            {format(message.createdAt, 'p')}
                        </h2>
                    </div>
                    <div
                        className={cn(
                            'p-2 bg-gray-500 max-w-60 text-balance break-words rounded-lg text-background min-w-12',
                            {
                                'bg-sky-500': isSender
                            }
                        )}
                    >
                        {message?.image ? (
                            <CreateGroupDialog image={message.image}>
                                <Image src={message.image} width={240} height={240} alt="image" />
                            </CreateGroupDialog>
                        ) : (
                            message.body
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MessageBody;
