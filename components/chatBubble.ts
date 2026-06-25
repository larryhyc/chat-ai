import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import { Check, Copy } from 'lucide-react';


interface ChatBubbleProps{
  role: 'user' | 'assistant'
  content: string
}

const ChatBubble = ({ role, content }: ChatBubbleProps) => {

  return ( );
}
 
export default ChatBubble;