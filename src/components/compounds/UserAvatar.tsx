import { User } from '@prisma/client';

import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

type Props = {
    user: Partial<User>;
    className?: string;
};

const UserAvatar = ({ user, className }: Props) => {
    return (
        <Avatar className={className}>
            <AvatarImage src={user.image!} />
            <AvatarFallback className="bg-sky-500 text-2xl font-semibold text-primary-foreground">
                {user!.name![0]}
            </AvatarFallback>
        </Avatar>
    );
};

export default UserAvatar;
