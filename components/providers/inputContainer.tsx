import ChatInput from '../ui/chatInput';

const InputContainer = () => {
  return (
    <div className="w-full fixed bottom-0 left-0 px-4 pb-4 bg-zinc-950/90 backdrop-blur-sm z-50">
      <div className="max-w-4xl mx-auto flex flex-col items-end gap-2 p-1.5 shadow-lg relative min-h-12">
        {/*输入框 */}
        <ChatInput placeholder="请输入消息，按 Enter 发送，Shift + Enter 换行" />
      </div>
    </div>
  );
};

export default InputContainer;
