import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Feather, FontAwesome } from '@expo/vector-icons';
import { useStore } from '@/store/useStore';

export default function PropertyDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const properties = useStore(state => state.properties);
  const property = properties.find(p => p.id === id);

  if (!property) {
    return (
      <View style={styles.container}>
        <Text>Property not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: property.image }} style={styles.image} />
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Feather name="chevron-left" size={32} color="#FFF" />
          </TouchableOpacity>
        </View>

        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{property.title}</Text>
          
          <View style={styles.ratingRow}>
            {[1, 2, 3, 4, 5].map((star) => (
              <FontAwesome 
                key={star} 
                name={star <= Math.round(property.rating) ? "star" : "star-o"} 
                size={16} 
                color="#FFB020" 
              />
            ))}
            <Text style={styles.ratingText}>{property.rating} (120 reviews)</Text>
          </View>

          <Text style={styles.locationText}>Location: {property.location}</Text>

          <View style={styles.pillsRow}>
            <View style={styles.pill}><Text style={styles.pillText}>1 Bed</Text></View>
            <View style={styles.pill}><Text style={styles.pillText}>1 Bath</Text></View>
            <View style={styles.pill}><Text style={styles.pillText}>Free Wi-Fi</Text></View>
          </View>

          <Text style={styles.description}>
            Located centrally close to all university amenities, this secure annex is ideal for a student...
          </Text>

          <TouchableOpacity style={styles.reviewButton} onPress={() => router.push(`/review?id=${property.id}`)}>
            <Text style={styles.reviewButtonText}>Write a Review</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <Text style={styles.priceText}>Rs. {property.price.toLocaleString()} / mo</Text>
        <TouchableOpacity style={styles.contactButton} onPress={() => router.push(`/chat/${property.id}`)}>
          <Text style={styles.contactButtonText}>Contact Owner</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  scrollContent: {
    paddingBottom: 100,
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 350,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 16,
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  detailsContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
    marginBottom: 8,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 4,
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#8E8E93',
    fontWeight: '500',
  },
  locationText: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 24,
  },
  pillsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 32,
  },
  pill: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#F9F9F9',
    borderWidth: 1,
    borderColor: '#EAEAEA',
  },
  pillText: {
    fontSize: 14,
    color: '#1E1E1E',
  },
  description: {
    fontSize: 15,
    lineHeight: 24,
    color: '#1E1E1E',
    marginBottom: 32,
  },
  reviewButton: {
    width: '100%',
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#000',
    alignItems: 'center',
  },
  reviewButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    paddingBottom: 34,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  priceText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
  },
  contactButton: {
    backgroundColor: '#0F0F0F',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 24,
  },
  contactButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
