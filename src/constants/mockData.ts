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
    image: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=2070&auto=format&fit=crop',
    type: 'Apartments',
    lat: 6.9113,
    lng: 79.8665,
    ownerName: 'Mrs. Silva',
    ownerAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop',
  },
  {
    id: '4',
    title: 'Single Room for Girls - Maharagama',
    price: 18000,
    location: 'Pamunuwa Road, Maharagama',
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?q=80&w=2070&auto=format&fit=crop',
    type: 'Rooms',
    lat: 6.8480,
    lng: 79.9268,
    ownerName: 'Thilini',
    ownerAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop',
  },
  {
    id: '5',
    title: 'Spacious 2-Bed Annex in Dehiwala',
    price: 38000,
    location: 'Station Road, Dehiwala',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop',
    type: 'Annexes',
    lat: 6.8510,
    lng: 79.8650,
    ownerName: 'Rohan Jayasuriya',
    ownerAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop',
  },
  {
    id: '6',
    title: 'Studio Apartment near Rajagiriya',
    price: 65000,
    location: 'Nawala Road, Rajagiriya',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=2070&auto=format&fit=crop',
    type: 'Apartments',
    lat: 6.9080,
    lng: 79.8920,
    ownerName: 'Sunil Weerasinghe',
    ownerAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=200&auto=format&fit=crop',
  },
  {
    id: '7',
    title: 'Boys Boarding Room in Kohuwala',
    price: 15000,
    location: 'Sunethra Devi Road, Kohuwala',
    rating: 4.3,
    image: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=2070&auto=format&fit=crop',
    type: 'Rooms',
    lat: 6.8685,
    lng: 79.8850,
    ownerName: 'Anura Bandara',
    ownerAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200&auto=format&fit=crop',
  },
  {
    id: '8',
    title: 'Modern Upstair Annex in Delkanda',
    price: 32000,
    location: 'High Level Road, Delkanda',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1560185008-b033106af5c3?q=80&w=2070&auto=format&fit=crop',
    type: 'Annexes',
    lat: 6.8610,
    lng: 79.9075,
    ownerName: 'Chamari Fernando',
    ownerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
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
  '4': {
    messages: [
      {
        id: '1',
        text: 'Hi Thilini, is the boarding place near Rubber Watte still vacant?',
        sender: 'user' as const,
        timestamp: 'Thursday',
      },
      {
        id: '2',
        text: 'Sorry, the boarding at Rubber Watte is filled, but I have another one nearby.',
        sender: 'owner' as const,
        timestamp: 'Thursday',
      },
    ],
    lastActivity: Date.now() - 3 * 24 * 60 * 60 * 1000, // Thursday
  },
};

// Keep backward compat export
export const CHAT_MESSAGES = CHAT_CONVERSATIONS['1'].messages;
