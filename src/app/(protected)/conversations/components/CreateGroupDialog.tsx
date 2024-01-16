'use client';
import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Conversation, User } from '@prisma/client';
import axios from 'axios';
import { useRouter } from 'next/navigation';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { createConversationSchema } from '@/schema/conversations';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import MultipleSelector from '@/components/ui/multiple-selector';

type Props = {
    children: React.ReactNode;
    users: User[];
};

const CreateGroupDialog = ({ children, users }: Props) => {
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const form = useForm<z.infer<typeof createConversationSchema>>({
        resolver: zodResolver(createConversationSchema),
        defaultValues: {
            name: '',
            isGroup: true,
            members: []
        }
    });

    const onSubmit = async (values: z.infer<typeof createConversationSchema>) => {
        try {
            form.reset();
            const { data } = await axios.post<Conversation>('/api/conversations', values);
            router.push(`/conversations/${data.id}`);
            setOpen(false);
        } catch (error) {}
    };
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        method="POST"
                        className="space-y-8"
                    >
                        <DialogHeader className="space-y-6">
                            <DialogTitle>Create a group</DialogTitle>
                            <DialogDescription className="mt-4 flex flex-col gap-6">
                                <FormField
                                    control={form.control}
                                    name="isGroup"
                                    render={({ field: { value, ...field } }) => (
                                        <FormItem className="hidden">
                                            <FormControl>
                                                <Input
                                                    type="checkbox"
                                                    placeholder="Is Group"
                                                    className="hidden"
                                                    {...field}
                                                    checked={value}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem className="w-full flex flex-col gap-1">
                                            <FormLabel className="text-left">Group Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Group Name" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="members"
                                    render={({ field }) => (
                                        <FormItem className="w-full flex flex-col gap-1">
                                            <FormLabel className="text-left">Members</FormLabel>
                                            <FormControl>
                                                <MultipleSelector
                                                    defaultOptions={users.map((user) => ({
                                                        label: user.name,
                                                        value: user.id
                                                    }))}
                                                    placeholder="Select users..."
                                                    emptyIndicator={
                                                        <p className="text-center text-md text-gray-600 dark:text-gray-400">
                                                            No results found.
                                                        </p>
                                                    }
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <Button type="submit" className="bg-sky-500 hover:bg-sky-600">
                                Create
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default CreateGroupDialog;
