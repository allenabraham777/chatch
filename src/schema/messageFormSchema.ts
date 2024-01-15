import { z } from 'zod';

export const messageFormSchema = z
    .object({
        message: z.string().min(1).optional(),
        image: z.string().min(1).optional()
    })
    .refine((data) => data.message || data.image, {
        message: 'Either message or image must be provided'
    });
