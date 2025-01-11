import React from 'react';
import { Message } from '../types';
import { MessageCircle, Bot } from 'lucide-react';

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  return (
    <div className={`flex items-start gap-3 mb-6 ${message.isBot ? 'flex-row' : 'flex-row-reverse'}`}>
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/20 ${
        message.isBot ? 'bg-blue-500/30' : 'bg-green-500/30'
      }`}>
        {message.isBot ? (
          <Bot className="w-6 h-6 text-white" />
        ) : (
          <MessageCircle className="w-6 h-6 text-white" />
        )}
      </div>
      <div
        className={`max-w-[80%] p-4 rounded-xl backdrop-blur-sm border border-white/20 ${
          message.isBot ? 'bg-white/10' : 'bg-white/20'
        }`}
      >
        <p className="text-white mb-2">{message.text}</p>
        <span className="text-xs text-white/50">
          {new Date(message.timestamp).toLocaleTimeString()}
        </span>
      </div>
    </div>
  );
};