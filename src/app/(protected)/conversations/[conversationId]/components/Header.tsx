'use client';
import React, { useMemo } from 'react';

import { useReceiver } from '@/hooks/useReceiver';
import { FullConversation } from '@/types';
import UserAvatar from '@/components/compounds/UserAvatar';
import { Button } from '@/components/ui/button';
import { ChevronLeft, MoreHorizontal } from 'lucide-react';
import { useRouter } from 'next/navigation';

type Props = {
    conversation: FullConversation;
};

const Header = ({ conversation }: Props) => {
    const receiver = useReceiver(conversation);
    const router = useRouter();
    const statusText = useMemo(() => {
        const members = conversation.users || [];
        if (conversation.isGroup) {
            return `${members.length} members`;
        }
        return 'Online';
    }, [conversation]);
    return (
        <header className="flex border-b w-full py-4 px-2 lg:px-8 bg-background border-l gap-2 items-center">
            <Button variant="ghost" className="p-0" onClick={() => router.back()}>
                <ChevronLeft className="h-8 w-8 text-sky-500" />
            </Button>
            <UserAvatar user={receiver!} />
            <div className="flex-1 flex flex-col">
                <h2 className="text-xl font-semibold font-sans">
                    {conversation.name || receiver?.name}
                </h2>
                <h4 className="text-sm text-gray-500">{statusText}</h4>
            </div>
            <Button variant="ghost">
                <MoreHorizontal className="text-sky-500 h-8 w-8" />
            </Button>
        </header>
    );
};

export default Header;
