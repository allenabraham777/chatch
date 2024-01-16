import { NextResponse } from 'next/server';

import getCurrentUser from '@/actions/getCurrentUser';
import prisma from '@/lib/prisma';

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

        await prisma.message.update({
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
            }
        });

        return new NextResponse('Message seen');
    } catch (error) {
        console.error('Conversation seen error', error);
        return new NextResponse('Something went wrong', { status: 500 });
    }
};
