import { create } from 'zustand';
import { PROPERTIES, CHAT_CONVERSATIONS } from '@/constants/mockData';

type User = {
  email: string;
} | null;

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'owner';
  timestamp: string;
};

type ChatConversation = {
  messages: Message[];
  lastActivity: number;
};

export type UserProfile = {
  fullName: string;
  headline: string;
  email: string;
  workplace: string;
  avatar: string;
};

type StoreState = {
  user: User;
  profile: UserProfile;
  properties: typeof PROPERTIES;
  chatMessages: Record<string, ChatConversation>;
  savedPropertyIds: string[];
  login: (email: string) => void;
  logout: () => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  addMessage: (propertyId: string, text: string) => void;
  toggleSaved: (propertyId: string) => void;
  isSaved: (propertyId: string) => boolean;
  getMessages: (propertyId: string) => Message[];
};

export const useStore = create<StoreState>((set, get) => ({
  user: { email: 'pathum.randika@gmail.com' },
  profile: {
    fullName: 'Pathum Randika',
    headline: 'ICT & Web App Development Student',
    email: 'pathum.randika@gmail.com',
    workplace: 'University of Sri Jayewardenepura',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop',
  },
  properties: PROPERTIES,
  savedPropertyIds: ['1', '2'], // pre-saved for demo
  chatMessages: CHAT_CONVERSATIONS,
  
  login: (email) => set({ user: { email } }),
  
  logout: () => set({ user: null }),

  updateProfile: (updates) => set((state) => ({
    profile: { ...state.profile, ...updates },
  })),
  
  toggleSaved: (propertyId) => set((state) => {
    const already = state.savedPropertyIds.includes(propertyId);
    return {
      savedPropertyIds: already
        ? state.savedPropertyIds.filter(id => id !== propertyId)
        : [...state.savedPropertyIds, propertyId],
    };
  }),

  isSaved: (propertyId) => get().savedPropertyIds.includes(propertyId),

  getMessages: (propertyId) => {
    const conv = get().chatMessages[propertyId];
    return conv ? conv.messages : [];
  },

  addMessage: (propertyId, text) => set((state) => {
    const existing = state.chatMessages[propertyId] || { messages: [], lastActivity: 0 };
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    
    return {
      chatMessages: {
        ...state.chatMessages,
        [propertyId]: {
          messages: [...existing.messages, newMessage],
          lastActivity: Date.now(),
        },
      }
    };
  }),
}));
