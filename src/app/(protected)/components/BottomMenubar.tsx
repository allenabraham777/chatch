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

const BottomMenubar = (props: Props) => {
    const pathname = usePathname();
    const router = useRouter();
    return (
        <div className="fixed lg:hidden bottom-0 left-0 right-0 bg-background border-t">
            <ul role="list" className="flex w-full">
                {routes.map((route) => {
                    const Icon = route.icon;
                    return (
                        <Button
                            key={route.label}
                            onClick={() => router.push(route.route)}
                            variant="outline"
                            size="sm"
                            className={cn('rounded-none flex-1 py-8', {
                                'bg-sky-100 hover:bg-sky-200': pathname?.includes(route.route)
                            })}
                        >
                            <Icon />
                            <span className="sr-only">{route.label}</span>
                        </Button>
                    );
                })}
                <Button variant="outline" size="sm" className="rounded-none flex-1 py-8">
                    <UserButton />
                </Button>
            </ul>
        </div>
    );
};

export default BottomMenubar;
