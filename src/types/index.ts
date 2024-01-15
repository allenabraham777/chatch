import { Conversation, Message, User } from '@prisma/client';

export type FullMessage = Message & {
    seen: User[];
};

export type FullConversation = Conversation & {
    users: User[];
    messages: FullMessage[];
};
