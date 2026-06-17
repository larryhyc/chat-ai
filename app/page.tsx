'use client';

import ChatInput from '@/components/chatInput';
// import InputContainer from '@/components/inputContainer';
// import { Input } from '@/components/ui/input';
import { useChat } from '@ai-sdk/react';

import { useChatStore } from '@/store/useChatStore';
import ModelSelect from '@/components/modleSelect';

export default function Chat() {
  // const { messages, sendMessage } = useChat();
  const { messages, sendMessage } = useChat();
  const { message, setMessage } = useChatStore();


  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      {messages.map((messages) => (
        <div
          key={messages.id}
          className={`flex  mb-4 gap-2 ${messages.role === 'user' ? ' flex-row-reverse' : 'flex-row'}`}
        >
          {/* {messages.role === 'user' ? <div>:User</div> : <div>AI:</div>} */}
          {messages.parts.map((part, i) => {
            switch (part.type) {
              case 'text':
                return (
                  <div
                    key={`${messages.id}-${i}`}
                    className={`p-2 rounded-xl border border-primary shadow-[0_0_50px_rgba(16,185,129,0.15)] bg-primary`}
                  >
                    {part.text}
                  </div>
                );
            }
          })}
        </div>
      ))}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage({ text: message });
          setMessage('');
        }}
        className="
        w-full fixed bottom-2/24 left-1/2 p-3 transform -translate-x-1/2  border border-primary
        flex-col items-center rounded-xl max-w-xl shadow-xl/20 shadow-[0_0_50px_rgba(16,185,129,0.15)]"
      >
        <ChatInput placeholder="请输入消息，按 Enter 发送,Shift + Enter 换行" />
        <div className="max-w-xl pt-3 px-4 flex flex-row justify-end">
          <div className="items-">
            <ModelSelect />
          </div>
        </div>
      </form>
    </div>
  );
}
