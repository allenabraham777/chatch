import { NextResponse } from 'next/server';

import prisma from '@/lib/prisma';
import { messageFormSchema } from '@/schema/messageFormSchema';
import getCurrentUser from '@/actions/getCurrentUser';
import { pusherServer } from '@/lib/pusher/pusherServer';

type ParamsType = { params: { conversationId: string } };

export const POST = async (req: Request, { params }: ParamsType) => {
    const user = await getCurrentUser();
    const body = await req.json();
    const payload = messageFormSchema.parse(body);
    const message = await prisma.message.create({
        data: {
            body: payload.message,
            image: payload.image,
            conversation: {
                connect: { id: params.conversationId }
            },
            sender: {
                connect: { id: user!.id }
            },
            seen: {
                connect: { id: user!.id }
            }
        },
        include: {
            seen: {
                select: {
                    id: true,
                    name: true
                }
            },
            sender: {
                select: {
                    id: true,
                    name: true
                }
            }
        }
    });
    const updatedConversation = await prisma.conversation.update({
        where: { id: params.conversationId },
        data: { lastMessageAt: new Date(), messages: { connect: { id: message.id } } },
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
                            email: true,
                            image: true
                        }
                    },
                    sender: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                            image: true
                        }
                    }
                }
            }
        }
    });
    const lastMessage = updatedConversation.messages[updatedConversation.messages.length - 1];
    await pusherServer.trigger(params.conversationId, 'message:new', message);
    updatedConversation.users.forEach((user) => {
        pusherServer.trigger(user.id!, 'conversation:update', {
            ...updatedConversation,
            messages: [lastMessage]
        });
    });
    return NextResponse.json(message);
};
