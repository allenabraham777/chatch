import { z } from 'zod';

export const createConversationSchema = z
    .object({
        userId: z.string(),
        isGroup: z.boolean().optional(),
        members: z.array(z.string()).optional(),
        name: z.string().optional()
    })
    .refine(
        (data) => {
            if (data.isGroup) {
                return data.members && data.members.length > 0 && data.name;
            }
            return true;
        },
        {
            message: 'Members and name are required when isGroup is true',
            path: ['members', 'name']
        }
    );
