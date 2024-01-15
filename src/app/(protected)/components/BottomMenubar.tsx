'use client';
import { Button } from '@/components/ui/button';
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
        <div className="fixed sm:hidden bottom-0 left-0 right-0 bg-background border-t">
            <ul role="list" className="flex w-full">
                {routes.map((route) => {
                    const Icon = route.icon;
                    return (
                        <Button
                            key={route.label}
                            onClick={() => router.push(route.route)}
                            variant="outline"
                            className="rounded-none flex-1 py-8"
                        >
                            <Icon />
                            <span className="sr-only"></span>
                        </Button>
                    );
                })}
            </ul>
        </div>
    );
};

export default BottomMenubar;
