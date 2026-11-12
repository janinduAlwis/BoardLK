import { CHAT_CONVERSATIONS, PROPERTIES } from '@/constants/mockData';
import { isFirebaseConfigured } from '@/lib/firebase';
import { listAvailableProperties } from '@/services/marketplace';
import { create } from 'zustand';

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

export type BuyFilters = {
  searchQuery: string;
  propertyType: string;
  listingPurpose: 'All' | 'For Sale' | 'For Rent';
  minPrice: number;
  maxPrice: number;
  sortBy: 'newest' | 'price-low' | 'price-high';
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
  loadProperties: () => Promise<void>;
  buyFilters: BuyFilters;
  setBuyFilters: (updates: Partial<BuyFilters>) => void;
  resetBuyFilters: () => void;
};

const defaultBuyFilters: BuyFilters = {
  searchQuery: '',
  propertyType: 'All',
  listingPurpose: 'All',
  minPrice: 0,
  maxPrice: 50000000,
  sortBy: 'newest',
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
  buyFilters: defaultBuyFilters,
  
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

  setBuyFilters: (updates) => set((state) => ({
    buyFilters: { ...state.buyFilters, ...updates },
  })),

  resetBuyFilters: () => set({ buyFilters: defaultBuyFilters }),

  loadProperties: async () => {
    if (!isFirebaseConfigured) return;
    const remoteProperties = await listAvailableProperties();
    set({
      properties: remoteProperties.map((property) => ({
        id: property.id,
        title: property.title,
        price: property.price,
        location: property.location.address,
        rating: property.rating,
        image: property.images[0] || '',
        type: property.propertyType,
        lat: property.location.latitude,
        lng: property.location.longitude,
        ownerName: property.ownerName,
        ownerAvatar: property.ownerAvatar || '',
      })),
    });
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
