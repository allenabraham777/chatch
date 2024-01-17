import { NextResponse } from 'next/server';

import { createConversationSchema } from '@/schema/conversations';
import prisma from '@/lib/prisma';
import getCurrentUser from '@/actions/getCurrentUser';
import { pusherServer } from '@/lib/pusher/pusherServer';

export const POST = async (req: Request) => {
    try {
        const body = await req.json();
        const payload = createConversationSchema.parse(body);
        const user = await getCurrentUser();

        const { userId, isGroup, name, members } = payload;

        if (!user) {
            return new NextResponse('Unauthorized', { status: 400 });
        }

        if (isGroup) {
            const newConversation = await prisma.conversation.create({
                data: {
                    name,
                    isGroup,
                    users: {
                        connect: [
                            ...members!.map((member) => ({
                                id: member.value
                            })),
                            {
                                id: user.id
                            }
                        ]
                    }
                },
                include: {
                    users: {
                        select: {
                            id: true,
                            name: true,
                            image: true
                        }
                    }
                }
            });

            for (const user of newConversation.users) {
                await pusherServer.trigger(user.id, 'conversation:new', {
                    ...newConversation,
                    messages: []
                });
            }

            return NextResponse.json(newConversation);
        }

        const existingConversations = await prisma.conversation.findMany({
            where: {
                OR: [
                    {
                        userIds: {
                            equals: [user.id, userId!]
                        }
                    },
                    {
                        userIds: {
                            equals: [userId!, user.id]
                        }
                    }
                ]
            }
        });

        const singleConversation = existingConversations[0];

        if (singleConversation) {
            return NextResponse.json(singleConversation);
        }

        const newConversation = await prisma.conversation.create({
            data: {
                users: {
                    connect: [
                        {
                            id: user.id
                        },
                        {
                            id: userId
                        }
                    ]
                }
            },
            include: {
                users: {
                    select: {
                        id: true,
                        name: true,
                        image: true
                    }
                }
            }
        });

        await pusherServer.trigger(userId!, 'conversation:new', {
            ...newConversation,
            messages: []
        });

        return NextResponse.json(newConversation);
    } catch (error) {
        console.error(error);

        return new NextResponse('Internal Error', { status: 500 });
    }
};
