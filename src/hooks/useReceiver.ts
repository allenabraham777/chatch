import { useSession } from '@clerk/nextjs';
import { FullConversation } from '@/types';
import { useMemo } from 'react';
import { User } from '@prisma/client';

export const useReceiver = (conversation: FullConversation | { users: User[] }) => {
    const { session, isLoaded } = useSession();
    const receiver = useMemo(() => {
        if (!isLoaded || !session?.user) return null;
        const user = session.user;
        const receivers = conversation.users.filter((_user) => _user.id !== user.id);
        return receivers[0];
    }, [isLoaded, session?.user, conversation]);
    return receiver;
};
