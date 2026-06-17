'use client';

import { Send } from 'lucide-react';
import { useChatStore } from '@/store/useChatStore';

interface ChatInputProps {
  placeholder?: string;
  // onSend?: (message: string) => void;
}

const ChatInput = ({ placeholder }: ChatInputProps) => {
  // const divRef = useRef<HTMLDivElement>(null);
  const { message, setMessage } = useChatStore();

  // 1. 【核心修复】当全局 store 里的 message 被外部清空时（比如发送成功后），同步清空 div 的 DOM 内容
  // useEffect(() => {
  //   if (divRef.current && message === '') {
  //     divRef.current.innerText = '';
  //   }
  // }, [message]);

  // 同步输入内容
  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    const text = e.currentTarget.innerText;
    // 替换换行符等杂质，确保纯文本一致性
    setMessage(text === '\n' ? '' : text);
  };

  // 处理键盘事件
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      const trimmedText = message.trim();
      if (trimmedText) {
        const form = e.currentTarget.closest('form');
        if (form) {
          form.requestSubmit();
        }
        setMessage(''); // 触发状态清空 -> 进而触发上面的 useEffect 清空 DOM
      }
    }
  };

  const handleSend = () => {
    const trimmedText = message.trim();
    if (trimmedText) {
      setMessage(''); // 触发状态清空 -> 进而触发上面的 useEffect 清空 DOM
    }
  };

  return (
    <div className="relative flex items-end w-full max-w-xl bg-transparent p-2 transition-all">
      {/* 可编辑的 Div 输入框 */}
      <input
        // ref={divRef}
        type="text"
        // contentEditable
        placeholder={placeholder}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        suppressContentEditableWarning
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        className="bg-transparent flex-1 min-h-6 max-h-50 overflow-y-auto
         px-2 py-1 text-sm text-gray-200 outline-none break-all"
      />
      

      {/* Placeholder 占位符
      {!message && (
        <span className="absolute left-4 bottom-3 text-sm text-gray-300 pointer-events-none select-none">
          {placeholder}
        </span>
      )} */}

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
