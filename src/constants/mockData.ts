export const PROPERTIES = [
  {
    id: '1',
    title: 'Modern Annex in Nugegoda',
    price: 25000,
    location: 'Wijerama Road',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop',
    type: 'Annexes',
    lat: 6.8649,
    lng: 79.8997,
    ownerName: 'Kamal Perera',
    ownerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
  },
  {
    id: '2',
    title: 'Cozy Room near J\'pura Campus',
    price: 20000,
    location: 'Galhena Road',
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2069&auto=format&fit=crop',
    type: 'Rooms',
    lat: 6.8524,
    lng: 79.9038,
    ownerName: 'Nimal',
    ownerAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop',
  },
  {
    id: '3',
    title: 'Luxury Apartment in Colombo',
    price: 150000,
    location: 'Horton Place',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1502672260266-1c1e5211541f?q=80&w=1973&auto=format&fit=crop',
    type: 'Apartments',
    lat: 6.9113,
    lng: 79.8665,
    ownerName: 'Mrs. Silva',
    ownerAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop',
  }
];

export const CATEGORIES = ['Rooms', 'Annexes', 'Apartments'];

export const CHAT_CONVERSATIONS = {
  '1': {
    messages: [
      {
        id: '1',
        text: 'Hello! Yes, the annex is still available. Would you like to come see it today?',
        sender: 'owner' as const,
        timestamp: '10:00 AM',
      },
      {
        id: '2',
        text: 'Hi Kamal, yes I am very interested. Can I come around 5 PM?',
        sender: 'user' as const,
        timestamp: '10:05 AM',
      },
    ],
    lastActivity: Date.now() - 2 * 60 * 1000, // 2 minutes ago
  },
  '2': {
    messages: [
      {
        id: '1',
        text: 'Is the room still available near campus?',
        sender: 'user' as const,
        timestamp: '9:00 AM',
      },
      {
        id: '2',
        text: 'Are you coming to see the room tomorrow?',
        sender: 'owner' as const,
        timestamp: '9:30 AM',
      },
    ],
    lastActivity: Date.now() - 60 * 60 * 1000, // 1 hour ago
  },
  '3': {
    messages: [
      {
        id: '1',
        text: 'Does the apartment have an attached bathroom?',
        sender: 'user' as const,
        timestamp: '3:10 PM',
      },
      {
        id: '2',
        text: 'Yes, the annex has an attached bathroom.',
        sender: 'owner' as const,
        timestamp: '3:15 PM',
      },
    ],
    lastActivity: Date.now() - 3 * 60 * 60 * 1000, // 3 hours ago
  },
};

// Keep backward compat export
export const CHAT_MESSAGES = CHAT_CONVERSATIONS['1'].messages;
