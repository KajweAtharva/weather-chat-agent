export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  reaction?: 'up' | 'down' | null;
}

export type Theme = 'light' | 'dark';