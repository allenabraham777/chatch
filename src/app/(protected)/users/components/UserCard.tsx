'use client';
import { User } from '@prisma/client';

import UserAvatar from '@/components/compounds/UserAvatar';
import { useRouter } from 'next/navigation';

type Props = {
    user: User;
};

const UserCard = ({ user }: Props) => {
    const router = useRouter();
    return (
        <div
            key={user.id}
            className="flex items-center gap-2 p-4 hover:bg-sky-100 transition-all ease-linear duration-500 cursor-pointer rounded-md"
            onClick={() => router.push(`/conversations/${user.id}`)}
        >
            <UserAvatar user={user} />
            <span className="text-lg font-medium font-sans capitalize">
                {user.name.toLowerCase()}
            </span>
        </div>
    );
};

export default UserCard;
