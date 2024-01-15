'use client';
import { useCallback } from 'react';
import axios from 'axios';
import { Conversation, User } from '@prisma/client';

import UserAvatar from '@/components/compounds/UserAvatar';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';

type Props = {
    user: User;
};

const UserCard = ({ user }: Props) => {
    const router = useRouter();
    const { toast } = useToast();
    const openConversations = useCallback(async () => {
        try {
            const { data } = await axios.post<Conversation>('/api/conversations', {
                userId: user.id
            });
            router.push(`/conversations/${data.id}`);
        } catch (error) {
            toast({
                title: 'Unable to open conversations',
                description: 'Please try again later',
                variant: 'destructive'
            });
        }
    }, [user, router, toast]);
    return (
        <div
            key={user.id}
            className="flex items-center gap-2 p-4 hover:bg-sky-100 transition-all ease-linear duration-500 cursor-pointer rounded-md"
            onClick={openConversations}
        >
            <UserAvatar user={user} />
            <span className="text-lg font-medium font-sans capitalize">
                {user.name.toLowerCase()}
            </span>
        </div>
    );
};

export default UserCard;
