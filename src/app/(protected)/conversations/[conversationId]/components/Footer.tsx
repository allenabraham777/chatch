'use client';
import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CldUploadButton } from 'next-cloudinary';

import { Button } from '@/components/ui/button';
import { Image as ImageIcon, SendHorizontalIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { messageFormSchema } from '@/schema/messageFormSchema';
import useConversation from '@/hooks/useConversations';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import { useToast } from '@/components/ui/use-toast';

type Props = {};

const Footer = (props: Props) => {
    const { conversationId } = useConversation();
    const { toast } = useToast();
    const form = useForm<z.infer<typeof messageFormSchema>>({
        resolver: zodResolver(messageFormSchema),
        defaultValues: {
            message: ''
        }
    });
    const onSubmit = async (values: z.infer<typeof messageFormSchema>) => {
        console.log(values);
        try {
            await axios.post(`/api/conversations/${conversationId}/messages`, values);
            form.reset();
        } catch (error) {
            toast({
                title: 'Something went wrong!',
                description: 'Unable to send message. Please try again later.',
                variant: 'destructive'
            });
        }
    };
    const onUpload = async (file: any) => {
        try {
            await axios.post(`/api/conversations/${conversationId}/messages`, {
                image: file.info.url
            });
        } catch (error) {
            toast({
                title: 'Something went wrong!',
                description: 'Unable to send image. Please try again later.',
                variant: 'destructive'
            });
        }
    };

    return (
        <div className="border-t border-l py-4 px-2 lg:px-8 flex gap-2 lg:gap-4 bg-background">
            <CldUploadButton
                options={{ maxFiles: 1 }}
                uploadPreset="chatch"
                className="p-0"
                onUpload={onUpload}
            >
                <ImageIcon className="w-8 h-8 text-sky-500" />
            </CldUploadButton>
            <div className="flex-1">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="w-full flex gap-4"
                        method="POST"
                    >
                        <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                                <FormItem className="flex-1 rounded-full">
                                    <FormControl>
                                        <Input
                                            className="rounded-full bg-gray-100"
                                            placeholder="Message"
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <Button
                            type="submit"
                            variant="ghost"
                            className="h-10 w-10 bg-sky-500 hover:bg-sky-600 p-0 rounded-full"
                        >
                            <SendHorizontalIcon className="w-6 h-6 text-background" />
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default Footer;
