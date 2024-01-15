import { z } from 'zod';

export const messageFormSchema = z.object({
    message: z.string().min(1)
});
