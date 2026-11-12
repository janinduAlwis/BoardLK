import PropertyLocationPicker from '@/components/PropertyLocationPicker';
import { auth, isFirebaseConfigured } from '@/lib/firebase';
import { createProperty, updateProperty, uploadPropertyImage } from '@/services/marketplace';
import { LISTING_PURPOSES, PROPERTY_TYPES, type ListingPurpose, type PropertyType } from '@/types/marketplace';
import * as ImagePicker from 'expo-image-picker';
import { Stack, useRouter } from 'expo-router';
import { onAuthStateChanged, type User } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { Alert, Image, Keyboard, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const initialRegion = {
  latitude: 6.8649,
  longitude: 79.8997,
  latitudeDelta: 0.04,
  longitudeDelta: 0.02,
};

export default function SellScreen() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [propertyType, setPropertyType] = useState<PropertyType>('Houses');
  const [listingPurpose, setListingPurpose] = useState<ListingPurpose>('For Sale');
  const [price, setPrice] = useState('');
  const [address, setAddress] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [bathrooms, setBathrooms] = useState('');
  const [floorArea, setFloorArea] = useState('');
  const [landArea, setLandArea] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [region, setRegion] = useState(initialRegion);
  const [isPublishing, setIsPublishing] = useState(false);
  const [firebaseUser, setFirebaseUser] = useState<User | null>(auth?.currentUser || null);

  useEffect(() => {
    if (!auth) return;
    return onAuthStateChanged(auth, setFirebaseUser);
  }, []);

  const chooseImages = async () => {
    if (images.length >= 5) return;
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permission needed', 'Allow photo access to add property images.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsMultipleSelection: true,
      selectionLimit: 5 - images.length,
      quality: 0.8,
    });
    if (!result.canceled) {
      setImages((current) => [...current, ...result.assets.map((asset: { uri: string }) => asset.uri)].slice(0, 5));
    }
  };

  const publish = async () => {
    if (!isFirebaseConfigured) {
      Alert.alert('Firebase setup required', 'Restart Expo after adding the Firebase variables to .env.local.');
      return;
    }
    if (!firebaseUser) {
      Alert.alert('Sign in required', 'Create a Firebase account or sign in before publishing a property.');
      return;
    }
    if (!title.trim() || !description.trim() || !price || !address.trim() || images.length === 0) {
      Alert.alert('Missing information', 'Add a title, description, price, location, and at least one image.');
      return;
    }

    setIsPublishing(true);
    try {
      const propertyId = await createProperty({
        ownerId: firebaseUser.uid,
        ownerName: firebaseUser.displayName || firebaseUser.email || 'BoardLK member',
        title: title.trim(),
        description: description.trim(),
        propertyType,
        listingPurpose,
        price: Number(price.replace(/,/g, '')),
        images: [],
        location: { address: address.trim(), latitude: region.latitude, longitude: region.longitude },
        details: {
          bedrooms: bedrooms ? Number(bedrooms) : undefined,
          bathrooms: bathrooms ? Number(bathrooms) : undefined,
          floorAreaSqFt: floorArea ? Number(floorArea) : undefined,
          landAreaPerches: landArea ? Number(landArea) : undefined,
          amenities: [],
          nearbyFacilities: [],
        },
        status: 'Available',
        isDemo: false,
      });
      const uploadedImages = await Promise.all(images.map((uri, index) => uploadPropertyImage(propertyId, uri, `image-${index}`)));
      await updateProperty(propertyId, { images: uploadedImages });
      Alert.alert('Published', 'Your property is now available in Buy.', [{ text: 'Done', onPress: () => router.push('/my-listings') }]);
    } catch (error) {
      Alert.alert('Could not publish', error instanceof Error ? error.message : 'Please try again.');
    } finally {
      setIsPublishing(false);
    }
  };

  const renderStep = () => {
    if (step === 1) {
      return <>
        <Field label="Property title" value={title} onChangeText={setTitle} placeholder="e.g. Bright family home in Colombo" />
        <Text style={styles.label}>Property type</Text>
        <OptionRow options={PROPERTY_TYPES} selected={propertyType} onSelect={(value) => setPropertyType(value as PropertyType)} />
        <Text style={styles.label}>Listing purpose</Text>
        <OptionRow options={LISTING_PURPOSES} selected={listingPurpose} onSelect={(value) => setListingPurpose(value as ListingPurpose)} />
        <Field label="Description" value={description} onChangeText={setDescription} placeholder="Describe the property" multiline />
      </>;
    }
    if (step === 2) {
      return <>
        <Field label="Bedrooms" value={bedrooms} onChangeText={setBedrooms} keyboardType="numeric" placeholder="Optional for land" />
        <Field label="Bathrooms" value={bathrooms} onChangeText={setBathrooms} keyboardType="numeric" />
        <Field label="Floor area (sq. ft.)" value={floorArea} onChangeText={setFloorArea} keyboardType="numeric" />
        <Field label="Land area (perches)" value={landArea} onChangeText={setLandArea} keyboardType="numeric" />
      </>;
    }
    if (step === 3) {
      return <>
        <Text style={styles.helper}>{images.length}/5 images selected. The first image is the cover image.</Text>
        <View style={styles.imageGrid}>
          {images.map((uri, index) => <View key={uri} style={styles.imageItem}><Image source={{ uri }} style={styles.preview} /><Text style={styles.coverLabel}>{index === 0 ? 'Cover' : `${index + 1}`}</Text></View>)}
        </View>
        <TouchableOpacity style={styles.secondaryButton} onPress={chooseImages}><Text style={styles.secondaryButtonText}>Choose images</Text></TouchableOpacity>
      </>;
    }
    if (step === 4) {
      return <>
        <Field label="Location" value={address} onChangeText={setAddress} placeholder="Street, city" />
        <PropertyLocationPicker region={region} onRegionChange={setRegion} />
      </>;
    }
    return <>
      <Text style={styles.previewTitle}>{title || 'Untitled property'}</Text>
      <Text style={styles.previewPrice}>Rs. {Number(price || 0).toLocaleString()} {listingPurpose === 'For Rent' ? '/ month' : ''}</Text>
      <Text style={styles.helper}>{propertyType} · {listingPurpose} · {address || 'Location not set'}</Text>
      <Field label={listingPurpose === 'For Rent' ? 'Monthly price (LKR)' : 'Price (LKR)'} value={price} onChangeText={setPrice} keyboardType="numeric" placeholder="35000" />
    </>;
  };

  return <SafeAreaView style={styles.container}>
    <Stack.Screen options={{ title: 'Sell Property' }} />
    <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled" keyboardDismissMode="on-drag">
      <Text style={styles.title}>Sell Property</Text>
      <Text style={styles.subtitle}>Step {step} of 5</Text>
      <View style={styles.progress}><View style={[styles.progressFill, { width: `${step * 20}%` }]} /></View>
      {renderStep()}
      <View style={styles.actions}>
        {step > 1 && <TouchableOpacity style={styles.backButton} onPress={() => setStep(step - 1)}><Text>Back</Text></TouchableOpacity>}
        {step < 5 ? <TouchableOpacity style={styles.primaryButton} onPress={() => setStep(step + 1)}><Text style={styles.primaryButtonText}>Continue</Text></TouchableOpacity> : <TouchableOpacity style={styles.primaryButton} disabled={isPublishing} onPress={publish}><Text style={styles.primaryButtonText}>{isPublishing ? 'Publishing...' : 'Publish property'}</Text></TouchableOpacity>}
      </View>
    </ScrollView>
  </SafeAreaView>;
}

function Field({ label, multiline, ...props }: { label: string; multiline?: boolean } & React.ComponentProps<typeof TextInput>) {
  return <View style={styles.field}><Text style={styles.label}>{label}</Text><TextInput {...props} multiline={multiline} style={[styles.input, multiline && styles.multiline]} returnKeyType={multiline ? 'default' : 'done'} onSubmitEditing={multiline ? undefined : () => Keyboard.dismiss()} /></View>;
}

function OptionRow({ options, selected, onSelect }: { options: readonly string[]; selected: string; onSelect: (value: string) => void }) {
  return <View style={styles.optionRow}>{options.map((option) => <TouchableOpacity key={option} style={[styles.option, selected === option && styles.optionSelected]} onPress={() => onSelect(option)}><Text style={selected === option ? styles.optionTextSelected : styles.optionText}>{option}</Text></TouchableOpacity>)}</View>;
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' }, content: { padding: 20, paddingBottom: 40 }, title: { fontSize: 28, fontWeight: '800', color: '#000' }, subtitle: { color: '#8E8E93', marginTop: 6 }, progress: { height: 5, backgroundColor: '#EAEAEA', borderRadius: 3, marginVertical: 20 }, progressFill: { height: 5, backgroundColor: '#0F0F0F', borderRadius: 3 }, label: { fontSize: 14, fontWeight: '700', marginBottom: 8, color: '#000' }, field: { marginBottom: 18 }, input: { borderWidth: 1, borderColor: '#EAEAEA', borderRadius: 12, padding: 14, fontSize: 16, color: '#000' }, multiline: { minHeight: 110, textAlignVertical: 'top' }, optionRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 20 }, option: { borderWidth: 1, borderColor: '#EAEAEA', borderRadius: 20, paddingVertical: 10, paddingHorizontal: 14 }, optionSelected: { backgroundColor: '#0F0F0F', borderColor: '#0F0F0F' }, optionText: { color: '#000' }, optionTextSelected: { color: '#FFF' }, helper: { color: '#8E8E93', lineHeight: 20, marginBottom: 18 }, imageGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 20 }, imageItem: { width: '30%', aspectRatio: 1, position: 'relative' }, preview: { width: '100%', height: '100%', borderRadius: 10 }, coverLabel: { position: 'absolute', bottom: 5, left: 5, color: '#FFF', backgroundColor: '#000', paddingHorizontal: 5, borderRadius: 4, fontSize: 11 }, secondaryButton: { borderWidth: 1, borderColor: '#0F0F0F', borderRadius: 12, padding: 14, alignItems: 'center' }, secondaryButtonText: { fontWeight: '700' }, map: { height: 260, borderRadius: 16, marginBottom: 18 }, previewTitle: { fontSize: 22, fontWeight: '800', marginBottom: 8 }, previewPrice: { fontSize: 18, fontWeight: '700', marginBottom: 8 }, actions: { flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', gap: 12, marginTop: 24 }, backButton: { padding: 16 }, primaryButton: { backgroundColor: '#0F0F0F', borderRadius: 12, paddingVertical: 15, paddingHorizontal: 22 }, primaryButtonText: { color: '#FFF', fontWeight: '700' },
});
