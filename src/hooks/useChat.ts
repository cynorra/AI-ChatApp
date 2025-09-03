import { useState, useCallback } from 'react';
import { Message } from '../types';
import { OllamaAPI } from '../services/ollamaAPI';

const INITIAL_MESSAGE: Message = {
  id: '1',
  text: 'Merhaba! Ben Ollama ile çalışan AI asistanınızım. Size nasıl yardımcı olabilirim?',
  isUser: false,
  timestamp: new Date()
};

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await OllamaAPI.generateResponse(text.trim());
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: error instanceof Error ? error.message : 'Bilinmeyen hata oluştu.',
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]);

  const clearChat = useCallback(() => {
    setMessages([INITIAL_MESSAGE]);
    OllamaAPI.clearContext();
  }, []);

  return {
    messages,
    isLoading,
    sendMessage,
    clearChat
  };
};