import { User } from '@prisma/client';

import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { cn } from '@/lib/utils';

type Props = {
    users: User[];
    className?: string;
};

const GroupAvatar = ({ users, className }: Props) => {
    const filteredUsers = users.slice(0, 3);
    const classNames = [
        cn(className, 'absolute -left-[30%] z-10'),
        cn(className, 'z-20 -ml-[10%]'),
        cn(className, 'absolute bottom-0 -right-[15%] z-30')
    ];
    return (
        <div className="relative">
            {filteredUsers.map((user, index) => (
                <Avatar key={user.id} className={classNames[index]}>
                    <AvatarImage src={user.image!} />
                    <AvatarFallback className="bg-sky-500 text-2xl font-semibold text-primary-foreground">
                        {user!.name![0]}
                    </AvatarFallback>
                </Avatar>
            ))}
        </div>
    );
};

export default GroupAvatar;
