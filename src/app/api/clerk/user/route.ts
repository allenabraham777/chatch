import { WebhookEvent } from '@clerk/nextjs/server';
import { headers } from 'next/headers';
import { Webhook } from 'svix';

import prisma from '@/lib/prisma';

const webhookSecret = process.env.CLERK_WEBHOOK_SECRET || ``;

async function validateRequest(request: Request) {
    const payloadString = await request.text();
    const headerPayload = headers();

    const svixHeaders = {
        'svix-id': headerPayload.get('svix-id')!,
        'svix-timestamp': headerPayload.get('svix-timestamp')!,
        'svix-signature': headerPayload.get('svix-signature')!
    };
    const wh = new Webhook(webhookSecret);
    return wh.verify(payloadString, svixHeaders) as WebhookEvent;
}

export async function POST(request: Request) {
    const payload: any = await validateRequest(request);
    await prisma.user.create({
        data: {
            id: payload.data.id,
            name: `${payload.data.first_name} ${payload.data.last_name}`,
            email: payload.data.email_addresses[0].email_address
        }
    });
    return Response.json({ message: 'Received' });
}
