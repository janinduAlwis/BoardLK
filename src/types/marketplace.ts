export const PROPERTY_TYPES = ['Houses', 'Apartments', 'Lands', 'Rooms', 'Boarding places'] as const;
export const LISTING_PURPOSES = ['For Sale', 'For Rent'] as const;
export const LISTING_STATUSES = ['Available', 'Sold', 'Rented'] as const;

export type PropertyType = (typeof PROPERTY_TYPES)[number];
export type ListingPurpose = (typeof LISTING_PURPOSES)[number];
export type ListingStatus = (typeof LISTING_STATUSES)[number];

export type PropertyDetails = {
  bedrooms?: number;
  bathrooms?: number;
  floorAreaSqFt?: number;
  landAreaPerches?: number;
  floors?: number;
  furnished?: boolean;
  parking?: boolean;
  amenities: string[];
  nearbyFacilities: string[];
};

export type PropertyLocation = {
  address: string;
  latitude: number;
  longitude: number;
};

export type MarketplaceProperty = {
  id: string;
  ownerId: string;
  ownerName: string;
  ownerAvatar?: string;
  title: string;
  description: string;
  propertyType: PropertyType;
  listingPurpose: ListingPurpose;
  price: number;
  images: string[];
  location: PropertyLocation;
  details: PropertyDetails;
  status: ListingStatus;
  isDemo: boolean;
  rating: number;
  views: number;
  inquiries: number;
  createdAt?: unknown;
  updatedAt?: unknown;
};

export type CreatePropertyInput = Omit<MarketplaceProperty, 'id' | 'createdAt' | 'updatedAt' | 'views' | 'inquiries' | 'rating'>;

export type PropertyReview = {
  id: string;
  propertyId: string;
  authorId: string;
  authorName: string;
  rating: number;
  text: string;
  createdAt?: unknown;
};
