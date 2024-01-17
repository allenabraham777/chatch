'use client';
import { useEffect, useState } from 'react';
import { Channel, Members } from 'pusher-js';
import { useRecoilState } from 'recoil';

import activeUserState from '@/store/activeUserState';
import { pusherClient } from '@/lib/pusher/pusherClient';

const useActiveUser = () => {
    const [activeUsers, setActiveUsers] = useRecoilState(activeUserState);
    const [channel, setChannel] = useState<Channel | null>(null);
    useEffect(() => {
        let activeChannel = channel;
        if (!activeChannel) {
            activeChannel = pusherClient.subscribe('presence-chatch');
            setChannel(activeChannel);
        }

        activeChannel.bind('pusher:subscription_succeeded', (members: Members) => {
            const initialMembers: string[] = [];

            members.each((member: Record<string, any>) => initialMembers.push(member.id));
            setActiveUsers(initialMembers);
        });

        activeChannel.bind('pusher:member_added', (member: Record<string, any>) => {
            setActiveUsers([...activeUsers, member.id]);
        });

        activeChannel.bind('pusher:member_removed', (member: Record<string, any>) => {
            setActiveUsers(activeUsers.filter((user) => user === member.id));
        });

        return () => {
            if (channel) {
                pusherClient.unsubscribe('presence-chatch');
                setChannel(null);
            }
        };
    }, []);
};

export default useActiveUser;
