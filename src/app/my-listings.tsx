import { auth, isFirebaseConfigured } from '@/lib/firebase';
import { deleteProperty, listUserProperties, updatePropertyStatus } from '@/services/marketplace';
import type { ListingStatus, MarketplaceProperty } from '@/types/marketplace';
import { Stack, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function MyListingsScreen() {
  const router = useRouter();
  const [properties, setProperties] = useState<MarketplaceProperty[]>([]);
  const [loading, setLoading] = useState(true);

  const loadListings = async () => {
    if (!isFirebaseConfigured || !auth?.currentUser) {
      setLoading(false);
      return;
    }
    try {
      setProperties(await listUserProperties(auth.currentUser.uid));
    } catch (error) {
      Alert.alert('Could not load listings', error instanceof Error ? error.message : 'Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { void loadListings(); }, []);

  const changeStatus = async (property: MarketplaceProperty, status: ListingStatus) => {
    try {
      await updatePropertyStatus(property.id, status);
      setProperties((current) => current.map((item) => item.id === property.id ? { ...item, status } : item));
    } catch (error) {
      Alert.alert('Could not update listing', error instanceof Error ? error.message : 'Please try again.');
    }
  };

  const remove = (property: MarketplaceProperty) => {
    Alert.alert('Delete listing?', 'This cannot be undone.', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: async () => {
        try {
          await deleteProperty(property.id);
          setProperties((current) => current.filter((item) => item.id !== property.id));
        } catch (error) {
          Alert.alert('Could not delete listing', error instanceof Error ? error.message : 'Please try again.');
        }
      } },
    ]);
  };

  return <SafeAreaView style={styles.container}>
    <Stack.Screen options={{ title: 'My Listings' }} />
    <View style={styles.header}><Text style={styles.title}>My Listings</Text><TouchableOpacity onPress={() => router.push('/(tabs)/sell')}><Text style={styles.add}>+ Add</Text></TouchableOpacity></View>
    {!isFirebaseConfigured || !auth?.currentUser ? <View style={styles.empty}><Text style={styles.emptyTitle}>Firebase setup required</Text><Text style={styles.emptyText}>Sign in with Firebase and configure the project to manage real listings.</Text></View> : loading ? <View style={styles.empty}><Text>Loading listings...</Text></View> : <FlatList data={properties} keyExtractor={(item) => item.id} contentContainerStyle={styles.list} ListEmptyComponent={<View style={styles.empty}><Text style={styles.emptyTitle}>No listings yet</Text><Text style={styles.emptyText}>Publish your first property from Sell Property.</Text></View>} renderItem={({ item }) => <View style={styles.card}><Image source={{ uri: item.images[0] }} style={styles.image} /><View style={styles.cardBody}><Text style={styles.cardTitle}>{item.title}</Text><Text style={styles.meta}>{item.propertyType} · {item.listingPurpose}</Text><Text style={styles.price}>Rs. {item.price.toLocaleString()}</Text><Text style={styles.status}>{item.status} · {item.views} views · {item.inquiries} inquiries</Text><View style={styles.actions}><TouchableOpacity onPress={() => changeStatus(item, item.status === 'Available' ? (item.listingPurpose === 'For Sale' ? 'Sold' : 'Rented') : 'Available')}><Text style={styles.actionText}>{item.status === 'Available' ? 'Mark complete' : 'Make available'}</Text></TouchableOpacity><TouchableOpacity onPress={() => remove(item)}><Text style={styles.delete}>Delete</Text></TouchableOpacity></View></View></View>} />}
  </SafeAreaView>;
}

const styles = StyleSheet.create({ container: { flex: 1, backgroundColor: '#FFF' }, header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20 }, title: { fontSize: 28, fontWeight: '800', color: '#000' }, add: { fontSize: 16, fontWeight: '700' }, list: { padding: 16, paddingTop: 0 }, card: { borderWidth: 1, borderColor: '#EAEAEA', borderRadius: 16, overflow: 'hidden', marginBottom: 18 }, image: { width: '100%', height: 170, backgroundColor: '#F2F2F7' }, cardBody: { padding: 14 }, cardTitle: { fontSize: 18, fontWeight: '700', color: '#000' }, meta: { color: '#8E8E93', marginTop: 5 }, price: { fontSize: 16, fontWeight: '700', marginTop: 10 }, status: { color: '#8E8E93', marginTop: 6 }, actions: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 14 }, actionText: { fontWeight: '700' }, delete: { color: '#D11A2A', fontWeight: '700' }, empty: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 32 }, emptyTitle: { fontSize: 20, fontWeight: '700', marginBottom: 8 }, emptyText: { textAlign: 'center', color: '#8E8E93', lineHeight: 20 } });
