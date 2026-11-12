import { db } from '@/lib/firebase';
import { isSupabaseConfigured, supabase, supabaseBucket } from '@/lib/supabase';
import type { CreatePropertyInput, ListingStatus, MarketplaceProperty, PropertyReview } from '@/types/marketplace';
import * as ImageManipulator from 'expo-image-manipulator';
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs,
    limit,
    orderBy,
    query,
    serverTimestamp,
    updateDoc,
    where,
    type DocumentData,
    type QueryDocumentSnapshot,
} from 'firebase/firestore';

const propertiesCollection = () => {
  if (!db) throw new Error('Firebase is not configured. Add the EXPO_PUBLIC_FIREBASE_* values first.');
  return collection(db, 'properties');
};

export async function listAvailableProperties(): Promise<MarketplaceProperty[]> {
  const propertiesQuery = query(
    propertiesCollection(),
    where('status', '==', 'Available'),
    orderBy('createdAt', 'desc'),
  );
  const snapshot = await getDocs(propertiesQuery);
  return snapshot.docs.map((property: QueryDocumentSnapshot<DocumentData>) => ({ id: property.id, ...property.data() } as MarketplaceProperty));
}

export async function listUserProperties(ownerId: string): Promise<MarketplaceProperty[]> {
  const propertiesQuery = query(
    propertiesCollection(),
    where('ownerId', '==', ownerId),
    orderBy('updatedAt', 'desc'),
  );
  const snapshot = await getDocs(propertiesQuery);
  return snapshot.docs.map((property: QueryDocumentSnapshot<DocumentData>) => ({ id: property.id, ...property.data() } as MarketplaceProperty));
}

export async function createProperty(input: CreatePropertyInput): Promise<string> {
  try {
    const reference = await addDoc(propertiesCollection(), {
      ...input,
      views: 0,
      inquiries: 0,
      rating: 0,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return reference.id;
  } catch (error) {
    throw new Error(`Firestore listing creation failed: ${formatBackendError(error)}`);
  }
}

export async function updatePropertyStatus(propertyId: string, status: ListingStatus): Promise<void> {
  if (!db) throw new Error('Firebase is not configured.');
  await updateDoc(doc(db, 'properties', propertyId), { status, updatedAt: serverTimestamp() });
}

export async function updateProperty(propertyId: string, updates: Partial<CreatePropertyInput>): Promise<void> {
  if (!db) throw new Error('Firebase is not configured.');
  try {
    await updateDoc(doc(db, 'properties', propertyId), { ...updates, updatedAt: serverTimestamp() });
  } catch (error) {
    throw new Error(`Firestore listing update failed: ${formatBackendError(error)}`);
  }
}

export async function deleteProperty(propertyId: string): Promise<void> {
  if (!db) throw new Error('Firebase is not configured.');
  await deleteDoc(doc(db, 'properties', propertyId));
}

export async function uploadPropertyImage(propertyId: string, uri: string, imageId: string): Promise<string> {
  if (!isSupabaseConfigured || !supabase) throw new Error('Supabase Storage is not configured.');
  const optimizedImage = await ImageManipulator.manipulateAsync(
    uri,
    [{ resize: { width: 1600 } }],
    { compress: 0.72, format: ImageManipulator.SaveFormat.JPEG },
  );
  const response = await fetch(optimizedImage.uri);
  const blob = await response.blob();
  const imagePath = `properties/${propertyId}/${imageId}`;
  const { error } = await supabase.storage.from(supabaseBucket).upload(imagePath, blob, {
    contentType: 'image/jpeg',
    upsert: true,
  });
  if (error) throw new Error(`Supabase image upload failed: ${error.message}`);
  return supabase.storage.from(supabaseBucket).getPublicUrl(imagePath).data.publicUrl;
}

function formatBackendError(error: unknown): string {
  if (typeof error === 'object' && error !== null && 'code' in error && 'message' in error) {
    const backendError = error as { code: string; message: string };
    return `${backendError.code}: ${backendError.message}`;
  }
  return error instanceof Error ? error.message : 'Unknown backend error';
}

export async function deletePropertyImage(propertyId: string, imageId: string): Promise<void> {
  if (!isSupabaseConfigured || !supabase) throw new Error('Supabase Storage is not configured.');
  const { error } = await supabase.storage.from(supabaseBucket).remove([`properties/${propertyId}/${imageId}`]);
  if (error) throw error;
}

export async function listDemoProperties(): Promise<MarketplaceProperty[]> {
  const propertiesQuery = query(propertiesCollection(), where('isDemo', '==', true), limit(50));
  const snapshot = await getDocs(propertiesQuery);
  return snapshot.docs.map((property: QueryDocumentSnapshot<DocumentData>) => ({ id: property.id, ...property.data() } as MarketplaceProperty));
}

export async function listPropertyReviews(propertyId: string): Promise<PropertyReview[]> {
  if (!db) throw new Error('Firebase is not configured.');
  const reviewsQuery = query(
    collection(db, 'reviews'),
    where('propertyId', '==', propertyId),
    orderBy('createdAt', 'desc'),
  );
  const snapshot = await getDocs(reviewsQuery);
  return snapshot.docs.map((review: QueryDocumentSnapshot<DocumentData>) => ({
    id: review.id,
    ...review.data(),
  } as PropertyReview));
}

export async function createPropertyReview(input: Omit<PropertyReview, 'id' | 'createdAt'>): Promise<string> {
  if (!db) throw new Error('Firebase is not configured.');
  const review = await addDoc(collection(db, 'reviews'), {
    ...input,
    createdAt: serverTimestamp(),
  });
  return review.id;
}
