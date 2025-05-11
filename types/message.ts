export type Message = {
  id?: string;
  sender: 'user' | 'ai';
  content: string;
  timestamp: number;
  type?: 'text' | 'image';
  imageUrl?: string;
}; 