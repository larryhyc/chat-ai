'use client';

import ChatInput from '@/components/chatInput';
import { useChat } from '@ai-sdk/react';
import { useChatStore } from '@/store/useChatStore';
import ModelSelect from '@/components/modleSelect';
import { useChangeModelStore } from '@/store/useChangeModle';

export default function Chat() {
  // const { messages, sendMessage } = useChat();
  const { messages, sendMessage } = useChat();
  const { message, setMessage } = useChatStore();
  const { model, provider } = useChangeModelStore();

  return (
    <div className="flex flex-col w-full h-full max-w-5xl mx-auto overflow-hidden">
      {/* 消息区域 - 可滚动，底部留出空间给输入框 */}
      <div className="flex-1 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden px-4 pt-6 pb-36 max-h-14/17">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex mb-4 gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
          >
            {msg.parts.map((part, i) => {
              switch (part.type) {
                case 'text':
                  return (
                    <div
                      key={`${msg.id}-${i}`}
                      className="p-2 rounded-xl border border-primary
                       bg-primary max-w-[80%] break-words"
                    >
                      {part.text}
                    </div>
                  );
              }
            })}
          </div>
        ))}
        <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r"></div>
      </div>

      {/* 输入区域 - 固定在底部 */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage({
            text: message,
            metadata: { provider, model },
          });
          setMessage('');
        }}
        className="w-full fixed bottom-3 left-1/2 p-3 transform -translate-x-1/2 border border-primary
          flex-col items-center rounded-xl max-w-md shadow-xl/20 shadow-[0_0_50px_rgba(16,185,129,0.15)]F
          bg-background/80 backdrop-blur-sm"
      >
        <ChatInput placeholder="请输入消息，按 Enter 发送, Shift + Enter 换行" />
        <div className="max-w-xl pt-3 px-4 flex flex-row justify-end">
          <div>
            <ModelSelect />
          </div>
        </div>
      </form>
    </div>
  );
}
