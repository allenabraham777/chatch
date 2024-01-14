import prisma from '@/lib/prisma';
import getCurrentUser from './getCurrentUser';

const getUsers = async () => {
    const user = await getCurrentUser();
    if (!user) {
        return [];
    }

    try {
        const users = await prisma.user.findMany({
            orderBy: { createdAt: 'desc' },
            where: { NOT: { id: user.id } }
        });
        return users;
    } catch (error) {
        return [];
    }
};

export default getUsers;
