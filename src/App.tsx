import React, { useState } from 'react';
import ChatHeader from './components/ChatHeader';
import ChatMessages from './components/ChatMessage';
import ChatInput from './components/ChatInput';
import ShareModal from './components/ShareModal';
import AnimatedBackground from './components/AnimatedBackground';
import { sendMessageToWeatherAgent } from './utils/api';
import type { Message, Theme } from './types';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [theme, setTheme] = useState<Theme>('dark');
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      const assistantMessageId = (Date.now() + 1).toString();
      let assistantContent = '';

      await sendMessageToWeatherAgent(currentInput, (text) => {
        assistantContent = text;
        setMessages((prev) => {
          const filtered = prev.filter((m) => m.id !== assistantMessageId);
          return [
            ...filtered,
            {
              id: assistantMessageId,
              role: 'assistant',
              content: assistantContent,
              timestamp: new Date(),
            },
          ];
        });
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReaction = (messageId: string, reaction: 'up' | 'down') => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === messageId
          ? { ...msg, reaction: msg.reaction === reaction ? null : reaction }
          : msg
      )
    );
  };

  const clearChat = () => {
    setMessages([]);
    setError(null);
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleShare = () => {
    setShowShareModal(true);
    setShareSuccess(false);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setShareSuccess(true);
      setTimeout(() => {
        setShareSuccess(false);
        setShowShareModal(false);
      }, 2000);
    });
  };

  const generateShareText = () => {
    const chatText = messages
      .map(
        (msg) =>
          `${msg.role === 'user' ? 'You' : 'Weather Agent'}: ${msg.content}`
      )
      .join('\n\n');
    return `Weather Chat Conversation\n${'='.repeat(30)}\n\n${chatText}`;
  };

  const generateShareLink = () => {
    const encodedChat = btoa(JSON.stringify(messages));
    return `${window.location.origin}?chat=${encodedChat}`;
  };

  return (
    <div
      className={`min-h-screen ${
        theme === 'dark'
          ? 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900'
          : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'
      } transition-all duration-500 flex items-center justify-center p-4`}
    >
      <AnimatedBackground />

      <div
        className={`relative w-full max-w-4xl ${
          theme === 'dark' ? 'bg-slate-800/50' : 'bg-white/80'
        } backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border ${
          theme === 'dark' ? 'border-slate-700' : 'border-slate-200'
        } transition-all duration-300`}
      >
        <ChatHeader
          theme={theme}
          onThemeToggle={toggleTheme}
          onClearChat={clearChat}
          onShare={handleShare}
          hasMessages={messages.length > 0}
        />

        <ChatMessages
          messages={messages}
          isLoading={isLoading}
          error={error}
          theme={theme}
          onReaction={handleReaction}
        />

        <ChatInput
          input={input}
          isLoading={isLoading}
          theme={theme}
          onInputChange={setInput}
          onSend={handleSend}
        />
      </div>

      <ShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        theme={theme}
        messages={messages}
        shareSuccess={shareSuccess}
        onCopyText={() => copyToClipboard(generateShareText())}
        onCopyLink={() => copyToClipboard(generateShareLink())}
      />
    </div>
  );
};

export default App;