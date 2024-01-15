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
        <div className="hidden h-full lg:flex flex-col items-center justify-between pb-4 shadow-lg border-r">
            <ul role="list" className="flex flex-col p-2 gap-1">
                {routes.map((route) => {
                    const Icon = route.icon;
                    return (
                        <Button
                            key={route.label}
                            onClick={() => router.push(route.route)}
                            variant="ghost"
                            className={cn('py-8 px-6 w-full', {
                                'bg-sky-100 hover:bg-sky-200': pathname.includes(route.route)
                            })}
                        >
                            <Icon
                                className={cn('text-gray-400', {
                                    'text-foreground': pathname.includes(route.route)
                                })}
                            />
                            <span className="sr-only">{route.label}</span>
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
