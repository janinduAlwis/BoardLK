import React from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { useStore } from '@/store/useStore';

export default function FavoritesScreen() {
  const router = useRouter();
  const properties = useStore(state => state.properties);
  const savedPropertyIds = useStore(state => state.savedPropertyIds);
  const toggleSaved = useStore(state => state.toggleSaved);

  const savedProperties = properties.filter(p => savedPropertyIds.includes(p.id));

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Saved Properties</Text>
      <FlatList
        data={savedProperties}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="heart-outline" size={64} color="#EAEAEA" />
            <Text style={styles.emptyText}>No saved properties yet</Text>
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.95}
            onPress={() => router.push(`/property/${item.id}`)}
          >
            <View style={styles.imageContainer}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <TouchableOpacity
                style={styles.heartButton}
                onPress={() => toggleSaved(item.id)}
              >
                <Ionicons name="heart" size={24} color="#FF3B30" />
              </TouchableOpacity>
            </View>

            <View style={styles.content}>
              <Text style={styles.title}>{item.title}</Text>

              <View style={styles.ratingRow}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <FontAwesome
                    key={star}
                    name={star <= Math.round(item.rating) ? 'star' : 'star-o'}
                    size={14}
                    color="#F5A623"
                  />
                ))}
                <Text style={styles.ratingText}>{item.rating.toFixed(1)}</Text>
              </View>

              <Text style={styles.location}>Location: {item.location}</Text>

              <View style={styles.footer}>
                <Text style={styles.price}>Rs. {item.price.toLocaleString()} / month</Text>
                <TouchableOpacity
                  style={styles.contactBtn}
                  onPress={() => router.push(`/chat/${item.id}`)}
                >
                  <Text style={styles.contactBtnText}>Show contacts</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  heading: {
    fontSize: 28,
    fontWeight: '800',
    color: '#000',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#EAEAEA',
    overflow: 'hidden',
    marginBottom: 20,
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  heartButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    marginBottom: 8,
  },
  ratingText: {
    marginLeft: 6,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  location: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  contactBtn: {
    backgroundColor: '#0F0F0F',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  contactBtnText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 80,
    gap: 16,
  },
  emptyText: {
    fontSize: 16,
    color: '#8E8E93',
  },
});
