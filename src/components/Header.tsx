import React from 'react';
import { Bot, Sun, Moon, Trash2 } from 'lucide-react';

interface HeaderProps {
  isDark: boolean;
  onToggleTheme: () => void;
  onClearChat: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  isDark, 
  onToggleTheme, 
  onClearChat 
}) => {
  return (
    <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b px-4 py-3 flex items-center justify-between`}>
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
          <Bot className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Ollama AI Assistant
          </h1>
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Llama3.2:3B model
          </p>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <button
          onClick={onClearChat}
          className={`p-2 rounded-lg transition-colors ${isDark ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-600'}`}
          title="Sohbeti temizle"
        >
          <Trash2 className="w-4 h-4" />
        </button>
        <button
          onClick={onToggleTheme}
          className={`p-2 rounded-lg transition-colors ${isDark ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-600'}`}
          title="Tema değiştir"
        >
          {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
};