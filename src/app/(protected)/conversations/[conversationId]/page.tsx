import React from 'react';

import getMessages from '@/actions/getMessages';
import Messages from './components/Messages';

type Props = {
    params: { conversationId: string };
};

const ConversationPage = async (props: Props) => {
    const messages = await getMessages(props.params.conversationId);
    return (
        <div className="flex-1 max-w-full overflow-y-auto border-l px-2 pb-10">
            <Messages messages={messages} />
        </div>
    );
};

export default ConversationPage;
