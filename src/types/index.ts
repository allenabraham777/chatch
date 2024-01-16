import { Conversation, Message, User } from '@prisma/client';

export type FullMessage = Message & {
    seen: Partial<User>[];
    sender: Partial<User>;
};

export type FullConversation = Conversation & {
    users: User[];
    messages: FullMessage[];
};
