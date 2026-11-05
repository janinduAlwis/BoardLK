import { create } from 'zustand';
import { PROPERTIES, CHAT_MESSAGES } from '@/constants/mockData';

type User = {
  email: string;
} | null;

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'owner';
  timestamp: string;
};

type StoreState = {
  user: User;
  properties: typeof PROPERTIES;
  chatMessages: Record<string, Message[]>; // Keyed by property ID
  savedPropertyIds: string[];
  login: (email: string) => void;
  logout: () => void;
  addMessage: (propertyId: string, text: string) => void;
  toggleSaved: (propertyId: string) => void;
  isSaved: (propertyId: string) => boolean;
};

export const useStore = create<StoreState>((set, get) => ({
  user: null,
  properties: PROPERTIES,
  savedPropertyIds: ['1', '2'], // pre-saved for demo
  chatMessages: {
    '1': CHAT_MESSAGES, // Pre-fill with mock data for property 1
  },
  
  login: (email) => set({ user: { email } }),
  
  logout: () => set({ user: null }),
  
  toggleSaved: (propertyId) => set((state) => {
    const already = state.savedPropertyIds.includes(propertyId);
    return {
      savedPropertyIds: already
        ? state.savedPropertyIds.filter(id => id !== propertyId)
        : [...state.savedPropertyIds, propertyId],
    };
  }),

  isSaved: (propertyId) => get().savedPropertyIds.includes(propertyId),

  addMessage: (propertyId, text) => set((state) => {
    const existingMessages = state.chatMessages[propertyId] || [];
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    
    return {
      chatMessages: {
        ...state.chatMessages,
        [propertyId]: [...existingMessages, newMessage],
      }
    };
  }),
}));
