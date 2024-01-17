import { NextResponse } from 'next/server';

import getCurrentUser from '@/actions/getCurrentUser';
import prisma from '@/lib/prisma';
import { pusherServer } from '@/lib/pusher/pusherServer';

type ParamsType = {
    params: {
        conversationId: string;
        messageId: string;
    };
};

export const POST = async (req: Request, { params }: ParamsType) => {
    try {
        const user = await getCurrentUser();

        const { conversationId, messageId } = params;

        const message = await prisma.message.findMany({
            where: {
                conversationId,
                id: messageId,
                NOT: {
                    seenIds: {
                        has: user?.id
                    }
                }
            },
            include: {
                seen: true
            }
        });

        if (!message) return new NextResponse('No such message or message already seen');

        const updatedMessage = await prisma.message.update({
            where: {
                id: messageId,
                conversationId
            },
            data: {
                seen: {
                    connect: {
                        id: user?.id
                    }
                }
            },
            include: {
                seen: {
                    select: {
                        id: true,
                        name: true,
                        image: true,
                        email: true
                    }
                },
                sender: {
                    select: {
                        id: true,
                        name: true,
                        image: true,
                        email: true
                    }
                }
            }
        });

        const conversation = await prisma.conversation.findUnique({
            where: { id: params.conversationId },
            include: {
                users: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        image: true
                    }
                },
                messages: {
                    include: {
                        seen: {
                            select: {
                                id: true,
                                name: true,
                                image: true,
                                email: true
                            }
                        },
                        sender: {
                            select: {
                                id: true,
                                name: true,
                                image: true,
                                email: true
                            }
                        }
                    }
                }
            }
        });

        const lastMessage = conversation!.messages[conversation!.messages.length - 1];
        if (lastMessage.id === updatedMessage.id) {
            await pusherServer.trigger(user!.id, 'conversation:update', {
                ...conversation,
                messages: [lastMessage]
            });
        }
        await pusherServer.trigger(conversationId, 'message:update', updatedMessage);

        return new NextResponse('Message seen');
    } catch (error) {
        console.error('Conversation seen error', error);
        return new NextResponse('Something went wrong', { status: 500 });
    }
};
