import React, { useRef } from 'react';
import { Send } from 'lucide-react';
import type { Theme } from '../types';

interface ChatInputProps {
  input: string;
  isLoading: boolean;
  theme: Theme;
  onInputChange: (value: string) => void;
  onSend: () => void;
}

const ChatInput: React.FC<ChatInputProps> = ({
  input,
  isLoading,
  theme,
  onInputChange,
  onSend,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div
      className={`${
        theme === 'dark' ? 'bg-slate-800/80' : 'bg-slate-50/80'
      } backdrop-blur-lg p-4 border-t ${
        theme === 'dark' ? 'border-slate-700' : 'border-slate-200'
      }`}
    >
      <div className="flex gap-3 items-end">
        <div className="flex-1 relative">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => onInputChange(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
            placeholder="Ask about the weather..."
            className={`w-full px-4 py-3 rounded-xl ${
              theme === 'dark'
                ? 'bg-slate-700 text-white placeholder-slate-400'
                : 'bg-white text-slate-800 placeholder-slate-400'
            } border ${
              theme === 'dark' ? 'border-slate-600' : 'border-slate-200'
            } focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200 disabled:opacity-50`}
          />
        </div>
        <button
          onClick={onSend}
          disabled={!input.trim() || isLoading}
          className="bg-gradient-to-r from-purple-500 to-blue-500 text-white p-3 rounded-xl hover:from-purple-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
          aria-label="Send message"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
      <p
        className={`text-xs ${
          theme === 'dark' ? 'text-slate-500' : 'text-slate-400'
        } mt-2 text-center`}
      >
        Press Enter to send • Shift + Enter for new line
      </p>
    </div>
  );
};

export default ChatInput;