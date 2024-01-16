import React from 'react';

import getMessages from '@/actions/getMessages';
import MessageBody from './components/MessageBody';

type Props = {
    params: { conversationId: string };
};

const ConversationPage = async (props: Props) => {
    const messages = await getMessages(props.params.conversationId);
    return (
        <div className="flex-1 max-w-full overflow-y-auto border-l px-2 pb-10">
            {messages.map((message, index) => (
                <MessageBody
                    key={message.id}
                    message={message}
                    prevMessage={index === 0 ? null : messages[index - 1]}
                />
            ))}
        </div>
    );
};

export default ConversationPage;
