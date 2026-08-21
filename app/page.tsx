'use client';

import ChatInput from '@/components/ui/chatInput';
import { useChat } from '@ai-sdk/react';
import { useChatStore } from '@/store/useChatStore';
import ModelSelect from '@/components/modleSelect';
import { useChangeModelStore } from '@/store/useChangeModle';
import MessageInfo from '@/components/messageInfo';
import ProviderKeyUp from '@/components/providerKeyUP';
import { useIsMobile } from '@/hooks/use-mobile';
export default function Chat() {
  // ai-sdk/react 提供的 useChat 钩子，用于获取聊天相关的状态和方法
  const { messages, sendMessage, error } = useChat();

  const ismobile = useIsMobile();

  // 用户输入的信息
  const { message, setMessage } = useChatStore();
  const { model, provider } = useChangeModelStore();
  const errorMessage = error?.message;

  // console.log('messages', messages);
  console.log('ismobile', ismobile);

  return (
    <div className="flex flex-col w-full h-full max-w-5xl mx-auto overflow-hidden">
      {/* 消息区域 - 可滚动，底部留出空间给输入框 */}
      <div className="flex-1 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden px-4 pt-6 pb-36 max-h-14/17">
        <MessageInfo messages={messages} error={errorMessage} />
      </div>

      {/* 输入区域  */}
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
          flex-col items-center rounded-xl max-w-2xl shadow-xl/20 shadow-[0_0_50px_rgba(16,185,129,0.15)]F
          bg-background/80 backdrop-blur-sm"
      >
        <ChatInput placeholder="请输入消息，按 Enter 发送, Shift + Enter 换行" />
        <div className="pt-3 px-4 flex flex-row justify-end gap-3">
          {/* 检测是否是手机设备 */}
          {ismobile && (
            <div>
              <ProviderKeyUp />
            </div>
          )}
          <div>
            <ModelSelect />
          </div>
        </div>
      </form>
    </div>
  );
}
