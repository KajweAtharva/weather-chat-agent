import React, { useRef, useEffect } from 'react';
import { Cloud, CloudRain, Loader2, ThumbsUp, ThumbsDown } from 'lucide-react';
import type { Message, Theme } from '../types';

interface ChatMessagesProps {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  theme: Theme;
  onReaction: (messageId: string, reaction: 'up' | 'down') => void;
}

const ChatMessages: React.FC<ChatMessagesProps> = ({
  messages,
  isLoading,
  error,
  theme,
  onReaction,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="h-[500px] overflow-y-auto p-6 space-y-4 scroll-smooth">
      {messages.length === 0 && (
        <div className="h-full flex flex-col items-center justify-center text-center">
          <CloudRain
            className={`w-16 h-16 ${
              theme === 'dark' ? 'text-slate-600' : 'text-slate-300'
            } mb-4 animate-bounce`}
          />
          <h2
            className={`text-xl font-semibold ${
              theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
            } mb-2`}
          >
            Start a Conversation
          </h2>
          <p
            className={`${
              theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
            } max-w-md`}
          >
            Ask me about weather conditions, forecasts, or anything
            weather-related!
          </p>
          <div
            className={`mt-6 space-y-2 ${
              theme === 'dark' ? 'text-slate-500' : 'text-slate-400'
            } text-sm`}
          >
            <p>Try: "What's the weather in London?"</p>
            <p>Try: "Will it rain tomorrow in Tokyo?"</p>
          </div>
        </div>
      )}

      {messages.map((message, index) => (
        <div
          key={message.id}
          className={`flex ${
            message.role === 'user' ? 'justify-end' : 'justify-start'
          } animate-slideIn`}
          style={{ animationDelay: `${index * 0.05}s` }}
        >
          <div
            className={`max-w-[75%] rounded-2xl p-4 shadow-lg transition-all duration-300 hover:shadow-xl ${
              message.role === 'user'
                ? 'bg-gradient-to-br from-purple-500 to-blue-500 text-white'
                : theme === 'dark'
                ? 'bg-slate-700 text-slate-100'
                : 'bg-white text-slate-800 border border-slate-200'
            }`}
          >
            <div className="flex items-start gap-2">
              {message.role === 'assistant' && (
                <Cloud className="w-5 h-5 mt-0.5 flex-shrink-0" />
              )}
              <div className="flex-1">
                <p className="whitespace-pre-wrap break-words">
                  {message.content}
                </p>
                <div className="flex items-center justify-between mt-2">
                  <p
                    className={`text-xs ${
                      message.role === 'user'
                        ? 'text-white/70'
                        : theme === 'dark'
                        ? 'text-slate-400'
                        : 'text-slate-500'
                    }`}
                  >
                    {formatTime(message.timestamp)}
                  </p>
                  {message.role === 'assistant' && (
                    <div className="flex gap-1">
                      <button
                        onClick={() => onReaction(message.id, 'up')}
                        className={`p-1 rounded transition-all ${
                          message.reaction === 'up'
                            ? 'bg-green-500/30 text-green-400'
                            : theme === 'dark'
                            ? 'hover:bg-slate-600 text-slate-400'
                            : 'hover:bg-slate-100 text-slate-500'
                        }`}
                        title="Helpful"
                      >
                        <ThumbsUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => onReaction(message.id, 'down')}
                        className={`p-1 rounded transition-all ${
                          message.reaction === 'down'
                            ? 'bg-red-500/30 text-red-400'
                            : theme === 'dark'
                            ? 'hover:bg-slate-600 text-slate-400'
                            : 'hover:bg-slate-100 text-slate-500'
                        }`}
                        title="Not helpful"
                      >
                        <ThumbsDown className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {isLoading && (
        <div className="flex justify-start animate-slideIn">
          <div
            className={`rounded-2xl p-4 ${
              theme === 'dark'
                ? 'bg-slate-700'
                : 'bg-white border border-slate-200'
            } shadow-lg`}
          >
            <div className="flex items-center gap-2">
              <Loader2
                className={`w-5 h-5 ${
                  theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                } animate-spin`}
              />
              <span
                className={`${
                  theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                }`}
              >
                Checking the weather...
              </span>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="flex justify-center animate-slideIn">
          <div className="bg-red-500/20 border border-red-500 rounded-xl p-4 max-w-md">
            <p className="text-red-500 text-sm">{error}</p>
          </div>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessages;