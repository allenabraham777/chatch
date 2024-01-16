'use client';
import React from 'react';
import { User } from '@prisma/client';

import { useMediaQuery } from '@/hooks/useMediaQuery';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTrigger
} from '../ui/dialog';
import { useReceiver } from '@/hooks/useReceiver';
import { FullConversation } from '@/types';
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTrigger
} from '../ui/drawer';
import { Button } from '../ui/button';
import UserAvatar from './UserAvatar';
import { format } from 'date-fns';
import UserList from './UserList';

type Props = {
    children: React.ReactNode;
    data: Partial<FullConversation>;
};

const ProfileCard = (props: { conversation: Partial<FullConversation>; receiver: User }) => {
    const description = props.conversation.isGroup
        ? `${props.conversation?.users?.length} Members`
        : props.receiver.email;
    const dateMessage = props.conversation.isGroup
        ? `Created on ${format(props.conversation?.createdAt ?? '', 'PP')}`
        : `Joined on ${format(props.receiver.createdAt, 'PP')}`;

    return (
        <div className="flex-1 flex flex-col items-center gap-2 h-full">
            <UserAvatar className="w-24 h-24" user={props.receiver} />
            <h1 className="capitalize text-2xl text-foreground font-bold font-sans">
                {props.conversation.name || props.receiver?.name.toLowerCase()}
            </h1>
            <h2 className="lowercase text-lg text-gray-600 font-medium font-sans">{description}</h2>
            <h3 className="text-base text-gray-500 font-sans">{dateMessage}</h3>
            {props.conversation.isGroup && (
                <div className="flex-1 flex flex-col w-full items-start mt-4">
                    <h3 className="pl-6 text-lg font-semibold font-sans text-gray-500">Members</h3>
                    <div className="flex-1 w-full overflow-y-auto">
                        <UserList title={false} list={props.conversation.users!} />
                    </div>
                </div>
            )}
        </div>
    );
};

const ConversationDetails = ({ children, data }: Props) => {
    const [open, setOpen] = React.useState(false);
    const isDesktop = useMediaQuery('(min-width: 768px)');
    const receiver = useReceiver(data as FullConversation);

    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>{children}</DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogDescription asChild>
                            <ProfileCard conversation={data} receiver={receiver!} />
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>{children}</DrawerTrigger>
            <DrawerContent className="h-[90%] flex flex-col">
                <DrawerHeader className="flex-1">
                    <DrawerDescription asChild>
                        <ProfileCard conversation={data} receiver={receiver!} />
                    </DrawerDescription>
                </DrawerHeader>
                <DrawerFooter className="pt-2 flex-[0]">
                    <DrawerClose asChild>
                        <Button variant="outline">Close</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
};

export default ConversationDetails;
