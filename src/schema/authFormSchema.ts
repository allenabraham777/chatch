import * as z from 'zod';

export const loginFormSchema = z.object({
    email: z
        .string()
        .min(5, { message: 'Email must be atleast 5 characters long' })
        .email({ message: 'Must be a valid email' }),
    password: z.string().min(8, { message: 'Password must be at least 8 characters long' })
});

export const registerFormSchema = z
    .object({
        email: z
            .string()
            .min(5, { message: 'Email must be atleast 5 characters long' })
            .email({ message: 'Must be a valid email' }),
        name: z.string().min(5, { message: 'Name must be atleast 5 characters long' }),
        password: z
            .string()
            .min(8, { message: 'Password must be at least 8 characters long' })
            .max(25, 'Maximum 25 characters only allowed for password')
            .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
                message:
                    'Password must contain at least one uppercase, one lowercase, one number and one special character'
            }),
        confirmPassword: z
            .string()
            .min(8, { message: 'Password must be at least 8 characters long' })
            .max(25, 'Maximum 25 characters only allowed for password')
    })
    .superRefine(({ confirmPassword, password }, ctx) => {
        if (confirmPassword !== password) {
            ctx.addIssue({
                code: 'custom',
                message: 'The passwords did not match',
                path: ['confirmPassword']
            });
        }
    });
