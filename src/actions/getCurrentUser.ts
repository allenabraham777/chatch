import { currentUser } from '@clerk/nextjs';

const getCurrentUser = async () => {
    const user = await currentUser();
    return user;
};

export default getCurrentUser;
