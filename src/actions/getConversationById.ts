import prisma from '@/lib/prisma';

import getCurrentUser from './getCurrentUser';

const getConversationById = async (conversationId: string) => {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id) {
        return null;
    }

    try {
        const conversation = await prisma.conversation.findFirst({
            where: {
                id: conversationId,
                userIds: {
                    has: currentUser.id
                }
            },
            include: {
                users: true,
                messages: {
                    include: {
                        sender: true,
                        seen: true
                    },
                    orderBy: {
                        createdAt: 'asc'
                    }
                }
            }
        });

        return conversation;
    } catch (error: any) {
        return null;
    }
};

export default getConversationById;
