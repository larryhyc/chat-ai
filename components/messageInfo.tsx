'use client';

import {
  Message,
  MessageContent,
  MessageResponse,
  // MessageToolbar,
  // MessageBranch,
  // MessageBranchContent,
  // MessageBranchSelector,
  // MessageBranchPrevious,
  // MessageBranchPage,
  // MessageBranchNext,
} from '@/components/chatMessage';
import type { UIMessage } from 'ai';

interface MessageInfoProps {
  messages: UIMessage[];
}

const MessageInfo = ({ messages }: MessageInfoProps) => {
  if (!messages || messages.length === 0) {
    return null;
  }

  return (
    <>
      {messages.map((message) => {
        // 从 parts 中提取文本内容
        const textContent =
          message.parts
            ?.filter(
              (part): part is { type: 'text'; text: string } =>
                part.type === 'text',
            )
            .map((part) => part.text)
            .join('') ?? '';

        if (!textContent) return null;

        return (
          <Message from={message.role} key={message.id} className='mb-6'>
            <MessageContent>
              {message.role === 'assistant' ? (
                <MessageResponse className="mb-3">
                  {textContent}
                </MessageResponse>
              ) : (
                textContent
              )}
            </MessageContent>
          </Message>
        );
      })}
    </>
  );
};

export default MessageInfo;
