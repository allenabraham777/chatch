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
import Image from 'next/image';

type Props = {
    children: React.ReactNode;
    image: string;
};

const CreateGroupDialog = ({ image, children }: Props) => {
    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="items-center justify-center">
                <Image
                    src={image}
                    width={1024}
                    height={1024}
                    alt="Image"
                    className="max-w-full max-h-full"
                />
            </DialogContent>
        </Dialog>
    );
};

export default CreateGroupDialog;
