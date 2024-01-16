'use client';
import { User } from '@prisma/client';

import UserAvatar from '@/components/compounds/UserAvatar';
import ConversationDetails from './ConversationDetails';

type Props = {
    user: User;
};

const UserCard = ({ user }: Props) => {
    return (
        <div
            key={user.id}
            className="flex items-center gap-2 p-4 hover:bg-sky-100 transition-all ease-linear duration-500 cursor-pointer rounded-md"
        >
            <ConversationDetails data={{ users: [user] }}>
                <UserAvatar user={user} />
            </ConversationDetails>
            <span className="text-lg font-medium font-sans capitalize">
                {user.name.toLowerCase()}
            </span>
        </div>
    );
};

export default UserCard;
