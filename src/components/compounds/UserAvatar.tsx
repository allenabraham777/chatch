'use client';
import { User } from '@prisma/client';
import { useRecoilValue } from 'recoil';

import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import activeUserState from '@/store/activeUserState';

type Props = {
    user: Partial<User>;
    className?: string;
    showActive?: boolean;
};

const UserAvatar = ({ user, showActive = true, className }: Props) => {
    const activeUserList = useRecoilValue(activeUserState);

    return (
        <span className="relative">
            <Avatar className={className}>
                <AvatarImage src={user.image!} />
                <AvatarFallback className="bg-sky-500 text-2xl font-semibold text-primary-foreground">
                    {user!.name![0]}
                </AvatarFallback>
            </Avatar>
            {showActive && activeUserList.includes(user.id as string) && (
                <span className="aspect-square w-3 bg-green-500 border-2 border-background rounded-full absolute top-0 right-0"></span>
            )}
        </span>
    );
};

export default UserAvatar;
