import PusherClient from 'pusher-js';

export const pusherClient = new PusherClient(process.env.NEXT_PUBLIC_PUSHER_KEY as string, {
    channelAuthorization: {
        endpoint: '/api/pusher/auth',
        transport: 'ajax'
    },
    cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER as string
});
