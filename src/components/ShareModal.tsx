import React from 'react';
import { X, Share2, Cloud, Check } from 'lucide-react';
import type { Theme, Message } from '../types';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: Theme;
  messages: Message[];
  shareSuccess: boolean;
  onCopyText: () => void;
  onCopyLink: () => void;
}

const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  theme,
  shareSuccess,
  onCopyText,
  onCopyLink,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div
        className={`${
          theme === 'dark' ? 'bg-slate-800' : 'bg-white'
        } rounded-2xl p-6 max-w-md w-full shadow-2xl animate-slideIn`}
      >
        <div className="flex items-center justify-between mb-4">
          <h3
            className={`text-xl font-bold ${
              theme === 'dark' ? 'text-white' : 'text-slate-800'
            }`}
          >
            Share Chat
          </h3>
          <button
            onClick={onClose}
            className={`p-1 rounded-lg ${
              theme === 'dark' ? 'hover:bg-slate-700' : 'hover:bg-slate-100'
            } transition-colors`}
          >
            <X
              className={`w-5 h-5 ${
                theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
              }`}
            />
          </button>
        </div>

        {shareSuccess ? (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-4 animate-bounce">
              <Check className="w-8 h-8 text-white" />
            </div>
            <p
              className={`text-lg font-semibold ${
                theme === 'dark' ? 'text-white' : 'text-slate-800'
              }`}
            >
              Copied to clipboard!
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <button
              onClick={onCopyText}
              className={`w-full p-4 rounded-xl ${
                theme === 'dark'
                  ? 'bg-slate-700 hover:bg-slate-600'
                  : 'bg-slate-100 hover:bg-slate-200'
              } transition-colors text-left`}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-500 rounded-lg">
                  <Share2 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p
                    className={`font-semibold ${
                      theme === 'dark' ? 'text-white' : 'text-slate-800'
                    }`}
                  >
                    Copy as Text
                  </p>
                  <p
                    className={`text-sm ${
                      theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                    }`}
                  >
                    Share the conversation as plain text
                  </p>
                </div>
              </div>
            </button>

            <button
              onClick={onCopyLink}
              className={`w-full p-4 rounded-xl ${
                theme === 'dark'
                  ? 'bg-slate-700 hover:bg-slate-600'
                  : 'bg-slate-100 hover:bg-slate-200'
              } transition-colors text-left`}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500 rounded-lg">
                  <Cloud className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p
                    className={`font-semibold ${
                      theme === 'dark' ? 'text-white' : 'text-slate-800'
                    }`}
                  >
                    Copy Share Link
                  </p>
                  <p
                    className={`text-sm ${
                      theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                    }`}
                  >
                    Generate a shareable link
                  </p>
                </div>
              </div>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShareModal;