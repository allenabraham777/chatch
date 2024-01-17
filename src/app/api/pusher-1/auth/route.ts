import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

import { pusherServer } from '@/lib/pusher/pusherServer';

export const POST = async (request: Request) => {
    const { userId } = auth();

    const payload = await request.formData();

    const socketId = payload.get('socket_id');
    const channel = payload.get('channel_name');
    const data = {
        user_id: userId!
    };

    const authResponse = pusherServer.authorizeChannel(socketId as string, channel as string, data);
    return NextResponse.json(authResponse);
};
