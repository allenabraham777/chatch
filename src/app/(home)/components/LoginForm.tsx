'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FaGithub, FaGoogle } from 'react-icons/fa';
import Image from 'next/image';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import { loginFormSchema } from '@/schema/authFormSchema';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

type Props = {};

const LoginForm = (props: Props) => {
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();
    const router = useRouter();
    const form = useForm<z.infer<typeof loginFormSchema>>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const onSubmit = (values: z.infer<typeof loginFormSchema>) => {
        setLoading(true);
        signIn('credentials', { redirect: false, ...values })
            .then((callback) => {
                if (callback?.error) {
                    toast({ description: 'Invalid credentials!', variant: 'destructive' });
                }

                if (callback?.ok) {
                    router.push('/conversations');
                }
            })
            .finally(() => setLoading(false));
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} method="POST">
                <div className="flex gap-1 items-center justify-center mb-6">
                    <Image
                        src="/chatch.png"
                        width={200}
                        height={200}
                        className="w-12"
                        alt="Chatch"
                    />
                    <h2 className="text-3xl text-sky-500">Chatch</h2>
                </div>
                <h2 className="text-2xl text-primary font-bold">Login to your account.</h2>
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem className="mt-4">
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="a@example.com" {...field} />
                            </FormControl>
                            <FormMessage className="text-xs" />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem className="mt-2">
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="password" {...field} />
                            </FormControl>
                            <FormMessage className="text-xs" />
                        </FormItem>
                    )}
                />
                <Button
                    className="w-full mt-6 bg-sky-500 hover:bg-sky-600 text-lg py-6"
                    type="submit"
                >
                    Login
                </Button>
                <div className="relative my-8 flex items-center justify-center">
                    <h5 className="fixed z-10 bg-card px-2 text-sm text-gray-400">
                        Or continue with
                    </h5>
                    <div className="absolute h-0 border-t-2 w-full top-[50%] -translate-y-[50%]"></div>
                </div>
                <div className="flex gap-4">
                    <Button
                        variant="outline"
                        onClick={() => signIn('github', { redirect: false })}
                        className="flex-1 text-gray-500 hover:text-gray-600"
                    >
                        <FaGithub className="text-2xl" />
                    </Button>
                    <Button
                        variant="outline"
                        onClick={() => signIn('google', { redirect: false })}
                        className="flex-1 text-gray-500 hover:text-gray-600"
                    >
                        <FaGoogle className="text-2xl" />
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default LoginForm;
