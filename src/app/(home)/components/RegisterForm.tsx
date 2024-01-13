'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import axios from 'axios';

import { registerFormSchema } from '@/schema/authFormSchema';
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

const RegisterForm = (props: Props) => {
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();
    const form = useForm<z.infer<typeof registerFormSchema>>({
        resolver: zodResolver(registerFormSchema),
        defaultValues: {
            email: '',
            password: '',
            name: '',
            confirmPassword: ''
        }
    });

    const onSubmit = async (values: z.infer<typeof registerFormSchema>) => {
        setLoading(true);
        try {
            const { data: user } = await axios.post('/api/auth/register', values);
            toast({
                title: 'Account created successfully',
                description: 'Login to your account to continue.',
                variant: 'default'
            });
            form.reset();
        } catch (error) {
            toast({
                title: 'Account creation failed',
                description: 'Please try again later.',
                variant: 'destructive'
            });
        }
        setLoading(false);
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
                <h2 className="text-2xl text-primary font-bold">Create your account.</h2>
                <FormField
                    disabled={loading}
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
                    disabled={loading}
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem className="mt-2">
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="John Snow" {...field} />
                            </FormControl>
                            <FormMessage className="text-xs" />
                        </FormItem>
                    )}
                />
                <FormField
                    disabled={loading}
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
                <FormField
                    disabled={loading}
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem className="mt-2">
                            <FormLabel>Confirm Password</FormLabel>
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
                    Signup
                </Button>
            </form>
        </Form>
    );
};

export default RegisterForm;
