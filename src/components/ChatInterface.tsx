import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, Loader } from 'lucide-react';
import { MessageBubble } from './MessageBubble';
import { Header } from './Header';
import { useChat } from '../hooks/useChat';

export const ChatInterface: React.FC = () => {
  const [input, setInput] = useState('');
  const [isDark, setIsDark] = useState(true);
  const { messages, isLoading, sendMessage, clearChat } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;
    
    const messageText = input.trim();
    setInput('');
    await sendMessage(messageText);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className={`min-h-screen transition-colors ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Header 
        isDark={isDark}
        onToggleTheme={() => setIsDark(!isDark)}
        onClearChat={clearChat}
      />

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4 max-h-[calc(100vh-140px)]">
        {messages.map((message) => (
          <MessageBubble 
            key={message.id} 
            message={message} 
            isDark={isDark} 
          />
        ))}
        
        {isLoading && (
          <div className="flex gap-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
              <Bot className={`w-4 h-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`} />
            </div>
            <div className={`px-4 py-2 rounded-2xl ${isDark ? 'bg-gray-700' : 'bg-white border border-gray-200'}`}>
              <div className="flex items-center gap-2">
                <Loader className={`w-4 h-4 animate-spin ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
                <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Düşünüyor...
                </span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-t px-4 py-3`}>
        <div className="flex gap-3 items-end">
          <div className="flex-1">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Mesajınızı yazın... (Enter ile gönder)"
              className={`w-full px-4 py-2 rounded-lg border resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                isDark 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              }`}
              rows={1}
              disabled={isLoading}
            />
          </div>
          <button
            onClick={handleSendMessage}
            disabled={!input.trim() || isLoading}
            className="bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed text-white p-2 rounded-lg transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};