import React from 'react';
import { Bot, User } from 'lucide-react';
import { Message } from '../types';

interface MessageBubbleProps {
  message: Message;
  isDark: boolean;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isDark }) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={`flex gap-3 ${message.isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
        message.isUser 
          ? 'bg-blue-500' 
          : isDark ? 'bg-gray-700' : 'bg-gray-200'
      }`}>
        {message.isUser ? (
          <User className="w-4 h-4 text-white" />
        ) : (
          <Bot className={`w-4 h-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`} />
        )}
      </div>
      
      <div className={`max-w-xs sm:max-w-md lg:max-w-lg xl:max-w-xl ${message.isUser ? 'text-right' : 'text-left'}`}>
        <div className={`inline-block px-4 py-2 rounded-2xl ${
          message.isUser
            ? 'bg-blue-500 text-white'
            : isDark 
              ? 'bg-gray-700 text-gray-100' 
              : 'bg-white text-gray-900 border border-gray-200'
        }`}>
          <p className="whitespace-pre-wrap break-words">{message.text}</p>
        </div>
        <p className={`text-xs mt-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
          {formatTime(message.timestamp)}
        </p>
      </div>
    </div>
  );
};