import { NextResponse } from 'next/server';

import prisma from '@/lib/prisma';
import { messageFormSchema } from '@/schema/messageFormSchema';
import getCurrentUser from '@/actions/getCurrentUser';

type ParamsType = { params: { conversationId: string } };

export const POST = async (req: Request, { params }: ParamsType) => {
    const user = await getCurrentUser();
    const body = await req.json();
    const payload = messageFormSchema.parse(body);
    const message = await prisma.message.create({
        data: {
            body: payload.message,
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
            users: true,
            messages: {
                include: {
                    seen: true
                }
            }
        }
    });
    return NextResponse.json(message);
};
