'use client';
import React, { useEffect, useState } from 'react';

import { FullMessage } from '@/types';
import MessageBody from './MessageBody';
import useConversation from '@/hooks/useConversations';
import { pusherClient } from '@/lib/pusher/pusherClient';

type Props = {
    messages: FullMessage[];
};

const Messages = (props: Props) => {
    const [messages, setMessages] = useState(props.messages);
    const { conversationId } = useConversation();
    useEffect(() => {
        const newMessage = (message: FullMessage) => {
            if (messages.findIndex((_message) => _message.id === message.id) !== -1) return;
            setMessages([...messages, message]);
        };

        const updateMessage = (message: FullMessage) => {
            setMessages((messages) =>
                messages.map((_message) => {
                    if (_message.id === message.id) return message;
                    return _message;
                })
            );
        };

        const channel = pusherClient.subscribe(conversationId);
        channel.bind('message:new', newMessage);
        channel.bind('message:update', updateMessage);
        return () => {
            pusherClient.unsubscribe(conversationId);
            channel.unbind('message:new', newMessage);
            channel.unbind('message:update', updateMessage);
        };
    }, [conversationId, messages]);
    return messages.map((message, index) => (
        <MessageBody
            key={message.id}
            message={message}
            prevMessage={index === 0 ? null : messages[index - 1]}
        />
    ));
};

export default Messages;
