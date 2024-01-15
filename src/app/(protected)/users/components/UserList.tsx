import { User } from '@prisma/client';

import UserCard from './UserCard';

type Props = {
    list: User[];
};

const UserList = (props: Props) => {
    return (
        <aside className="bg-background flex flex-col pb-16 lg:pb-0 h-full w-full lg:w-80">
            <div className="py-4 px-8">
                <h3 className="font-bold font-sans text-xl text-foreground">People</h3>
            </div>
            <div className="flex-1 px-2 overflow-y-auto">
                {props.list.map((user) => (
                    <UserCard key={user.id} user={user} />
                ))}
            </div>
        </aside>
    );
};

export default UserList;
