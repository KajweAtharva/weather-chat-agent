import React from 'react';
import { Cloud, Sun, Moon, Trash2, Share2 } from 'lucide-react';
import type { Theme } from '../types';

interface ChatHeaderProps {
  theme: Theme;
  onThemeToggle: () => void;
  onClearChat: () => void;
  onShare: () => void;
  hasMessages: boolean;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({
  theme,
  onThemeToggle,
  onClearChat,
  onShare,
  hasMessages,
}) => {
  const getWeatherIcon = () => {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 18) {
      return <Sun className="w-5 h-5 text-yellow-400 animate-pulse" />;
    }
    return <Moon className="w-5 h-5 text-blue-300 animate-pulse" />;
  };

  return (
    <div
      className={`${
        theme === 'dark'
          ? 'bg-gradient-to-r from-purple-600 to-blue-600'
          : 'bg-gradient-to-r from-blue-500 to-purple-500'
      } p-6 flex items-center justify-between`}
    >
      <div className="flex items-center gap-3">
        <div className="relative">
          <Cloud className="w-8 h-8 text-white" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">Weather.AI</h1>
          <p className="text-white/80 text-sm">
            Ask me anything about the weather
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        {/* {getWeatherIcon()} */}
        <button
          onClick={onThemeToggle}
          className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? (
            <Sun className="w-5 h-5 text-white" />
          ) : (
            <Moon className="w-5 h-5 text-white" />
          )}
        </button>
        {hasMessages && (
          <>
            <button
              onClick={onShare}
              className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
              title="Share chat"
              aria-label="Share chat"
            >
              <Share2 className="w-5 h-5 text-white" />
            </button>
            <button
              onClick={onClearChat}
              className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
              title="Clear chat"
              aria-label="Clear chat"
            >
              <Trash2 className="w-5 h-5 text-white" />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ChatHeader;