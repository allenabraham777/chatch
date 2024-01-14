'use client';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { UserButton } from '@clerk/nextjs';
import { MessagesSquare, Users } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

type Props = {};

const routes = [
    {
        label: 'Users',
        route: '/users',
        icon: Users
    },
    {
        label: 'Conversations',
        route: '/conversations',
        icon: MessagesSquare
    }
];

const Sidebar = (props: Props) => {
    const pathname = usePathname();
    const router = useRouter();
    return (
        <div className="hidden h-full sm:flex flex-col items-center justify-between pb-4 shadow-lg">
            <ul role="list" className="flex flex-col">
                {routes.map((route) => {
                    const Icon = route.icon;
                    return (
                        <Button
                            key={route.label}
                            onClick={() => router.push(route.route)}
                            variant="ghost"
                            className={cn('rounded-none p-8 w-full', {
                                'bg-gray-100': route.route === pathname
                            })}
                        >
                            <Icon />
                            <span className="sr-only"></span>
                        </Button>
                    );
                })}
            </ul>
            <div>
                <UserButton />
            </div>
        </div>
    );
};

export default Sidebar;
