'use client';

import { useRef, useEffect, useCallback } from 'react';
import { Send } from 'lucide-react';
import { useChatStore } from '@/store/useChatStore';

interface ChatInputProps {
  placeholder?: string;
}

const ChatInput = ({ placeholder }: ChatInputProps) => {
  const { message, setMessage } = useChatStore();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // 自动调整 textarea 高度
  const adjustHeight = useCallback(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = 'auto';
    const maxHeight = 200; // 最大高度 200px
    textarea.style.height = `${Math.min(textarea.scrollHeight, maxHeight)}px`;
  }, []);

  // 当 message 变化时调整高度（比如清空后重置）
  useEffect(() => {
    adjustHeight();
    // 清空时同步清空 textarea
    if (message === '' && textareaRef.current) {
      textareaRef.current.value = '';
    }
  }, [message, adjustHeight]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  // 处理键盘事件
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      const trimmedText = message.trim();
      if (trimmedText) {
        const form = e.currentTarget.closest('form');
        if (form) {
          form.requestSubmit();
        }
        setMessage('');
      }
    }
  };

  const handleSend = () => {
    const trimmedText = message.trim();
    if (trimmedText) {
      setMessage('');
    }
  };

  return (
    <div className="relative flex items-end w-full bg-transparent p-2 transition-all">
      {/* textarea 输入框 */}
      <textarea
        ref={textareaRef}
        placeholder={placeholder}
        value={message}
        onChange={handleChange}
        onInput={adjustHeight}
        onKeyDown={handleKeyDown}
        rows={1}
        className="bg-transparent flex-1 min-h-[24px] max-h-[200px] overflow-y-auto
         px-2 py-1 text-sm text-gray-200 outline-none resize-none
         border-none"
        style={{ resize: 'none' }}
      />

      {/* 发送按钮 */}
      <button
        onClick={handleSend}
        type="submit"
        className="ml-2 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors text-white"
      >
        <Send size={16} />
      </button>
    </div>
  );
};

export default ChatInput;
